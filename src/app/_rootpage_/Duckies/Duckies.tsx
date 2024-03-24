'use client';

import { useState, useEffect, useMemo } from 'react';

import Duck from './Duck';

const Duckies = () => {
	// pX and pY to handle on hover mouse pos; passed to children ducks so they can calculate new individual pos
	const [pX, setPX] = useState<number | null>(null);
	const [pY, setPY] = useState<number | null>(null);
	// Boolean whether mouse is in pond
	const [hoverToggle, setHoverToggle] = useState(false);
	// Boolean toggle for rate limiting updates to parent pos
	const [hoverLimit, setHoverLimit] = useState(false);
	const [hoverLimitTimeout, setHoverLimitTimeout] =
		useState<NodeJS.Timeout | null>(null);

	const pointerOverHandler = (e: React.PointerEvent) => {
		setHoverToggle(true);
		setHoverLimit(true);
		setPX(e.clientX);
		setPY(e.clientY);
	};

	const pointerMoveHandler = (e: React.PointerEvent) => {
		// hoverToggle dictates whether mouse is in pond; hoverLimit is rate limit for move events
		if (
			hoverToggle === false ||
			hoverLimit === true ||
			pX === null ||
			pY === null
		)
			return null;

		// Pythagorean theorem to determine if mouse is far enough away from last calculation to trigger child duck movement
		const sqrDist = Math.sqrt(
			Math.abs(pX - e.clientX) ^ (2 + Math.abs(pY - e.clientY)) ^ 2,
		);
		if (sqrDist < 5) return null;

		// If mouse is far enough away,
		setPX(e.clientX);
		setPY(e.clientY);
		setHoverLimit(true);
	};

	const pointerLeaveHandler = () => {
		// Mouse leaves pond
		// Cancel rate limit, boolean in pond, remove parent pos prop
		if (hoverLimitTimeout !== null) clearTimeout(hoverLimitTimeout);
		setHoverToggle(false);
		setHoverLimitTimeout(null);
		setHoverLimit(false);
		setPX(null);
		setPY(null);
	};

	useEffect(() => {
		if (hoverLimit === false) {
			return;
		}
		setHoverLimitTimeout(setTimeout(() => setHoverLimit(false), 100));
	}, [hoverLimit]);

	const duckArr = useMemo(() => {
		return [1, 2, 3, 4, 5, 6, 7, 8];
	}, []);

	return (
		<div
			onPointerOver={pointerOverHandler}
			onPointerMove={pointerMoveHandler}
			onPointerLeave={pointerLeaveHandler}
			className='m-0 w-1/2 max-w-screen-lg h-full max-h-[50%] bg-sky-300 rounded-3xl origin-top-left'
			id='pond'>
			{duckArr.map((slot, index) => {
				return (
					<Duck
						key={`${index}-duck`}
						pX={pX}
						pY={pY}
						hoverToggle={hoverToggle}
					/>
				);
			})}
		</div>
	);
};

export default Duckies;
