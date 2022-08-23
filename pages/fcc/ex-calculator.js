import { React, useState } from 'react';
import { Keypad, KeypadCharacters as keyChars, History, KeypadCharacters } from '../../components/fcc/calculator';

const keyList = Object.keys(keyChars);

const Calculator = () => {
	const [chunk, setChunk] = useState("");
	const [entire, setEntire] = useState("");
	const [evaluated, setEvaluated] = useState("")
	const [history, setHistory] = useState([]);

	/* BEGIN Keypad Handlers */
	const numberHandler = (e) => {
		setChunk(e.target.value);
	};

	const operatorHandler = (e) => {
		setChunk(e.target.value);
	};

	const zeroHandler = (e) => {

	};

	const decimalHandler = (e) => {

	};

	const subtractHandler = (e) => {

	};

	const equalsHandler = () => {

	};

	const clearHandler = () => {
		setChunk("");
	};

	/* END Keypad Handlers */

	const clearHistory = () => {
		setHistory([]);
	};

	return (
		<div>
			<h1>Container</h1>
			<div>
				<h2>Calculator</h2>
				<div>
					<h3>Screen</h3>
					<p>entire</p>
					<p>chunk: {chunk}</p>
				</div>
				<div tabIndex={0}>
					<h3>Key Grid</h3>
					{
						keyList.map((char) => {
							if (char === "zero") { return <Keypad keyId={keyChars[char]} activate={zeroHandler} key={`${char}-pad`} /> }
							else if (char === "subtract") { return <Keypad keyId={keyChars[char]} activate={subtractHandler} key={`${char}-pad`} /> }
							else if (char === "add" || char === "multiply" || char === "divide") { return <Keypad keyId={keyChars[char]} activate={operatorHandler} key={`${char}-pad`} /> }
							else if (char === "clear") { return <Keypad keyId={keyChars[char]} activate={clearHandler} key={`${char}-pad`} /> }
							else { return <Keypad keyId={keyChars[char]} activate={numberHandler} key={`${char}-pad`} /> }
						})
					}
				</div>
			</div>
			<div>
				<History />
			</div>
		</div>
	);
};

export default Calculator;
