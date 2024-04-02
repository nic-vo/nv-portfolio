import { createContext, useState, useCallback } from 'react';

const PlayStateContext = createContext<{
	displaySound: string,
	masterVolume: number,
	muteAll: boolean,
	newDisplaySound: (sound: string) => void,
	clearDisplaySound: (sound: string) => void,
	newMasterVolume: (value: number) => void,
	toggleMuteAll: () => void
}>({
	displaySound: '',
	masterVolume: 50,
	muteAll: false,
	newDisplaySound: () => { },
	clearDisplaySound: () => { },
	newMasterVolume: () => { },
	toggleMuteAll: () => { }
});

export const PlayStateContextProvider = (props: { children: React.ReactNode }) => {
	const [displaySound, setDisplaySound] = useState('');
	const [masterVolume, setMasterVolume] = useState(0.50);
	const [muteAll, setMuteAll] = useState(false);

	const newDisplaySound = useCallback(
		(sound: string) => setDisplaySound(sound),
		[]);

	const clearDisplaySound = useCallback(
		(sound: string) => setDisplaySound(prev => prev === sound ? '' : prev),
		[]);

	const newMasterVolume = useCallback(
		(value: number) => setMasterVolume(value),
		[]);

	const toggleMuteAll = useCallback(() => setMuteAll(prev => !prev), []);

	return (
		<PlayStateContext.Provider value={{
			displaySound,
			masterVolume,
			muteAll,
			newDisplaySound,
			clearDisplaySound,
			newMasterVolume,
			toggleMuteAll
		}}>
			{props.children}
		</PlayStateContext.Provider>
	);
}

export default PlayStateContext;
