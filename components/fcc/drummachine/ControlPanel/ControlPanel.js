import React from 'react'
import { FaVolumeMute, FaStop, FaMusic, FaVolumeUp, FaVolumeOff } from 'react-icons/fa';

import machineStyles from '../../../../styles/fcc/DrumMachine/DrumMachine.module.css';
import controlStyles from './ControlPanel.module.css';

const bankNames = ["FlumeSounds", "Hip Hop @186 BPM", "Synths @100 BPM"];

const ControlPanel = ({ displaySound, mVolume, bank, muteAll, mVolumeHandler, setBankHandler, stopAllHandler, muteAllHandler }) => {
	return (
		<div className={controlStyles.panel}>
			<div className={controlStyles.display}>
				<p>{bankNames[bank]}:</p>
				<p>{displaySound}</p>
			</div>
			<div className={controlStyles.controls}>
				<div className={controlStyles.sliders}>
					<label htmlFor="bank"><FaMusic /><input id="bank" type="range" min="0" max="2" step="1" value={bank} onInput={setBankHandler} /></label>
					<label htmlFor="mVolume"><FaVolumeUp /><input id="mVolume" type="range" min="0" max="1" step="0.05" value={mVolume} onInput={mVolumeHandler} />
					</label>
				</div>
				<div className={controlStyles.buttons}>
					<button className={`${machineStyles.button} ${machineStyles.stop}`} onClick={stopAllHandler}><FaStop /></button>
					<button className={`${machineStyles.button} ${muteAll ? machineStyles.muteon : machineStyles.mute}`} onClick={muteAllHandler}>{muteAll === true ? <FaVolumeMute /> : <FaVolumeOff />}</button>
				</div>
			</div>
		</div>
	);
};

export default ControlPanel;
