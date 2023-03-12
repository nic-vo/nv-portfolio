const validator = (body) => {
	const { name, email, threeToken, birthday } = body;
	if (/^([A-Za-z]|\d| |'|\.|,|-|\(|\)){4,100}$/.test(name) !== true ||
		name === undefined ||
		/\@/.test(email) !== true ||
		email === undefined ||
		threeToken === undefined ||
		birthday !== '1984-06-21' ||
		birthday === undefined) {
		return false;
	}
	return true;
};

export default validator;
