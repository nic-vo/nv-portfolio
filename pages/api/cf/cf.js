import { stringer } from '../../../lib/api/homepage/ContactForm/ContactForm';

const formHandler = async (req, res) => {
	const { name, email, threeToken, birthday } = req.body;


	if ((/^([A-Za-z]|\d| |'|\.|,|-|\(|\)){4,100}$/.test(name) !== true || name === undefined) || (/\@/.test(email) !== true || email === undefined) || threeToken === undefined || (birthday !== '1984-06-21' || birthday === undefined)) {
		return res.status(404).json({ message: 'Not found' });
	};

	const rResponse = await fetch(`https://www.google.com/recaptcha/api/siteverify?secret=${process.env.PRIVATE_CONTACT_FORM_RECAPTCHA_KEY}&response=${threeToken}`);
	const captchaData = await rResponse.json();
	if (captchaData.score < 0.3) {
		return res.status(404).json({ message: 'Not found' });
	};

	if (captchaData.success === false) {
		if (captchaData['error-codes'].includes('timeout-or-duplicate') === true) {
			return res.status(502).json({ message: 'The ReCAPTCHA token expired. Please submit your information again.' })
		};
		return res.status(404).json({ message: 'Not found' });
	};

	const mailer = require('nodemailer');
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

	transport.verify((error, success) => {
		if (error) {
			return res.status(502).json({ message: 'We had an internal server error, but your information is okay. Please try again in a few minutes.' })
		}
	});

	// Send both plaintext and HTML; HTML from stringer function
	const emailMessage = {
		from: process.env.PRIVATE_EMAIL_USER,
		to: email,
		subject: 'Hello from Nicolas Vo!',
		text: `Hi, ${name}!

		You've reached me through the contact form on my portfolio page. You can reply to this email with more details about your request if you so choose, or you can wait for me to respond (typically with 2 business days).

		If you believe you've received this message in error, you can ignore it.`,
		html: stringer(name)
	};

	const sendResult = await transport.sendMail(emailMessage);
	if (sendResult.err) {
		return res.status(502).json({ message: 'We had an internal server error, but your information is okay. Please try again in a few minutes.' });

	};

	return res.status(200).json({ message: `Information received. You should receive an email confirmation shortly.` });
};

export default formHandler;
