import React from 'react';

const Keypad = ({
	keyId,
	keyVal,
	activate
}) => {
	return (
		<button id={keyId} value={keyVal} onClick={activate}>
			{keyVal}
		</button>
	);
};

export default Keypad;
