import { useState, useEffect, useCallback } from 'react';

import { parse as mParse } from 'marked';
import { sanitize } from 'dompurify';

import defaultStateString from './mdDefaultState';
import { FaArrowsAltH, FaFileDownload } from 'react-icons/fa';
import markLook from './Markdown.module.scss';

const Markdown = () => {
	const [allowLiveUpdates, setAllowLiveUpdates] = useState(true);
	const [input, setInput] = useState(defaultStateString);
	const [output, setOutput] = useState(null);
	const [toggleEditor, setToggleEditor] = useState(false);
	const [togglePreview, setTogglePreview] = useState(false);
	const [dlurl, setDlurl] = useState(null);

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

	const updatePreviewHandler = useCallback(() => { markedToOutput(); }, [allowLiveUpdates]);

	const generateBlobAndURL = (e) => {
		if (input === '') { return };
		const blob = new Blob([input], { type: 'text/markdown' });
		const url = URL.createObjectURL(blob);
		setDlurl(url);
	};

	const resetToDemoHandler = () => {
		setInput(defaultStateString);
	};

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
					<button onClick={resetToDemoHandler} className={markLook.button}>Reset to demo</button>
					<button onClick={allowUpdatesOnClick} className={markLook.button + activeUpdateButtonClasser}>Live updates:{allowLiveUpdates ? ' ALLOWED' : ' BLOCKED'} </button>
					<button onClick={updatePreviewHandler} className={markLook.button}>Update</button>
					<h2>
						editor
					</h2>
					<button className={markLook.paneToggler} onClick={editorToggle}><FaArrowsAltH /></button>
				</div>
				<textarea className={markLook.textarea} disabled={togglePreview} value={input} onChange={textareaOnChange} />
			</div>
			<div className={`${markLook.preview} ${markLook.pane} ${togglePreview === true ? markLook.toggled : toggleEditor === true ? markLook.hidden : markLook.both}`}>
				<div className={markLook.header}>
					<button className={markLook.paneToggler} onClick={previewToggle}><FaArrowsAltH /></button>
					<h2>
						preview
					</h2>
					<button onClick={updatePreviewHandler} className={markLook.button}>Update</button>
					<button onClick={generateBlobAndURL} className={markLook.button}>Generate new link for file</button>
					{
						dlurl && <a href={dlurl} download={`md_parser_${Date.now()}.md`} className={markLook.dlLink}><FaFileDownload />Download</a>
					}
				</div>
				<div className={markLook.output} dangerouslySetInnerHTML={{ __html: output }} />

			</div>
		</section>
	);
};

export default Markdown;
