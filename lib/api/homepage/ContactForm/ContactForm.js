const pString = ({ str, style }) => {
	let styleStr = '';
	Object.keys(style).forEach(attr => {
		styleStr += `${attr}: ${style[attr]};`
	});
	return `<p style='${styleStr}'>${str}</p>`;
};

const headerOneString = ({ str, style }) => {
	let styleStr = '';
	Object.keys(style).forEach(attr => {
		styleStr += `${attr}: ${style[attr]};`
	});
	return `<h1 style='${styleStr}'>${str}</h1>`;
};

export {
	pString,
	headerOneString
}
