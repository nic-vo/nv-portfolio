import React from 'react';

const Keypad = ({
	keyId,
	keyVal,
	content,
	handler
}) => {

	return (
		<button id={keyId} value={keyVal} onClick={handler} style={{"gridArea": keyId}}>
			{content}
		</button>
	);
};

export default Keypad;
