import { useState } from "react";

const CollatzComp = () => {
	const [steps, setSteps] = useState([]);
	const [solved, setSolved] = useState(false);
	const [highest, setHighest] = useState(null);

	const solveHandler = (e) => {
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
		setHighest(newHighest)
		setSteps(arr);
		setSolved(true);
	};

	const resetHandler = (e) => {
		e.preventDefault();
		setSolved(false);
		setSteps([]);
	};

	return (
		<section>
			<input id="starting" type="number" step="1" min="1" onChange={resetHandler} />
			<button onClick={solveHandler}>Get Steps</button>
			<div>
				<p>Start: {solved === true && steps[0].toLocaleString()}</p>
				<p>Number of steps: {steps.length > 0 && steps.length.toLocaleString()}</p>
				<p>Highest: {solved === true && highest.toLocaleString()}</p>
				<ol>
					{
						steps.map(number => { return <li key={`${number}-key`} style={{ color: `${number === steps[0] ? "red" : "inherit"}` }}>{number.toLocaleString()}</li> })
					}
				</ol>
			</div>
		</section>
	);
};

export default CollatzComp;
