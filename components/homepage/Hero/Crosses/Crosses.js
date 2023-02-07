import { useMemo } from 'react';

import Cross from './Cross/Cross';

import crossesLook from './Crosses.module.scss';

const Crosses = ({ limit }) => {
	const initer = useMemo(() => {
		let arr = [];
		for (let i = 0; i < limit; i++) {
			arr.push(i);
		};
		return arr;
	}, [limit]);

	return (
		<div className={crossesLook.container}>
			{initer.map((slot, index) => {
				return <Cross key={`cross-${index}`} />
			})}
		</div>
	);
};

export default Crosses;
