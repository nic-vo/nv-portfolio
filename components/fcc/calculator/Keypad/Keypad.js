import React from 'react';

const Keypad = ({ keyId, activate }) => {
	return (
		<div id={keyId} onClick={activate} style={{width: "500px", "background-color": "red"}}>
			<p>{keyId}</p>
		</div>
	);
};

export default Keypad;
