import React from 'react';

const Keypad = ({ keyId, activate }) => {
	return (
		<button value={keyId} onClick={activate} style={{ width: "500px", "background-color": "red", height: "500px" }}>
			{keyId}
		</button>
	);
};

export default Keypad;
