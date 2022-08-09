import React from 'react'

import styles from '../../../styles/fcc/DrumMachine.module.css';

const Pad = ({ char, index, bank }) => {


	const srcString = `/assets/fcc/DrumMachine/${ bank === 2 ? "synth": bank === 1 ? "mafia" : "flume"}/`

	return (
		<div id={char} className={styles.pad}>
			<p>{char}</p>
		</div>
	);
};

export default Pad;
