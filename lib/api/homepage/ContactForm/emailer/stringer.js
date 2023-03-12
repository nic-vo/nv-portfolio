import * as styleObjs from './styleObjs';
import * as copyStrings from './copyText';

const plaintextStringer = (name) => {
	const { plaintextCopyStrings } = copyStrings;
	return plaintextCopyStrings[0] + name + plaintextCopyStrings[1];
};

const htmlStringer = (name) => {
	// Takes name from contact form and creates an HTML string to be used in email
	const { divStyle, hOneStyle } = styleObjs;
	const pStrings = copyStrings.htmlCopyStrings.reduce((output, current) => {
		return output + pString(current);
	}, '');

	const contentStr = elementToString({
		element: 'h1',
		str: `Hi, ${name}!`,
		style: hOneStyle
	}) + pStrings;

	const htmlStr = elementToString({
		element: 'div',
		str: contentStr,
		style: divStyle
	});
	return htmlStr;
};

const pString = (str) => {
	// Closure
	// runs elementToString for <p> elements
	const { pStyle } = styleObjs;
	return elementToString({
		element: 'p',
		str,
		style: pStyle
	});
};

const elementToString = ({ element, str, style }) => {
	// Takes element, content string, and style object
	// Wraps content string in opening / closing tags of element
	// Opening tag contains keys and values of style object
	let styleStr = '';
	for (const [attr, value] of Object.entries(style)) {
		styleStr += `${attr}: ${value};`;
	};
	return `<${element} style='${styleStr}'>${str}</${element}>`;
};

export {
	htmlStringer,
	plaintextStringer
};
