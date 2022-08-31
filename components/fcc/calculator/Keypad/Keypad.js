import React from 'react';

import keyStyles from './Keypad.module.css';

const Keypad = ({
	keyId,
	keyVal,
	content,
	handler
}) => {

	return (
		<button className={`${keyStyles.keypad}${keyId === "clear" ? ` ${keyStyles.clear}` : ""}`} id={keyId} value={keyVal} onClick={handler} style={{ "gridArea": keyId }}>
			{content}
		</button>
	);
};

export default Keypad;
