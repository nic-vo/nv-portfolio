import { useRef, useState, useEffect, useCallback } from 'react';
import { FaVolumeMute, FaVolumeOff, FaStop, FaUndoAlt } from 'react-icons/fa';

import machineStyles from '../DrumMachine.module.css';
import padStyles from './Pad.module.css';



const Pad = ({
	char,
	name,
	path,
	mVolume,
	setDisplaySound,
	clearDisplaySound,
	muteAll
}) => {

	/*
		This component receives props to determine which sound to load
		Can play on click or upon receiving keypress event pulse activate boolean prop from the parent grid onKeyPress event
	*/

	// if pad is playing sound (for styling)
	const [isPlaying, setIsPlaying] = useState(false);
	// holds volume
	const [pVolume, setPVolume] = useState(0.5);
	// pad control toggle states
	const [loop, setLoop] = useState(false);
	const [muted, setMuted] = useState(false);

	// ref to access audio events
	const soundRef = useRef();

	// Sound fires whenever div clicked or keydown event in parent grid
	const playSound = useCallback(() => {
		// Reset sound to time 0 and play
		soundRef.current.currentTime = 0;
		soundRef.current.play();
	}, [])

	const onPlayHandler = () => {
		// Update parent display state
		setDisplaySound(name);
		// Set playing to true for styling
		setIsPlaying(true);
	};

	const onEndedHandler = () => {
		clearDisplaySound(name);
		setIsPlaying(false);
	};

	const volumeOnInputHandler = useCallback((e) => {
		setPVolume(parseFloat(e.target.value));
	}, [pVolume]);

	const muteOnClick = useCallback(() => {
		// Mute button changes state and set soundRef to state
		// Only if global mute is false; true = forced mute
		if (muteAll === false) {
			setMuted(!muted);
			soundRef.current.muted = !muted;
		}
	}, [muted]);

	const stopOnClick = useCallback(() => {
		// Stops sound
		soundRef.current.pause();
		soundRef.current.currentTime = 0;
	}, []);

	const loopOnClick = useCallback(() => {
		// Loop button changes state sets soundRef to state
		setLoop(!loop);
		soundRef.current.loop = !loop;
	}, [loop]);

	// Update sound volume when either pad volume or master volume change
	useEffect(() => {
		soundRef.current.volume = pVolume * mVolume;
	}, [mVolume, pVolume]);

	useEffect(() => {
		setMuted(muteAll);
		soundRef.current.muted = muteAll;
	}, [muteAll]);

	return (
		<div className={padStyles.container}>
			<div className={`${padStyles.pad} ${isPlaying === true ? padStyles.padActive : padStyles.padInactive}`} onClick={playSound} >
				<p>{char.toUpperCase()}</p>
			</div>
			<input type="range" min="0" max="1" step="0.05" value={pVolume} onInput={volumeOnInputHandler} />
			<div className={padStyles.buttons}>
				<button onClick={muteOnClick} className={`${machineStyles.button} ${muted ? machineStyles.muteon : machineStyles.mute}`}>{muted ? <FaVolumeMute /> : <FaVolumeOff />}</button>
				<button onClick={stopOnClick} className={`${machineStyles.button} ${machineStyles.stop}`}><FaStop /></button>
				<button onClick={loopOnClick} className={`${machineStyles.button} ${loop ? machineStyles.loopon : machineStyles.loop}`}><FaUndoAlt /></button>
			</div>
			<audio src={path} id={char} ref={soundRef} onPlay={onPlayHandler} onPause={onEndedHandler} onEnded={onEndedHandler} />
		</div>
	);
};

export default Pad;
