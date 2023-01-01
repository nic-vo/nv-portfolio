import { useMemo, useState } from 'react';

import Cross from './Cross/Cross';

import crossesLook from './Crosses.module.scss';

const Crosses = () => {
	const [recalculate, setRecalculate] = useState(0);

	const initer = useMemo(() => {
		let arr = [];
		for (let i = 0; i < 150; i++) {
			arr.push(i);
		};
		return arr;
	}, [recalculate]);

	return (
		<div className={crossesLook.container}>
			<button onClick={() => { setRecalculate(prev => { return prev + 1 }) }}>recalculate</button>
			{initer.map((slot, index) => {
				return <Cross key={`cross-${index}`} recalculate={recalculate} />
			})}
		</div>
	);
};

export default Crosses;
