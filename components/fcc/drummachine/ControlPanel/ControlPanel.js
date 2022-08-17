import React from 'react'
import { FaVolumeMute, FaStop } from 'react-icons/fa';

import machineStyles from '../../../../styles/fcc/DrumMachine/DrumMachine.module.css';
import controlStyles from './ControlPanel.module.css';

const bankNames = ["FlumeSounds", "Hip Hop @186 BPM", "Synths @100 BPM"];

const ControlPanel = ({ displaySound, mVolume, bank, muteAll, mVolumeHandler, setBankHandler, stopAllHandler, muteAllHandler }) => {
	return (
		<div className={controlStyles.panel}>
			<div className={controlStyles.sounds}>
				<div className={controlStyles.soundDisplay}>
					<p>{bankNames[bank]}:</p>
					<p>{displaySound}</p>
				</div>
				<label htmlFor="bank">Sound Bank<input id="bank" type="range" min="0" max="2" step="1" value={bank} onInput={setBankHandler} /></label>
			</div>
			<div className={controlStyles.playback}>
				<label htmlFor="mVolume">Master Volume
					<input id="mVolume" type="range" min="0" max="1" step="0.05" value={mVolume} onInput={mVolumeHandler} />
				</label>
				<button className={`${machineStyles.button} ${machineStyles.stop}`} onClick={stopAllHandler}><FaStop /></button>
				<button className={`${machineStyles.button} ${muteAll ? machineStyles.muteon : machineStyles.mute}`} onClick={muteAllHandler}><FaVolumeMute /></button>
			</div>

		</div>
	);
};

export default ControlPanel;
