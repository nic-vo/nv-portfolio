import React, { memo, useState, useEffect } from 'react';

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

	// Stores vectors for the explode transition
	const [sploded, setSploded] = useState([[0, 0, 0, 0], [0, 0, 0]]);

	const resetSploded = () => {
		setSploded([[0, 0, 0, 0], [0, 0, 0]]);
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
		return newArr.map((vec) => {
			return vec / total;
		});
	};

	// Determines how far each keypad explodes
	const newTran = () => {
		return `${newRan() * 150}px`;
	};

	const newSploded = () => {
		setSploded([[...normalizedVecs(), parseFloat(newRan()).toFixed(5)], [newTran(), newTran(), newTran()]]);
	}

	useEffect(() => {
		if (splode === false) { return resetSploded(); }
		newSploded();
	}, [splode]);

	const transStr = () => {
		return `rotate3d(${sploded[0][0]}, ${sploded[0][1]}, ${sploded[0][2]}, ${sploded[0][3] * 180}deg) translate3d(${sploded[1][0]},${sploded[1][1]},${sploded[1][2]})`
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

const KeypadMemo = memo(Keypad);

export default KeypadMemo;
