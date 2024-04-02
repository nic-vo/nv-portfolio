import {
	useContext,
	PointerEventHandler,
	ChangeEventHandler,
	useMemo,
} from 'react';
import {
	FaVolumeMute,
	FaStop,
	FaMusic,
	FaVolumeUp,
	FaVolumeOff,
} from 'react-icons/fa';
import ContentContext from '../ContentContext/ContentContext';
import PlayStateContext from '../PlayStateContext/PlayStateContext';

import machineLook from '../DrumMachine.module.scss';
import controlLook from './ControlPanel.module.scss';

const MasterSlider = () => {
	const { masterVolume, newMasterVolume } = useContext(PlayStateContext);

	const pointerUpHandler: PointerEventHandler<HTMLInputElement> = (e) => {
		newMasterVolume(parseFloat(e.currentTarget.value));
	};

	const changeHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
		newMasterVolume(parseFloat(e.target.value));
	};

	return (
		<label htmlFor='mVolume'>
			<FaVolumeUp />
			<input
				id='mVolume'
				type='range'
				min='0'
				max='1'
				step='0.05'
				value={masterVolume}
				onChange={changeHandler}
				onPointerUp={pointerUpHandler}
			/>
		</label>
	);
};

const BankSlider = () => {
	const { banks, activeBank, changeActiveBank } = useContext(ContentContext);

	const bankOnChangeHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
		changeActiveBank(parseInt(e.target.value));
	};

	return (
		<label htmlFor='bank'>
			<FaMusic />
			<input
				id='bank'
				type='range'
				min='0'
				max={banks.length - 1}
				step='1'
				value={activeBank}
				onChange={bankOnChangeHandler}
			/>
		</label>
	);
};

const Display = () => {
	const { displaySound } = useContext(PlayStateContext);
	const { banks, activeBank } = useContext(ContentContext);
	return useMemo(() => {
		return (
			<div className={controlLook.display}>
				<p className={controlLook.bankName}>{banks[activeBank]}:</p>
				<p>{displaySound !== '' ? displaySound : '--'}</p>
			</div>
		);
	}, [displaySound, activeBank]);
};

const MuteAllButton = () => {
	const { muteAll, toggleMuteAll } = useContext(PlayStateContext);

	return (
		<button
			className={`${machineLook.button} ${muteAll ? machineLook.muteon : machineLook.mute}`}
			onClick={toggleMuteAll}>
			{muteAll === true ? <FaVolumeMute /> : <FaVolumeOff />}
		</button>
	);
};

const ControlPanel = (props: { stopAllHandler: () => void }) => {
	// This component sets master volume and active sound bank; also displays them in a stylized screen
	const { stopAllHandler } = props;

	return (
		<div className={controlLook.panel}>
			<Display />
			<div className={controlLook.controls}>
				<div className={controlLook.sliders}>
					<BankSlider />
					<MasterSlider />
				</div>
				<div className={controlLook.buttons}>
					<button
						className={`${machineLook.button} ${machineLook.stop}`}
						onClick={stopAllHandler}>
						<FaStop />
					</button>
					<MuteAllButton />
				</div>
			</div>
		</div>
	);
};

export default ControlPanel;
