import { React, useState } from 'react';
import { Keypad, KeypadCharacters as keyChars, History, KeypadCharacters } from '../../components/fcc/calculator';

const Calculator = () => {
	const [active, setActive] = useState("");
	const [entire, setEntire] = useState("");
	const [history, setHistory] = useState([]);

	const keyPressHandler = (e) => {
		setActive(e.target.id);
	};

	return (
		<div>
			<h1>Container</h1>
			<div>
				<h2>Calculator</h2>
				<div>
					<h3>Screen</h3>
					<p>entire</p>
					<p>active: {active}</p>
				</div>
				<div tabIndex={0}>
					<h3>Key Grid</h3>
					{
						Object.keys(keyChars).map((char) => {
							return <Keypad keyId={keyChars[char]} activate={keyPressHandler} key={`${char}-pad`}/>
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
