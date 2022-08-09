import React from 'react';
import SoundList from './soundList';

import styles from '../../../styles/fcc/DrumMachine.module.css';

const Pad = ({ char, padIndex, bank }) => {
	const fileString = `${SoundList[bank].sounds[padIndex]}`;
	const dirString = `${ bank === 2 ? "synth": bank === 1 ? "mafia" : "flume"}`;
	const srcString = `/assets/fcc/DrumMachine/${dirString}/${fileString}.mp3`;

	return (
		<div id={char} className={styles.pad}>
			<p>{char}</p>
			<p>{fileString}</p>
		</div>
	);
};

export default Pad;
