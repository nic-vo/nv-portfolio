import { useRef, useEffect } from 'react';

import keyStyles from './Keypad.module.css';

const Keypad = ({
	keyId,
	keyVal,
	content,
	handler,
	splode
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

	// Creates values for vector
	const newRan = () => {
		const negFifty = () => {
			if (Math.random() < 0.5) { return "-" };
			return "";
		};
		return `${negFifty()}${Math.random().toFixed(4)}`;
	};

	// I do the normalization kinda so browser doesn't have to
	const normalizedVecs = () => {
		const newArr = [parseFloat(newRan()), parseFloat(newRan()), parseFloat(newRan())]
		const total = newArr.reduce((newTotal, current) => {
			return Math.abs(current) + Math.abs(newTotal);
		});
		return {
			rx: newArr[0] / total,
			ry: newArr[1] / total,
			rz: newArr[2] / total
		};
	};

	// Determines how far each keypad explodes
	const newTran = (ran) => {
		return `${parseFloat(ran) * 150}px`;
	};

	const splodeRef = useRef({ rx: 0.33, ry: 0.33, rz: 0.33, rm: 0.5, tx: 0.5, ty: 0.5, tz: 0.5 })

	useEffect(() => {
		if (splode === true) {
			const vecObj = normalizedVecs();
			Object.keys(splodeRef.current).forEach(
				(key, index) => {
					switch (key) {
						case "rx":
						case "ry":
						case "rz":
							splodeRef.current[key] = vecObj[key];
							break;
						default:
							splodeRef.current[key] = parseFloat(newRan());
					}
				}
			)
		}
	}, [splode]);

	const transStr = () => {
		return `rotate3d(${splode === true ? splodeRef.current["rx"] : 0}, ${splode === true ? splodeRef.current["ry"] : 0}, ${splode === true ? splodeRef.current["rz"] : 0}, ${splode === true ? splodeRef.current["rm"] * 180 : 0}deg) translate3d(${splode === true ? splodeRef.current["tx"] * 150 : 0}px,${splode === true ? splodeRef.current["ty"] * 150 : 0}px,${splode === true ? splodeRef.current["tz"] * 150 : 0}px)`
	}

	return (
		<button
			id={keyId}
			value={keyVal}
			onClick={handler}
			className={`${keyStyles.keypad} ${classer()}`}
			style={{
				gridArea: keyId,
				transform: transStr()
			}}>
			{content}
		</button>
	);
};

export default Keypad;
