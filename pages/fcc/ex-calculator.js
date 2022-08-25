import { React, useState } from 'react';
import { Keypad, KeypadCharacters as keyChars, History, KeypadCharacters } from '../../components/fcc/calculator';

const keyList = Object.keys(keyChars);
const opArr = ["add", "multiply", "subtract", "divide"];

const Calculator = () => {
	// "entire" is the actual string to be evaluated
	const [entire, setEntire] = useState("");
	// "chunk" is like a running string
	const [chunk, setChunk] = useState("");
	const [evaluated, setEvaluated] = useState("")
	const [history, setHistory] = useState([]);

	// true === operator is new and will not be replaced
	const [opToggle, setOpToggle] = useState(true);
	const [negToggle, setNegToggle] = useState(true);
	const [decToggle, setDecToggle] = useState(true);

	/*

	BEGIN Keypad Handlers

	*/

	/* Helpers */

	const replaceChunk = (value) => {
		setChunk(value);
	};

	const addToChunk = (value) => {
		setChunk(chunk + value);
	};

	const addToEntire = (value) => {
		setEntire(entire + value);
	};

	const replaceOp = (op) => {
		// This func will replace the last char in entire with the new op
		const entireArr = entire.split("");
		entireArr[entireArr.length - 1] = op;
		setEntire(entireArr.join(""));
	};

	/* Event Handlers */

	const numberHandler = (e) => {
		const newNum = e.target.value;
		if (evaluated) { clearHandler(); };
		addToEntire(newNum);
		if (opToggle === false) {
			replaceChunk(newNum);
			setOpToggle(true);
		} else {
			addToChunk(newNum);
		}
	};

	const operatorHandler = (e) => {
		const op = e.target.value
		// If the eval string is blank, either already evaluated fresh page load / full clear
		if (!entire) {
			// If evaluated is a number (may not be)
			// Replace eval string and add new operator
			if (isNaN(evaluated) === false) {
				const curEvaluated = evaluated
				addToEntire(curEvaluated + op);
				replaceChunk(op);
				setEvaluated("");
				setOpToggle(false);
			}
			// If fresh page load / full clear
			else {
				addToEntire("0" + op);
				replaceChunk(op);
				setOpToggle(false);
			};
		}
		// Special functionality: if last in eval string is an operator, replace
		else if (opToggle === false) {
			replaceOp(op);
		}
		// Typical use: if last input is a number or decimal(?), add new operator and prepare for replace
		else {
			addToEntire(op);
			replaceChunk(op);
			setOpToggle(false);
		};
	};

	const decimalHandler = () => {
		if (evaluated) { clearHandler(); };
		if (!chunk) {
			replaceChunk("0.");
			setDecToggle(false);
		} else if (decToggle === true && opToggle === true) {
			addToChunk(".");
			setDecToggle(false);
		};
	};

	const subtractHandler = (e) => {
		setChunk(e.target.value);
	};

	const equalsHandler = () => {
		const solved = eval(entire);
		setHistory[history.push([entire, solved])]
		setEvaluated(solved);
		setEntire("");
		setChunk("");
	};

	const clearHandler = () => {
		setEntire("");
		setChunk("");
		setEvaluated("");
		setDecToggle(true);
		setOpToggle(true);
	};

	/* END Keypad Handlers */

	const clearHistory = () => {
		setHistory([]);
	};

	const pickHistory = (e) => {
		const histItem = e.target.value;
		addToEntire(histItem);
		setOpToggle(true);
		setNegToggle(true);
		if (entire.split("").indexOf(".") < 0) { setDecToggle(true); };
	}

	return (
		<div>
			<h1>Container</h1>
			<div>
				<h2>Calculator</h2>
				<div>
					<h3>Screen</h3>
					<p>entire: {entire}</p>
					<p>chunk: {chunk}</p>
					<p>solved: {evaluated}</p>
				</div>
				<div tabIndex={0}>
					<h3>Key Grid</h3>
					{
						keyList.map((char) => {
							switch (char) {
								case "decimal":
									return <Keypad keyId={char} keyVal={keyChars[char]} activate={decimalHandler} key={`${char}-pad`} />;
								case "subtract":
									return <Keypad keyId={char} keyVal={keyChars[char]} activate={subtractHandler} key={`${char}-pad`} />;
								case "add":
								case "multiply":
								case "divide":
									return <Keypad keyId={char} keyVal={keyChars[char]} activate={operatorHandler} key={`${char}-pad`} />;
								case "clear":
									return <Keypad keyId={char} keyVal={keyChars[char]} activate={clearHandler} key={`${char}-pad`} />;
								case "equals":
									return <Keypad keyId={char} keyVal={keyChars[char]} activate={equalsHandler} key={`${char}-pad`} />;
								default:
									return <Keypad keyId={char} keyVal={keyChars[char]} activate={numberHandler} key={`${char}-pad`} />;
							}
						})
					}
				</div>
			</div>
			<History history={history} pickHistory={pickHistory} clearHistory={clearHistory} />
		</div>
	);
};

export default Calculator;
