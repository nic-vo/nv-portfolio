import React from 'react'

import styles from '../../../styles/fcc/DrumMachine/ControlPanel.module.css';

const ControlPanel = ({ displaySound, mVolume, bankIndex, bank, muteAll, mVolumeHandler, bankIndexHandler, stopAllHandler, muteAllHandler }) => {
	return (
		<div>
			<label htmlFor="mVolume">Master Volume
				<input id="mVolume" type="range" min="0" max="1" step="0.05" value={mVolume} onInput={mVolumeHandler} />
				<p>{mVolume}</p>
			</label>
			<label htmlFor="bankIndex">Sound Bank
				<input id="bankIndex" type="range" min="0" max="2" step="1" value={bankIndex} onInput={bankIndexHandler} />
				<p>{bank}</p>
			</label>
			<p>Active sound: {displaySound}</p>
			<button onClick={stopAllHandler}>STOP ALL</button>
			<button onClick={muteAllHandler}>MUTE ALL</button>
		</div>
	);
};

export default ControlPanel;
