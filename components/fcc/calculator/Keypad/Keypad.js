import { React, useState, useEffect } from 'react';

import keyStyles from './Keypad.module.css';

const Keypad = ({
	keyId,
	keyVal,
	content,
	handler,
	splode
}) => {

	const [sploded, setSploded] = useState([[0, 0, 0, 0], [0, 0, 0]]);

	const resetSploded = () => {
		setSploded([[0, 0, 0, 0], [0, 0, 0]]);
	};

	const newRan = () => {
		const negFifty = () => {
			if (Math.random() < 0.5) { return "-" };
			return "";
		};
		return `${negFifty()}${Math.random().toFixed(4)}`;
	};

	const normalizedVecs = () => {
		const newArr = [parseFloat(newRan()), parseFloat(newRan()), parseFloat(newRan())]
		const total = newArr.reduce((newTotal, current) => {
			return Math.abs(current) + Math.abs(newTotal);
		});
		return newArr.map((vec) => {
			return vec/total;
		});
	};

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

	return (
		<button
			id={keyId}
			value={keyVal}
			onClick={handler}
			className={`${keyStyles.keypad}${keyId === "clear" ? ` ${keyStyles.clear}` : ""}`}
			style={{
				"gridArea": keyId,
				"transform": `rotate3d(${sploded[0][0]}, ${sploded[0][1]}, ${sploded[0][2]}, ${sploded[0][3]*360}deg) translate3d(${sploded[1][0]},${sploded[1][1]},${sploded[1][2]})`
			}}>
			{content}
		</button>
	);
};

export default Keypad;
