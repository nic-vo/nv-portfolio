const preprocessing = (string) => {
	return string.replaceAll(/file\/d\//g, 'uc?id=')
		.replaceAll(/\/view\?usp\=share_link/g, '')
		.replaceAll(/\/view\?usp\=sharing/g, '');
};

export default preprocessing;
