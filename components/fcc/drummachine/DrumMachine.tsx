import { KeyboardEventHandler } from 'react';
import Pad from './Pad/Pad';
import ControlPanel from './ControlPanel/ControlPanel';

import look from './DrumMachine.module.scss';
import { DrumMachineProps } from './types';
import { ContentContextProvider } from './ContentContext/ContentContext';
import { PlayStateContextProvider } from './PlayStateContext/PlayStateContext';


const DrumMachine = (props: { assetInfo: DrumMachineProps }) => {
	const { assetInfo } = props;
	const chars = ['q', 'w', 'e', 'a', 's', 'd', 'z', 'x', 'c'];

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
	const stopAllHandler = () => {
		const audios = document.getElementsByTagName('audio');
		for (const audio of audios) {
			audio.pause();
			audio.currentTime = 0;
		}
	}

	return (
		<ContentContextProvider data={assetInfo}>
			<PlayStateContextProvider>
				<section
					className={look.machine}
					tabIndex={0}
					onKeyDown={keyDownHandler}>
					<ControlPanel stopAllHandler={stopAllHandler} />
					<div className={look.grid} >
						{
							chars.map(char => {
								return <Pad
									char={char}
									key={`pad-${char}`}
								/>
							})
						}
					</div>
				</section>
			</PlayStateContextProvider>
		</ContentContextProvider>
	);
};

export default DrumMachine;
