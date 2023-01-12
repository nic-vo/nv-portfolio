import { useMemo } from 'react';

import Cross from './Cross/Cross';

import crossesLook from './Crosses.module.scss';

const Crosses = ({ limit, focus }) => {
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
				return <Cross key={`cross-${index}`} plane={index % 8} focus={focus} />
			})}
		</div>
	);
};

export default Crosses;
