const whiteSpaceRemover = (str) => {
	// Removes spammed whitespace
	// Can't be nested inside the regex function because I dont' think setState has access to it? closures or something
	return str.trim().replaceAll(/ {2,}/g, " ").replaceAll(/\n{3,}/g, "\n\n").replaceAll(/ ?' ?/g, "'").replaceAll(/ ?- ?/g, "-", "").replaceAll(/ \./g, ".").replaceAll(/ ,/g, ",");
};

export {
	whiteSpaceRemover,

}
