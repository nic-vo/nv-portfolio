import { useState, useEffect, useCallback } from 'react';

import { parse as mParse } from 'marked';
import { sanitize } from 'dompurify';

import { FaArrowsAltH } from 'react-icons/fa';
import markLook from './Markdown.module.scss';

const Markdown = () => {
	const [allowLiveUpdates, setAllowLiveUpdates] = useState(false);
	const [input, setInput] = useState('');
	const [output, setOutput] = useState(null);
	const [toggleEditor, setToggleEditor] = useState(false);
	const [togglePreview, setTogglePreview] = useState(false);

	const editorToggle = useCallback((e) => {
		e.preventDefault();
		setToggleEditor(prev => { return !prev });
	}, [toggleEditor]);

	const previewToggle = useCallback((e) => {
		e.preventDefault();
		setTogglePreview(prev => { return !prev });
	}, [togglePreview]);

	const allowUpdatesOnClick = useCallback((e) => {
		e.preventDefault();
		setAllowLiveUpdates(prev => { return !prev });
	}, [allowLiveUpdates]);

	const textareaOnChange = useCallback((e) => {
		setInput(e.target.value);
	}, [input]);

	const googleLinkProcessor = (string) => {
		return string.replaceAll(/file\/d\//g, 'uc?id=').replaceAll(/\/view\?usp\=share_link/g, '').replaceAll(/\/view\?usp\=sharing/g, '');
	};

	const markedHandler = () => {
		const dirty = mParse(googleLinkProcessor(input));
		setOutput(sanitize(dirty, { USE_PROFILES: { html: true } }));
	};

	const updatePreview = useCallback((e) => {
		e.preventDefault();
		markedHandler();
	}, [input]);

	useEffect(() => {
		if (allowLiveUpdates === true) {
			markedHandler();
		};
	}, [allowLiveUpdates, input])

	return (
		<section className={markLook.container}>
			<code className={markLook.why}>Why are you doing this on mobile?</code>
			<div className={`${markLook.editor} ${markLook.pane} ${toggleEditor === true ? markLook.toggled : togglePreview === true ? markLook.hidden : markLook.both}`}>
				<div className={markLook.header}>
					<button onClick={allowUpdatesOnClick}>{allowLiveUpdates ? 'Block' : 'Allow'} live updates</button>
					<button onClick={updatePreview}>Update</button>
					<h2>
						editor
					</h2>
					<button className={markLook.paneToggler} onClick={editorToggle}><FaArrowsAltH /></button>
				</div>
				<textarea className={markLook.textarea} disabled={togglePreview} onChange={textareaOnChange} />
			</div>
			<div className={`${markLook.preview} ${markLook.pane} ${togglePreview === true ? markLook.toggled : toggleEditor === true ? markLook.hidden : markLook.both}`}>
				<div className={markLook.header}>
					<button className={markLook.paneToggler} onClick={previewToggle}><FaArrowsAltH /></button>
					<h2>
						preview
					</h2>
					<button onClick={updatePreview}>Update</button>
				</div>
				<div className={markLook.output} dangerouslySetInnerHTML={{ __html: output }} />
			</div>
		</section>
	);
};

export default Markdown;
