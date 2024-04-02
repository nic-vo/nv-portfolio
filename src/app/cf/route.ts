import { NextRequest } from 'next/server';
import { htmlStringer, plaintextStringer, validator } from './_lib';

export async function POST(req: NextRequest) {
	const json = await req.json();
	const parsed = validator(json);

	// Data validation
	if (parsed === false) {
		return Response.json({ message: 'Not found' }, { status: 404 });
	}

	// ReCAPTCHA validation
	const { threeToken } = parsed;
	const ReCAPTCHAResponse = await fetch(
		`https://www.google.com/recaptcha/api/siteverify?secret=${process.env.PRIVATE_CONTACT_FORM_RECAPTCHA_KEY}&response=${threeToken}`,
	);
	const ReCAPTCHAData = await ReCAPTCHAResponse.json();
	// Only valid error to report to user is if they took too long
	if (
		ReCAPTCHAData['error-codes'] !== undefined &&
		ReCAPTCHAData['error-codes'].includes('timeout-or-duplicate') === true
	) {
		return Response.json(
			{ message: 'ReCAPTCHA response expired. Please submit again.' },
			{ status: 502 },
		);
	}
	// If request fails at network level?
	// Arbritrary score indicaitng bot?
	if (ReCAPTCHAData.score < 0.3 || ReCAPTCHAData.success === false) {
		return Response.json({ message: 'Not found' }, { status: 404 });
	}

	// Emailer
	const { name, email } = parsed;
	const mailer = require('nodemailer');
	// Some gmail docs indicate the correct smtp settings / procedure for handshakes
	const transport = mailer.createTransport({
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
				{ message: 'Server rror. Submit your info again.' },
				{ status: 502 },
			);
		}
	});
	// Send both plaintext and HTML; HTML from stringer function
	const emailMessage = {
		from: process.env.PRIVATE_EMAIL_USER,
		to: email,
		subject: 'Hello from Nicolas Vo!',
		text: plaintextStringer(name),
		html: htmlStringer(name),
	};
	const sendResult = await transport.sendMail(emailMessage);
	if (sendResult.err) {
		return Response.json(
			{ message: 'Server rror. Submit your info again.' },
			{ status: 502 },
		);
	}
	return Response.json(
		{ message: `Received. An email confirmation should arrive soon.` },
		{ status: 201 },
	);
}
