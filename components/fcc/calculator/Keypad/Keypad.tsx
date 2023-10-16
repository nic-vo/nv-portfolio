import { MouseEventHandler } from 'react';

import keyStyles from './Keypad.module.scss';

const Keypad = (props: {
	keyId: string,
	keyVal: string | null,
	content: string,
	handler: (value: string) => void;
}) => {
	const { keyId, keyVal, content, handler } = props;

	const clickHandler: MouseEventHandler<HTMLButtonElement> = (e) => {
		handler(e.currentTarget.value);
	}

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

	if (keyVal === null) return (
		<button
			id={keyId}
			onClick={clickHandler}
			className={`${keyStyles.keypad} ${classer()}`}
			style={{
				gridArea: keyId,
			}}>
			{content}
		</button>
	);

	return (
		<button
			id={keyId}
			value={keyVal}
			onClick={clickHandler}
			className={`${keyStyles.keypad} ${classer()}`}
			style={{
				gridArea: keyId,
			}}>
			{content}
		</button>
	);
}

export default Keypad;
