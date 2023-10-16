import { useState, useCallback, useMemo, KeyboardEventHandler } from 'react';
import Pad from './Pad/Pad';
import ControlPanel from './ControlPanel/ControlPanel';

import machineStyles from './DrumMachine.module.scss';
import { DrumMachineProps } from '@lib/props/types/projects';


const DrumMachine = (props: { assetInfo: DrumMachineProps }) => {
	const { assetInfo } = props;
	const banks = useMemo(() => assetInfo.banks, []);
	const numberOfBanks = useMemo(() => assetInfo.numberOfBanks, []);
	const soundList = useMemo(() => assetInfo.soundList, []);

	const chars = useMemo(() => ['q', 'w', 'e', 'a', 's', 'd', 'z', 'x', 'c'], []);

	// Keeps track of sound last played, active sound bank, master volume
	const [displaySound, setDisplaySound] = useState('');
	const [bankIndex, setBankIndex] = useState(0);
	const [mVolume, setMVolume] = useState(0.5);
	const [muteAll, setMuteAll] = useState(false);

	const setDisplaySoundHandler = (sound: string) => {
		setDisplaySound(sound);
	}

	const clearDisplaySoundHandler = (sound: string) => {
		if (sound === displaySound) setDisplaySound('');
	}

	const mVolumeHandler = (value: string) => {
		setMVolume(parseFloat(value));
	}

	const bankIndexHandler = (value: string) => {
		setBankIndex(parseInt(value));
		setDisplaySound('');
	}

	// Triggers sounds
	const keyDownHandler: KeyboardEventHandler = (e) => {
		e.preventDefault();
		if (chars.includes(e.key)) {
			const player = document.getElementById(e.key) as HTMLAudioElement;
			if (player === null) return null;
			player.pause();
			player.currentTime = 0;
			player.play();
		} else if (e.key === ' ') {
			stopAllHandler();
		}
	}

	// Iterate through all audio elements and stop them
	const stopAllHandler = useCallback(() => {
		const audios = document.getElementsByTagName('audio');
		for (let i = 0; i < audios.length; i++) {
			const active = audios.item(i) as HTMLAudioElement;
			active.pause();
			active.currentTime = 0;
		}
	}, []);

	const muteAllHandler = useCallback(() => {
		setMuteAll(!muteAll);
	}, [muteAll]);

	const activeBank = soundList[bankIndex];

	return (
		<section
			className={machineStyles.machine}
			tabIndex={0}
			onKeyDown={keyDownHandler}>
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
			<div className={machineStyles.grid} >
				{
					Object.keys(activeBank).map(char => {
						return <Pad
							char={char}
							name={activeBank[char]['name']}
							path={activeBank[char].path}
							mVolume={mVolume}
							muteAll={muteAll}
							setDisplaySound={setDisplaySoundHandler}
							clearDisplaySound={clearDisplaySoundHandler}
							key={`pad-${activeBank[char]['name']}`}
						/>
					})
				}
			</div>
		</section>
	);
};

export default DrumMachine;
