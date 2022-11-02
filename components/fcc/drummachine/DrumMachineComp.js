import { useState, useCallback, useMemo } from 'react';
import Pad from './Pad/Pad';
import ControlPanel from './ControlPanel/ControlPanel';

import machineStyles from './DrumMachine.module.css';



const DrumMachineComp = ({ banks, numberOfBanks, soundList }) => {

	// Keeps track of sound last played, active sound bank, master volume
	const [displaySound, setDisplaySound] = useState("");
	const [bankIndex, setBankIndex] = useState(0);
	const [mVolume, setMVolume] = useState(0.5);
	const [muteAll, setMuteAll] = useState(false);

	const setDisplaySoundHandler = useCallback((sound) => {
		setDisplaySound(sound);
	}, [displaySound]);

	const clearDisplaySoundHandler = useCallback((sound) => {
		if (sound === displaySound) {
			setDisplaySound("");
		};
	}, [displaySound]);

	const mVolumeHandler = useCallback((e) => {
		setMVolume(parseFloat(e.target.value));
	}, [mVolume])

	const bankIndexHandler = useCallback((e) => {
		setBankIndex(parseInt(e.target.value));
		setDisplaySound("");
	}, [bankIndex]);

	// Triggers sounds
	const keyPressHandler = (e) => {
		if (chars.includes(e.key)) {
			const player = document.getElementById(e.key);
			player.currentTime = 0;
			player.play();
		};
	};

	// Iterate through all audio elements and stop them
	const stopAllHandler = useCallback(() => {
		const audios = document.getElementsByTagName("audio");
		for (let i = 0; i < audios.length; i++) {
			const active = audios.item(i);
			active.pause();
			active.currentTime = 0;
		};
	}, []);

	const muteAllHandler = useCallback(() => {
		setMuteAll(!muteAll);
	}, [muteAll]);

	const activeBank = useMemo(() => {
		return soundList[bankIndex]
	}, [bankIndex])

	return (
		<section className={machineStyles.machine}>
			<ControlPanel
				banks={banks}
				displaySound={displaySound}
				mVolume={mVolume}
				bankIndex={bankIndex}
				numberOfBanks={numberOfBanks}
				muteAll={muteAll}
				mVolumeHandler={mVolumeHandler}
				bankIndexHandler={bankIndexHandler}
				stopAllHandler={stopAllHandler}
				muteAllHandler={muteAllHandler} />
			<div className={machineStyles.grid} tabIndex="0" onKeyPress={keyPressHandler}>
				{Object.keys(activeBank).map(char => {
					return <Pad
						char={char}
						name={activeBank[char]["name"]}
						path={activeBank[char].path}
						mVolume={mVolume}
						muteAll={muteAll}
						setDisplaySound={setDisplaySoundHandler}
						clearDisplaySound={clearDisplaySoundHandler}
						key={`pad-${activeBank[char]["name"]}`}
					/>
				})}
			</div>
		</section>
	);
};

export default DrumMachineComp;
