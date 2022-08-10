import React from 'react'

const ControlPanel = ({ displaySound, mVolume, mVolumeHandler }) => {
	return (
		<div>
			<label for="mVolume">Master Volume<input id="mVolume" type="range" min="0" max="1" step="0.05" value={mVolume} onInput={mVolumeHandler} /> <p>{mVolume}</p></label>
			<p>Active sound: {displaySound}</p>
		</div>
	);
};

export default ControlPanel;
