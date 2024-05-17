import { NextRequest } from 'next/server';
import { htmlStringer, plaintextStringer, validator } from './_lib';
import { createTransport } from 'nodemailer';

export async function POST(req: NextRequest) {
	let parsed;
	try {
		// Data validation
		const json = await req.json();
		parsed = validator(json);
	} catch {
		return Response.json(
			{ message: 'Something happened with the request, try again' },
			{ status: 400 },
		);
	}
	if (typeof parsed === 'boolean') {
		return Response.json({ message: 'Not found' }, { status: 404 });
	}

	// ReCAPTCHA validation
	let ReCAPTCHAData;
	try {
		const { threeToken } = parsed;
		const ReCAPTCHAResponse = await fetch(
			`https://www.google.com/recaptcha/api/siteverify?secret=${process.env.PRIVATE_CONTACT_FORM_RECAPTCHA_KEY}&response=${threeToken}`,
		);
		ReCAPTCHAData = await ReCAPTCHAResponse.json();
		// Only valid error to report to user is if they took too long
	} catch {
		return Response.json(
			{ message: 'Something happened with the server; try again' },
			{ status: 502 },
		);
	}
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
	transport.verify((error: any, success: any) => {
		if (error) {
			return Response.json(
				{ message: 'Server error. Submit your info again.' },
				{ status: 502 },
			);
		}
	});
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
	return Response.json(
		{ message: `Received. An email confirmation should arrive soon.` },
		{ status: 201 },
	);
}
