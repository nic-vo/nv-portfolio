import { React, useState } from 'react';
import { Keypad, KeypadCharacters as keyChars, History, KeypadCharacters } from '../../components/fcc/calculator';

import calcStyles from '../../styles/fcc/Calculator/Calculator.module.css';



const keyList = Object.keys(keyChars);
const opRegex = /[+\-*/]-*$/

const Calculator = () => {
	/*
		Because javascript, the only acceptable blank state is empty string
	*/
	// "entire" is the actual string to be evaluated
	const [entire, setEntire] = useState("");
	// "chunk" is like a running string
	const [chunk, setChunk] = useState("");
	const [evaluated, setEvaluated] = useState("");
	const [history, setHistory] = useState([]);

	const [oldAllowed, setOldAllowed] = useState(true);
	const [splode, setSplode] = useState(false);

	/*

	BEGIN Keypad Handlers

	*/

	/* Helpers */

	const replaceChunk = (value) => { setChunk(value) };

	const addToChunk = (value) => { setChunk(chunk + value) };

	const addToEntire = (value) => { setEntire(entire + value) };

	const opCheck = () => { return chunk.match(/[+\-*/]-*$/) };

	const zeroCheck = () => { return chunk.match(/^0(?!\.)/) };

	// allow/denyOld will only be called when new chunks are prepared to prevent decimal fuckery
	const allowOld = () => { setOldAllowed(true) };
	const denyOld = () => { setOldAllowed(false) };

	const clearEvaluated = () => { setEvaluated("") };

	const clearChunk = () => { setChunk("") };

	const clearEntire = () => { setEntire("") };

	/* Event Handlers */
	const keyDownHandler = (e) => {
		console.log(e.key);
		switch (e.key) {
			case "0":
				return zeroHandler();
			case ".":
				return decimalHandler();
			case "-":
				return subtractHandler();
			case "+":
			case "*":
			case "/":
				return operatorHandler({ target: { value: e.key } });
			case "Delete":
				return clearHandler();
			case "Enter":
				return equalsHandler();
			default:
				if (e.key >= 1 && e.key < 10) { return numberHandler({ target: { value: e.key } }) };
		};
	};

	const splodeHandler = () => {
		setSplode(!splode);
	};

	const numberHandler = (e) => {
		const newNum = e.target.value;
		// If there's an evaluated answer, clear everything to start anew
		if (evaluated !== "") { clearHandler(); };
		// Short circuit preventing number from being added if chunk starts with 0 (leading 0s)
		if (zeroCheck() !== null) { return };
		// If an operator has been placed, start a new chunk
		denyOld();
		if (opCheck() !== null) {
			replaceChunk(newNum);
		} else {
			addToChunk(newNum);
		};
		// If passes short circuit, lways add new number to entire
		addToEntire(newNum);
	};

	const zeroHandler = () => {
		// If there's an evaluated answer, clear everything to start anew
		if (evaluated !== "") { clearHandler(); };
		// If this is a fresh reset or an operator has been placed, start a new chunk
		if (!chunk || opCheck() !== null) {
			denyOld();
			replaceChunk("0");
			addToEntire("0");
			// Only add new 0 if the chunk begins with either non-zero or a decimal
		} else if (zeroCheck() === null) {
			denyOld();
			addToEntire("0");
			addToChunk("0");
		};
	}

	const replaceOp = (op) => {
		// This func will replace the last char in entire with the new op
		const newEntire = entire.replace(opRegex, op);
		setEntire(newEntire);
		replaceChunk(op);
	};

	const operatorHandler = (e) => {
		const op = e.target.value
		// If the eval string is blank, either already evaluated fresh page load / full clear
		// Because javascript, the only acceptable blank state is empty string
		if (entire === "") {
			// If evaluated is a number (may not be)
			// Replace eval string and add new operator
			if (evaluated !== "") {
				const curEvaluated = evaluated
				addToEntire(curEvaluated + op);
				replaceChunk(op);
				clearEvaluated();
			}
			// If fresh page load / full clear
			else { addToEntire("0" + op); };
			allowOld();
		}
		// Special functionality: if last in eval string is an operator, replace
		else if (opCheck() !== null) {
			replaceOp(op);
		}
		// Typical use: if last input is a number or decimal(?), add new operator and prepare for replace
		else {
			allowOld();
			addToEntire(op);
			replaceChunk(op);
		};
	};

	const decimalHandler = () => {
		if (evaluated !== "") { clearHandler(); };
		if (!chunk || opCheck() !== null) {
			denyOld();
			addToEntire("0.");
			replaceChunk("0.");
		} else if (chunk.match(/\./) === null) {
			denyOld();
			addToEntire(".");
			addToChunk(".");
		};
	};

	const subtractHandler = () => {
		const subtract = "-";
		const negative = "-";
		// If the eval string is blank, either already evaluated fresh page load / full clear
		// Because javascript, the only acceptable blank state is empty string
		if (entire === "") {
			// If evaluated is a number (may not be)
			// Replace eval string and add new operator
			if (evaluated !== "") {
				const curEvaluated = evaluated
				addToEntire(curEvaluated + subtract);
				replaceChunk(subtract);
				clearEvaluated();
			}
			// If fresh page load / full clear
			else { addToEntire("0" + subtract); };
			allowOld();
		}
		// Special functionality 01: if last in eval string is an operator, add a negative
		else if (chunk.match(/[+\-*/]$/) !== null) {
			addToEntire(negative);
			addToChunk(negative);
		}
		// Special functionality 02: if last in eval string is an operator w/ negative, replace
		else if (opCheck() !== null) { replaceOp(subtract); }
		// Typical use: if last input is a number or decimal(?), add new operator and prepare for replace
		else {
			allowOld();
			addToEntire(subtract);
			replaceChunk(subtract);
		};
	};

	// To prevent unnecessary toFixed decimal points if not needed
	const abridger = (value) => {
		const stringed = value.toString();
		// Check if evaluated string contains decimal more precise than 100-thousandth
		if (stringed.match(/^[-]{0,1}\d+\.\d{5,}$/) !== null) {
			return value.toFixed(5);
		};
		return value;
	};

	// Parses double negatives as addition
	const dblNeg = (entire) => {
		return entire.replace(/--/, "+");
	};

	const historyUpdater = (entry) => {
		if (history.length === 5) {
			const oldHistory = history.slice(1,4);
			const newHistory = [...oldHistory, entry];
			setHistory(newHistory);
		} else {
			const newHistory = [...history, entry];
			setHistory(newHistory);
		}
	}

	const equalsHandler = () => {
		// If someone accidentally solves after adding op
		const replacedEntire = entire.replace(/[-]$/, "").replace(/[+\-*/]$/, "")
		// If already solved, add
		if (evaluated !== "") {
			historyUpdater([evaluated, evaluated]);
		} else {
			const abridged = abridger(eval(dblNeg(replacedEntire)));
			setEvaluated(abridged);
			historyUpdater([replacedEntire, abridged]);
		}
		allowOld();
		clearEntire();
		clearChunk();
	};

	const clearHandler = () => {
		allowOld();
		clearEntire();
		clearChunk();
		clearEvaluated();
	};

	/* END Keypad Handlers */

	const clearHistory = () => {
		setHistory([]);
	};

	// Adds history items as chunks back into equation
	const pickHistory = (e) => {
		// Only if allowed, to prevent decimal fuckery from happening
		if (allowOld === false) { return };
		const histItem = e.target.value;
		addToEntire(histItem);
		replaceChunk(histItem);
		denyOld();
		clearEvaluated();
	}

	return (
		<div tabIndex={0} onKeyDown={keyDownHandler}>
			<div>
				<div className={calcStyles.screen}>
					<p>{entire !== "" ? entire : "Ready"}</p>
					<p>{chunk !== "" ? chunk : "Ready"}</p>
				</div>
				<div className={calcStyles.grid}>
					{
						keyList.map((char) => {
							switch (char) {
								case "zero":
									return <Keypad keyId={char} keyVal={keyChars[char]} content={keyChars[char]} handler={zeroHandler} key={`${char}-pad`} splode={splode} />;
								case "decimal":
									return <Keypad keyId={char} keyVal={keyChars[char]} content={keyChars[char]} handler={decimalHandler} key={`${char}-pad`} splode={splode} />;
								case "subtract":
									return <Keypad keyId={char} keyVal={keyChars[char]} content={keyChars[char]} handler={subtractHandler} key={`${char}-pad`} splode={splode} />;
								case "add":
								case "multiply":
								case "divide":
									return <Keypad keyId={char} keyVal={keyChars[char]} content={keyChars[char]} handler={operatorHandler} key={`${char}-pad`} splode={splode} />;
								case "clear":
									return <Keypad keyId={char} keyVal={null} content={keyChars[char]} handler={clearHandler} key={`${char}-pad`} splode={splode} />;
								case "equals":
									return <Keypad keyId={char} keyVal={null} content={keyChars[char]} handler={equalsHandler} key={`${char}-pad`} splode={splode} />;
								default:
									return <Keypad keyId={char} keyVal={keyChars[char]} content={keyChars[char]} handler={numberHandler} key={`${char}-pad`} splode={splode} />;
							}
						})
					}
				</div>
				<History history={history} pickHistory={pickHistory} clearHistory={clearHistory} oldAllowed={oldAllowed} />
			</div>
			<button onClick={splodeHandler} style={{zIndex: 10}}>?</button>
		</section>
	);
};

export default Calculator;
