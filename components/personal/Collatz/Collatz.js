import { useState, useEffect } from "react";

import collLook from './Collatz.module.scss'

const Collatz = () => {
	const [steps, setSteps] = useState([]);
	const [solved, setSolved] = useState(false);
	const [highest, setHighest] = useState(null);

	const solveHandler = (e) => {
		if (solved === true) { return };
		e.preventDefault();
		let val = parseInt(document.getElementById("starting").value);
		let newHighest = parseInt(document.getElementById("starting").value);
		let arr = [val];
		while (val !== 1) {
			if (val % 2 !== 0) { val = 3 * val + 1 }
			else { val = val / 2 };
			if (val > newHighest) { newHighest = val }
			arr.push(val);
		};
		setHighest(newHighest);
		setSteps(arr);
		setSolved(true);
	};

	const resetHandler = (e) => {
		e.preventDefault();
		setSolved(false);
		setSteps([]);
	};

	useEffect(() => {
		if (solved === true) {
			setTimeout(() => {
				const active = document.getElementById("output");
				active.scrollTo({
					left: 0,
					top: active.scrollHeight,
					behavior: "smooth"
				});
			}, 500)
		}
	}, [solved])

	return (
		<section>
			<input id="starting" type="number" step="1" min="1" onChange={resetHandler} />
			<button onClick={solveHandler}>Get Steps</button>
			<button onClick={resetHandler}>Reset</button>

			<p>Start: {solved === true && steps[0].toLocaleString()}</p>
			<p>Number of steps: {steps.length > 0 && steps.length.toLocaleString()}</p>
			<p>Highest: {solved === true && highest.toLocaleString()}</p>
			<div id="output" className={collLook.output}>
				{
					solved === true ? (
						<ol>
							{
								steps.map((number, index) => { return <li key={`${number}-key`} ><span style={{ color: `${index >= steps.length - 9 ? "red" : "inherit"}` }}>{number.toLocaleString()}</span></li> })
							}
						</ol>
					) : <p>Pending...</p>
				}
			</div>
		</section>
	);
};

export default Collatz;
