import { htmlStringer, plaintextStringer, validator } from '../../../lib/api/homepage/ContactForm';

const formHandler = async (req, res) => {
	if (req.method !== 'POST') {
		return res.status(405).json({ message: 'Method not allowed' });
	};

	const { body } = req;

	// Data validation
	if (validator(body) === false) {
		return res.status(404).json({ message: 'Not found' });
	};

	// ReCAPTCHA validation
	const { threeToken } = body;
	const ReCAPTCHAResponse = await fetch(`https://www.google.com/recaptcha/api/siteverify?secret=${process.env.PRIVATE_CONTACT_FORM_RECAPTCHA_KEY}&response=${threeToken}`);
	const ReCAPTCHAData = await ReCAPTCHAResponse.json();
	// Only valid error to report to user is if they took too long
	if (ReCAPTCHAData['error-codes'] !== undefined &&
		ReCAPTCHAData['error-codes'].includes('timeout-or-duplicate') === true) {
		return res.status(502)
			.json({ message: 'ReCAPTCHA response expired. Please submit again.' });
	};
	// If request fails at network level?
	// Arbritrary score indicaitng bot?
	if (ReCAPTCHAData.score < 0.3 || ReCAPTCHAData.success === false) {
		return res.status(404).json({ message: 'Not found' });
	};

	// Emailer
	const { name, email } = body;
	const mailer = require('nodemailer');
	// Some gmail docs indicate the correct smtp settings / procedure for handshakes
	const transport = mailer.createTransport({
		host: 'smtp.gmail.com',
		port: 587,
		secure: false,
		requireTLS: true,
		auth: {
			user: process.env.PRIVATE_EMAIL_USER,
			pass: process.env.PRIVATE_EMAIL_PASS
		}
	});
	// Unknown if this works
	transport.verify((error, success) => {
		if (error) {
			return res.status(502)
				.json({ message: 'Server error. Submit your info again.' });
		};
	});
	// Send both plaintext and HTML; HTML from stringer function
	const emailMessage = {
		from: process.env.PRIVATE_EMAIL_USER,
		to: email,
		subject: 'Hello from Nicolas Vo!',
		text: plaintextStringer(name),
		html: htmlStringer(name)
	};
	const sendResult = await transport.sendMail(emailMessage);
	if (sendResult.err) {
		return res.status(502)
			.json({ message: 'Server error. Submit your info again.' });
	};
	return res.status(200)
		.json({ message: `Received. An email confirmation should arrive soon.` });
};

export default formHandler;
