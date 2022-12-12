import { useState, useEffect } from "react";

import Duck from "./Duck/Duck";

const Duckies = () => {
	const [pX, setPX] = useState(null);
	const [pY, setPY] = useState(null);
	const [hoverToggle, setHoverToggle] = useState(false);
	const [hoverLimit, setHoverLimit] = useState(false);
	const [hoverLimitTimeout, setHoverLimitTimeout] = useState(null);

	const pointerOverHandler = (e) => {
		setHoverToggle(true);
		setHoverLimit(true);
		setPX(parseFloat(e.clientX));
		setPY(parseFloat(e.clientY));
	};

	const pointerMoveHandler = (e) => {
		if (hoverToggle === false || hoverLimit === true) { return };
		const sqrDist = Math.sqrt((Math.abs(pX - e.clientX)) ^ 2 + (Math.abs(pY - e.clientY)) ^ 2);
		if (sqrDist < 5) { return };
		setPX(parseFloat(e.clientX));
		setPY(parseFloat(e.clientY));
		setHoverLimit(true);
	};

	const pointerLeaveHandler = () => {
		clearTimeout(hoverLimitTimeout);
		setHoverToggle(false);
		setHoverLimitTimeout(null);
		setHoverLimit(false);
		setPX(null);
		setPY(null);
	};

	useEffect(() => {
		if (hoverLimit === false) { return }
		setHoverLimitTimeout(() => {
			return setTimeout(() => {
				setHoverLimit(false);
			}, 100);
		});
	}, [hoverLimit]);

	return (
		<div
			onPointerOver={pointerOverHandler}
			onPointerMove={pointerMoveHandler}
			onPointerLeave={pointerLeaveHandler}
			style={{ position: 'relative', margin: '0', width: '50%', height: '50%', backgroundColor: "rgba(150, 225, 255, 1)", transformOrigin: 'top left' }} id='pond'>
			<Duck key="0-duck" pX={pX} pY={pY} hoverToggle={hoverToggle} />
			<Duck key="1-duck" pX={pX} pY={pY} hoverToggle={hoverToggle} />
			<Duck key="2-duck" pX={pX} pY={pY} hoverToggle={hoverToggle} />
			<Duck key="3-duck" pX={pX} pY={pY} hoverToggle={hoverToggle} />
			<Duck key="4-duck" pX={pX} pY={pY} hoverToggle={hoverToggle} />
			<Duck key="5-duck" pX={pX} pY={pY} hoverToggle={hoverToggle} />
			<Duck key="6-duck" pX={pX} pY={pY} hoverToggle={hoverToggle} />
			<Duck key="7-duck" pX={pX} pY={pY} hoverToggle={hoverToggle} />
		</div>
	);
};

export default Duckies;
