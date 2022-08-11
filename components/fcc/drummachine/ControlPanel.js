import React from 'react'

import styles from '../../../styles/fcc/DrumMachine/ControlPanel.module.css';

const ControlPanel = ({ displaySound, mVolume, bankIndex, bank, muteAll, mVolumeHandler, bankIndexHandler, stopAllHandler, muteAllHandler }) => {
	return (
		<div>
			<label for="mVolume">Master Volume<input id="mVolume" type="range" min="0" max="1" step="0.05" value={mVolume} onInput={mVolumeHandler} /> <p>{mVolume}</p></label>
			<p>Active sound: {displaySound}</p>
		</div>
	);
};

export default ControlPanel;
