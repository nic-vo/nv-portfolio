import bLook from './TechBubble.module.scss';

const TechBubble = (props: {
	tech: string,
	styler: {}
}) => {
	const { tech, styler } = props;
	const styleObj = styler === undefined ? {} : styler;
	return (
		<li className={bLook.tech} style={styleObj}>{tech}</li>
	);
}

export default TechBubble;
