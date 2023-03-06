import bLook from './TechBubble.module.scss';

const TechBubble = ({ tech, styler }) => {

	const styleObj = styler === undefined ? {} : styler;

	return (
		<li className={bLook.tech} style={styleObj}>{tech}</li>
	);
};

export default TechBubble;
