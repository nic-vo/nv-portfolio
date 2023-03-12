import keyStyles from './Keypad.module.scss';

const Keypad = ({
	keyId,
	keyVal,
	content,
	handler
}) => {

	const classer = () => {
		switch (keyId) {
			case "clear":
				return keyStyles.clear;
			case "equals":
				return keyStyles.equals;
			default:
				return keyStyles.numpad;
		};
	};

	return (
		<button
			id={keyId}
			value={keyVal}
			onClick={handler}
			className={`${keyStyles.keypad} ${classer()}`}
			style={{
				gridArea: keyId,
			}}>
			{content}
		</button>
	);
};

export default Keypad;
