import React from 'react';

import calcStyles from './Keypad.module.css';

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
