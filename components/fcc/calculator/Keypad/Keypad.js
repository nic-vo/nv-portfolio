import React from 'react';

const Keypad = ({ keyId, activate }) => {
	return (
		<button value={keyId} onClick={activate}>
			{keyId}
		</button>
	);
};

export default Keypad;
