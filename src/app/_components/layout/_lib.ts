export const whiteSpaceRemover = (str: string) => {
	// Removes spammed whitespace
	// Can't be nested inside the regex function
	// I don't think setState has access to it? closures or something
	return str
		.trim()
		.replaceAll(/ {2,}/g, ' ')
		.replaceAll(/\n{3,}/g, '\n\n')
		.replaceAll(/ ?' ?/g, "'")
		.replaceAll(/ ?- ?/g, '-')
		.replaceAll(/ \./g, '.')
		.replaceAll(/ ,/g, ',');
};
