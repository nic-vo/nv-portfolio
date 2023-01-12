const formHandler = async (req, res) => {
	const { name, email, threeToken } = req.body;
	const rResponse = await fetch(`https://www.google.com/recaptcha/api/siteverify?secret=${process.env.PRIVATE_RECAPTCHA_KEY}&response=${threeToken}`);
	const captchaData = await rResponse.json();
	res.status(200).json({ newName: name + ' fucky', newEmail: 'good ' + email, rSuccess: captchaData.success, rScore: captchaData.score });
};

export default formHandler;
