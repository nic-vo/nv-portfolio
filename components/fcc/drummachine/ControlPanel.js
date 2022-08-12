import React from 'react'

import machineStyles from '../../../styles/fcc/DrumMachine/DrumMachine.module.css';
import controlStyles from '../../../styles/fcc/DrumMachine/ControlPanel.module.css';

const bankNames = ["FlumeSounds", "Hip Hop @186 BPM", "Synths @100 BPM"];

const ControlPanel = ({ displaySound, mVolume, bank, muteAll, mVolumeHandler, setBankHandler, stopAllHandler, muteAllHandler }) => {
	return (
		<div>
			<label htmlFor="mVolume">Master Volume
				<input id="mVolume" type="range" min="0" max="1" step="0.05" value={mVolume} onInput={mVolumeHandler} />
				<p>{mVolume}</p>
			</label>
			<label htmlFor="bank">Sound Bank
				<input id="bank" type="range" min="0" max="2" step="1" value={bank} onInput={setBankHandler} />
				<p>{bankNames[bank]}</p>
			</label>
			<p>Active: {displaySound}</p>
			<button className={`${machineStyles.button} ${machineStyles.stop}`} onClick={stopAllHandler}>STOP ALL</button>
			<button className={` ${machineStyles.button} ${muteAll ? machineStyles.muteon : machineStyles.mute}`} onClick={muteAllHandler}>MUTE ALL</button>
		</div>
	);
};

export default ControlPanel;
