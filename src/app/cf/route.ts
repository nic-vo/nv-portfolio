import { htmlStringer, plaintextStringer, validator } from './_lib';
import { createTransport } from 'nodemailer';

import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
	let parsed;
	// Data validation
	try {
		parsed = validator(await req.json());
		if (typeof parsed === 'boolean') {
			return Response.json({ message: 'Not found' }, { status: 404 });
		}
	} catch {
		// Catch JSON-object error; validator catches zod internally
		return Response.json(
			{ message: 'Something happened with the request, try again' },
			{ status: 400 },
		);
	}

	// ReCAPTCHA validation
	try {
		const { threeToken } = parsed;
		const ReCAPTCHAData = await (async () => {
			const req = await fetch(
				`https://www.google.com/recaptcha/api/siteverify?secret=${process.env.PRIVATE_CONTACT_FORM_RECAPTCHA_KEY}&response=${threeToken}`,
			);
			return await req.json();
		})();

		// Early return in case of duplicated / expired token
		if (
			ReCAPTCHAData['error-codes'] &&
			ReCAPTCHAData['error-codes'].includes('timeout-or-duplicate')
		)
			return Response.json(
				{ message: 'ReCAPTCHA response expired. Please submit again.' },
				{ status: 502 },
			);

		// If request fails at network level?
		// Arbritrary score indicaitng bot?
		if (ReCAPTCHAData.score < 0.3 || ReCAPTCHAData.success === false) {
			return Response.json({ message: 'Not found' }, { status: 404 });
		}
	} catch {
		return Response.json(
			// Catch fetch error
			{ message: 'Something happened with the server; try again' },
			{ status: 502 },
		);
	}

	// Emailer
	const { name, email } = parsed;
	// Some gmail docs indicate the correct smtp settings / procedure for handshakes
	const transport = createTransport({
		host: 'smtp.gmail.com',
		port: 587,
		secure: false,
		requireTLS: true,
		auth: {
			user: process.env.PRIVATE_EMAIL_USER,
			pass: process.env.PRIVATE_EMAIL_PASS,
		},
	});
	// Unknown if this works
	try {
		transport.verify((error: any, success: any) => {
			if (error) throw new Error();
		});
	} catch {
		return Response.json(
			{ message: 'Server error. Submit your info again.' },
			{ status: 502 },
		);
	}
	// Send both plaintext and HTML; HTML from stringer function
	const emailMessage = {
		from: process.env.PRIVATE_EMAIL_USER!,
		to: email,
		subject: 'Hello from Nicolas Vo!',
		text: plaintextStringer(name),
		html: htmlStringer(name),
	};
	const selfMessage = {
		from: process.env.PRIVATE_EMAIL_USER!,
		to: process.env.PRIVATE_EMAIL_USER!,
		subject: 'New Contact Form Hit',
		text: `New Client: ${name} - ${email}`,
	};
	try {
		await Promise.all([
			transport.sendMail(emailMessage),
			transport.sendMail(selfMessage),
		]);
	} catch {
		return Response.json(
			{ message: 'Server error. Submit your info again.' },
			{ status: 502 },
		);
	}
	try {
		transport.close();
	} catch {
		// Fail silent connection close error
	}

	return Response.json(
		{ message: `Received. An email confirmation should arrive soon.` },
		{ status: 201 },
	);
}
