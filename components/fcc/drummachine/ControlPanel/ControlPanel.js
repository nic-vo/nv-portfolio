import { FaVolumeMute, FaStop, FaMusic, FaVolumeUp, FaVolumeOff } from 'react-icons/fa';

import machineStyles from '../DrumMachine.module.scss';
import controlStyles from './ControlPanel.module.scss';



const MasterSlider = ({ mVolume, mVolumeHandler }) => {
	return (
		<label htmlFor='mVolume'>
			<FaVolumeUp />
			<input
				id='mVolume'
				type='range'
				min='0'
				max='1'
				step='0.05'
				value={mVolume}
				onChange={mVolumeHandler}
				onPointerUp={mVolumeHandler} />
		</label>
	);
};

const ControlPanel = ({
	banks,
	displaySound,
	mVolume,
	bankIndex,
	numberOfBanks,
	muteAll,
	mVolumeHandler,
	bankIndexHandler,
	stopAllHandler,
	muteAllHandler
}) => {

	// This component sets master volume and active sound bank; also displays them in a stylized screen

	return (
		<div className={controlStyles.panel}>
			<div className={controlStyles.display}>
				<p className={controlStyles.bankName}>{banks[bankIndex]}:</p>
				<p>{displaySound ? displaySound : '--'}</p>
			</div>
			<div className={controlStyles.controls}>
				<div className={controlStyles.sliders}>
					<label htmlFor='bank'>
						<FaMusic />
						<input
							id='bank'
							type='range'
							min='0'
							max={numberOfBanks}
							step='1'
							value={bankIndex}
							onChange={bankIndexHandler} />
					</label>
					<MasterSlider mVolume={mVolume} mVolumeHandler={mVolumeHandler} />
				</div>
				<div className={controlStyles.buttons}>
					<button
						className={`${machineStyles.button} ${machineStyles.stop}`}
						onClick={stopAllHandler}>
						<FaStop />
					</button>
					<button
						className={`${machineStyles.button} ${muteAll ? machineStyles.muteon : machineStyles.mute}`}
						onClick={muteAllHandler}>
						{muteAll === true ? <FaVolumeMute /> : <FaVolumeOff />}
					</button>
				</div>
			</div>
		</div>
	);
};

export default ControlPanel;
