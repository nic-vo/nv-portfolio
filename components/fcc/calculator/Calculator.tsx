import { KeyboardEventHandler, MouseEventHandler, useState } from 'react';

import Keypad from './Keypad/Keypad';
import keyChars from './Keypad/KeypadChars';
import History from './History/History';

import calcStyles from './Calculator.module.scss';

const keyList = Object.keys(keyChars);
const opRegex = /[+\-*/]-*$/

const Calculator = () => {
	/*
		Because javascript, the only acceptable blank state is empty string
	*/
	// 'entire' is the actual string to be evaluated
	const [entire, setEntire] = useState('');
	// 'chunk' is like a running string
	const [chunk, setChunk] = useState('');
	const [evaluated, setEvaluated] = useState('');
	const [history, setHistory] = useState<{ formula: string, result: string }[]>([]);

	const [oldAllowed, setOldAllowed] = useState(true);

	/*

	BEGIN Keypad Handlers

	*/

	/* Helpers */

	const replaceChunk = (value: string) => setChunk(value);

	const addToChunk = (value: string) => setChunk(chunk.concat(value));

	const addToEntire = (value: string) => setEntire(entire.concat(value));

	const opCheck = () => chunk.match(/[+\-*/]-*$/);

	const zeroCheck = () => chunk.match(/^0(?!\.)/);

	// allow/denyOld will only be called when new chunks are prepared to prevent decimal fuckery
	const allowOld = () => setOldAllowed(true);
	const denyOld = () => setOldAllowed(false);

	const clearEvaluated = () => setEvaluated('');

	const clearChunk = () => setChunk('');

	const clearEntire = () => setEntire('');

	/* Event Handlers */

	const inputHandler = (value: string) => {
		switch (value) {
			case '0':
				zeroHandler();
				break;
			case '.':
				decimalHandler();
				break;
			case '-':
				subtractHandler();
				break;
			case '+':
			case '*':
			case '/':
				operatorHandler({ target: { value } });
				break;
			case 'Delete':
				clearHandler();
				break;
			case 'Enter':
				equalsHandler();
				break;
			default:
				if (parseInt(value) >= 1 && parseInt(value) < 10)
					numberHandler({ target: { value } });
				break;
		}
	}

	const keyDownHandler: KeyboardEventHandler<HTMLDivElement> = (e) => {
		inputHandler(e.key);
	}

	const numberHandler = (e: { target: { value: string } }) => {
		const newNum = e.target.value;
		// If there's an evaluated answer, clear everything to start anew
		if (evaluated !== '') clearHandler();
		// Short circuit preventing number from being added if chunk starts with 0 (leading 0s)
		if (zeroCheck() !== null) return null;
		// If an operator has been placed, start a new chunk
		denyOld();
		if (opCheck() !== null) replaceChunk(newNum);
		else addToChunk(newNum);
		// If passes short circuit, lways add new number to entire
		addToEntire(newNum);
	}

	const zeroHandler = () => {
		// If there's an evaluated answer, clear everything to start anew
		if (evaluated !== '') clearHandler();
		// If this is a fresh reset or an operator has been placed, start a new chunk
		if (chunk === '' || opCheck() !== null) {
			denyOld();
			replaceChunk('0');
			addToEntire('0');
			// Only add new 0 if the chunk begins with either non-zero or a decimal
		} else if (zeroCheck() === null) {
			denyOld();
			addToEntire('0');
			addToChunk('0');
		}
	}

	const replaceOp = (op: string) => {
		// This func will replace the last char in entire with the new op
		const newEntire = entire.replace(opRegex, op);
		setEntire(newEntire);
		replaceChunk(op);
	}

	const operatorHandler = (e: { target: { value: string } }) => {
		const op = e.target.value;
		// If the eval string is blank, either already evaluated fresh page load / full clear
		// Because javascript, the only acceptable blank state is empty string
		if (entire === '') {
			// If evaluated is a number (may not be)
			// Replace eval string and add new operator
			if (evaluated !== '') {
				const curEvaluated = evaluated
				addToEntire(curEvaluated + op);
				replaceChunk(op);
				clearEvaluated();
			}
			// If fresh page load / full clear
			else addToEntire('0'.concat(op));
			allowOld();
		}
		// Special functionality: if last in eval string is an operator, replace
		else if (opCheck() !== null) replaceOp(op);
		// Typical use: if last input is a number or decimal(?), add new operator and prepare for replace
		else {
			allowOld();
			addToEntire(op);
			replaceChunk(op);
		}
	}

	const decimalHandler = () => {
		if (evaluated !== '') clearHandler();
		if (chunk === '' || opCheck() !== null) {
			denyOld();
			addToEntire('0.');
			replaceChunk('0.');
		} else if (chunk.match(/\./) === null) {
			denyOld();
			addToEntire('.');
			addToChunk('.');
		}
	}

	const subtractHandler = () => {
		const subtract = '-';
		const negative = '-';
		// If the eval string is blank, either already evaluated fresh page load / full clear
		// Because javascript, the only acceptable blank state is empty string
		if (entire === '') {
			// If evaluated is a number (may not be)
			// Replace eval string and add new operator
			if (evaluated !== '') {
				const curEvaluated = evaluated
				addToEntire(curEvaluated + subtract);
				replaceChunk(subtract);
				clearEvaluated();
			}
			// If fresh page load / full clear
			else addToEntire('0' + subtract);
			allowOld();
		}
		// Special functionality 01: if last in eval string is an operator, add a negative
		else if (chunk.match(/[+\-*/]$/) !== null) {
			addToEntire(negative);
			addToChunk(negative);
		}
		// Special functionality 02: if last in eval string is an operator w/ negative, replace
		else if (opCheck() !== null) replaceOp(subtract);
		// Typical use: if last input is a number or decimal(?), add new operator and prepare for replace
		else {
			allowOld();
			addToEntire(subtract);
			replaceChunk(subtract);
		}
	}

	// To prevent unnecessary toFixed decimal points if not needed
	const abridger = (value: number) => {
		const stringed = value.toString();
		// Check if evaluated string contains decimal more precise than 100-thousandth
		if (stringed.match(/^[-]{0,1}\d+\.\d{5,}$/) !== null)
			return parseFloat(value.toFixed(5));
		return value;
	}

	// Parses double negatives as addition
	const dblNeg = (entire: string) => entire.replace(/--/, '+');

	const historyUpdater = (entry: {
		formula: string,
		result: string
	}) => {
		if (history.length === 5) setHistory([...history.slice(1, 5), entry])
		else setHistory([...history, entry]);
	}

	const equalsHandler = () => {
		if (entire === '') return null;
		// If someone accidentally solves after adding op
		const replacedEntire = entire.replace(/[-]$/, '').replace(/[+\-*/]$/, '');
		// If already solved, add
		if (evaluated !== '')
			historyUpdater({ formula: evaluated, result: evaluated });
		else {
			const abridged = abridger(eval(dblNeg(replacedEntire)));
			setEvaluated(abridged.toString());
			historyUpdater({ formula: replacedEntire, result: abridged.toString() });
		}
		allowOld();
		clearEntire();
		clearChunk();
	}

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
	const pickHistory: MouseEventHandler<HTMLButtonElement> = (e) => {
		// Only if allowed, to prevent decimal fuckery from happening
		if (oldAllowed === false) return null;
		const histItem = e.currentTarget.value;
		addToEntire(histItem);
		replaceChunk(histItem);
		denyOld();
		clearEvaluated();
	}

	return (
		<section
			className={calcStyles.container}
			tabIndex={0}
			onKeyDown={keyDownHandler}>
			<div className={calcStyles.calculator}>
				<div className={calcStyles.screen}>
					<p>{entire !== '' ? entire : 'Ready'}</p>
					<p>{evaluated !== '' ? evaluated : chunk !== '' ? chunk : '--'}</p>
				</div>
				<div className={calcStyles.grid}>
					{
						Object.keys(keyChars).map((char) => {
							switch (char) {
								case 'zero':
									return <Keypad
										keyId={char}
										keyVal={keyChars[char]}
										content={keyChars[char]}
										handler={zeroHandler}
										key={`${char}-pad`} />;
								case 'decimal':
									return <Keypad
										keyId={char}
										keyVal={keyChars[char]}
										content={keyChars[char]}
										handler={decimalHandler}
										key={`${char}-pad`} />;
								case 'subtract':
									return <Keypad
										keyId={char}
										keyVal={keyChars[char]}
										content={keyChars[char]}
										handler={subtractHandler}
										key={`${char}-pad`} />;
								case 'add':
								case 'multiply':
								case 'divide':
									return <Keypad
										keyId={char}
										keyVal={keyChars[char]}
										content={keyChars[char]}
										handler={inputHandler}
										key={`${char}-pad`} />;
								case 'clear':
									return <Keypad
										keyId={char}
										keyVal={null}
										content={keyChars[char]}
										handler={clearHandler}
										key={`${char}-pad`} />;
								case 'equals':
									return <Keypad
										keyId={char}
										keyVal={null}
										content={keyChars[char]}
										handler={equalsHandler}
										key={`${char}-pad`} />;
								case 'one':
								case 'two':
								case 'three':
								case 'four':
								case 'five':
								case 'six':
								case 'seven':
								case 'eight':
								case 'nine':
									return <Keypad
										keyId={char}
										keyVal={keyChars[char]}
										content={keyChars[char]}
										handler={inputHandler}
										key={`${char}-pad`} />;
							}
						})
					}
				</div>
			</div>
			<History
				history={history}
				pickHistory={pickHistory}
				clearHistory={clearHistory}
				oldAllowed={oldAllowed} />
		</section >
	);
}

export default Calculator;
