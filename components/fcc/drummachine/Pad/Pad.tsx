import {
	useRef,
	useState,
	useEffect,
	useCallback,
	useContext,
	ChangeEvent,
	useMemo
} from 'react';
import { FaVolumeMute, FaVolumeOff, FaStop, FaUndoAlt } from 'react-icons/fa';
import ContentContext from '../ContentContext/ContentContext';
import PlayStateContext from '../PlayStateContext/PlayStateContext';

import machineLook from '../DrumMachine.module.scss';
import padLook from './Pad.module.scss';

const Pad = (props: { char: string }) => {
	const { char } = props;
	const { activeList } = useContext(ContentContext);

	const {
		muteAll,
		masterVolume,
		newDisplaySound,
		clearDisplaySound } = useContext(PlayStateContext);

	const padData = useMemo(() => activeList[char], [activeList]);

	useEffect(() => {
		clearDisplaySound(padData.name);
	}, [padData]);
	/*
		This component receives props to determine which sound to load
		Can play on click or upon receiving keypress event pulse
		activate boolean prop from the parent grid onKeyPress event
	*/
	// if pad is playing sound (for styling)
	const [isPlaying, setIsPlaying] = useState(false);
	// holds volume
	const [padVolume, setPadVolume] = useState(0.5);
	// pad control toggle states
	const [loop, setLoop] = useState(false);
	const [muted, setMuted] = useState(false);

	// ref to access audio events
	const soundRef = useRef<HTMLAudioElement>(null);

	// Update sound volume when either pad volume or master volume change
	useEffect(() => {
		soundRef.current!.volume = padVolume * masterVolume;
	}, [masterVolume, padVolume]);

	useEffect(() => {
		setMuted(muteAll || muted);
		soundRef.current!.muted = muteAll || muted;
	}, [muteAll]);

	// Sound fires whenever div clicked or keydown event in parent grid
	const playSound = useCallback(() => {
		const sound = soundRef.current!
		// Reset sound to time 0 and play
		sound.currentTime = 0;
		sound.play();
	}, []);

	const onPlayHandler = useCallback(() => {
		// Update parent display state
		newDisplaySound(padData.name);
		// Set playing to true for styling
		setIsPlaying(true);
	}, [padData]);

	const onEndedHandler = useCallback(() => {
		clearDisplaySound(padData.name);
		setIsPlaying(false);
	}, [padData]);

	const volumeOnInputHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
		setPadVolume(parseFloat(e.target.value));
	}, []);

	const muteOnClick = useCallback(() => {
		// Mute button changes state and set soundRef to state
		// Only if global mute is false; true = forced mute
		if (muteAll === false) {
			setMuted(!muted);
			soundRef.current!.muted = !muted;
		}
	}, [muteAll, muted]);

	const stopOnClick = useCallback(() => {
		// Stops sound
		const sound = soundRef.current!
		sound.pause();
		sound.currentTime = 0;
		setIsPlaying(false);
	}, []);

	const loopOnClick = useCallback(() => {
		// Loop button changes state sets soundRef to state
		setLoop(!loop);
		soundRef.current!.loop = !loop;
	}, [loop]);

	const padClasser = useMemo(
		() => `${padLook.pad} ${isPlaying === true ?
			padLook.padActive : padLook.padInactive}`,
		[isPlaying]);
	const muteClasser = useMemo(
		() => `${machineLook.button} ${muted ?
			machineLook.muteon : machineLook.mute}`,
		[muted]);
	const loopClasser = useMemo(
		() => `${machineLook.button} ${loop ?
			machineLook.loopon : machineLook.loop}`,
		[loop]);

	return useMemo(() => {
		console.log('render PAD', char.toUpperCase());
		return (
			<div className={padLook.container}>
				<button
					className={padClasser}
					style={{ animationDuration: `${Math.random() * 1000 + 300}ms` }}
					onClick={playSound} >
					{char.toUpperCase()}
				</button>
				<input
					type="range"
					min="0"
					max="1"
					step="0.05"
					value={padVolume}
					onInput={volumeOnInputHandler} />
				<div className={padLook.buttons}>
					<button
						onClick={muteOnClick}
						className={muteClasser}>
						{muted ? <FaVolumeMute /> : <FaVolumeOff />}
					</button>
					<button
						onClick={stopOnClick}
						className={`${machineLook.button} ${machineLook.stop}`}>
						<FaStop />
					</button>
					<button
						onClick={loopOnClick}
						className={loopClasser}>
						<FaUndoAlt />
					</button>
				</div>
				<audio
					src={padData.path}
					id={char}
					ref={soundRef}
					onLoadStart={onEndedHandler}
					onPlay={onPlayHandler}
					onPause={onEndedHandler}
					onEnded={onEndedHandler} />
			</div>
		)
	}, [isPlaying, loop, muted, muteAll, padData, padVolume, masterVolume]);
}

export default Pad;
