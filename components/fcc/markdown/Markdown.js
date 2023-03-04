import { useState, useEffect, useCallback } from 'react';

import { parse as mParse } from 'marked';
import { sanitize } from 'dompurify';

import defaultStateString from './mdDefaultState';
import { FaArrowsAltH, FaFileDownload, FaPlus } from 'react-icons/fa';
import markLook from './Markdown.module.scss';

const Markdown = () => {
	const [allowLiveUpdates, setAllowLiveUpdates] = useState(true);
	const [input, setInput] = useState(defaultStateString);
	const [output, setOutput] = useState(null);
	const [toggleEditor, setToggleEditor] = useState(false);
	const [togglePreview, setTogglePreview] = useState(false);

	const [toggleDlList, setToggleDlList] = useState(false);
	const [dlUrls, setDlUrls] = useState([]);

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

	const textareaOnChange = (e) => {
		setInput(e.target.value);
	};

	const preprocessing = (string) => {
		let newString;
		newString = string.replaceAll(/file\/d\//g, 'uc?id=').replaceAll(/\/view\?usp\=share_link/g, '').replaceAll(/\/view\?usp\=sharing/g, '');
		return newString;
	};

	const markedToOutput = () => {
		const dirty = mParse(preprocessing(input));
		setOutput(sanitize(dirty, { USE_PROFILES: { html: true } }));
	};

	const updatePreviewHandler = useCallback(() => { markedToOutput(); }, [allowLiveUpdates]);


	const generateBlobAndURL = (e) => {
		e.preventDefault();
		const filename = document.getElementById('filename').value;
		const jsonCheck = document.getElementById('json');
		if (filename === '' || filename === undefined) { return; };

		let mimetype, extension, dataOutput;
		if (jsonCheck.checked === true) {
			mimetype = 'text/plain';
			extension = 'json';
			dataOutput = JSON.stringify({ text: input });
		} else {
			mimetype = 'text/markdown';
			extension = 'md';
			dataOutput = input;
		};
		const blob = new Blob([dataOutput], { type: mimetype });
		const url = URL.createObjectURL(blob);
		const newFile = { filename, extension, url, rawInput: input };
		setDlUrls((prev) => {
			return [...prev, newFile];
		});
	};

	const clearDlUrlList = useCallback(() => {
		dlUrls.forEach((file) => {
			URL.revokeObjectURL(file.url)
		});
		setDlUrls([]);
	}, [dlUrls]);

	const removeDlUrlFromList = useCallback((qIndex) => {
		URL.revokeObjectURL(dlUrls[qIndex].url);
		const filtered = dlUrls.filter((blob) => { return dlUrls.indexOf(blob) !== qIndex });
		setDlUrls(filtered);
	}, [dlUrls])

	const setEditorToPreviousInput = useCallback((rawInput) => {
		setInput(rawInput);
	}, [input]);

	const resetToDemoHandler = useCallback(() => {
		setInput(defaultStateString);
	}, [input]);

	useEffect(() => {
		if (allowLiveUpdates === true) {
			markedToOutput();
		};
	}, [allowLiveUpdates, input]);

	const activeUpdateButtonClasser = allowLiveUpdates === true ? ` ${markLook.upActive}` : '';
	const editorClasser = `${markLook.editor} ${markLook.pane} ${toggleEditor === true ? markLook.toggled : togglePreview === true ? markLook.hidden : markLook.bothPanes}`;
	const previewClasser = `${markLook.preview} ${markLook.pane} ${togglePreview === true ? markLook.toggled : toggleEditor === true ? markLook.hidden : markLook.bothPanes}`;
	const textAreaClasser = markLook.paneChild + ' ' + markLook.textarea;
	const outputClasser = markLook.paneChild + ' ' + markLook.output;

	return (
		<section className={markLook.container}>
			<div className={editorClasser}>
				<div className={markLook.header}>
					<button onClick={resetToDemoHandler} className={markLook.button}>Reset to demo</button>
					<button onClick={allowUpdatesOnClick} className={markLook.button + activeUpdateButtonClasser}>Live updates:{allowLiveUpdates ? ' ALLOWED' : ' BLOCKED'} </button>
					{allowLiveUpdates && <button onClick={updatePreviewHandler} className={markLook.button}>Update</button>}
					<p className={markLook.heading}>
						editor
					</p>
					<button className={markLook.button + ' ' + markLook.paneToggler} onClick={editorToggle}><FaArrowsAltH /></button>
				</div>
				<textarea className={textAreaClasser} disabled={togglePreview} value={input} onChange={textareaOnChange} />
			</div>
			<div className={previewClasser}>
				<div className={markLook.header}>
					<button className={markLook.button + ' ' + markLook.paneToggler} onClick={previewToggle}><FaArrowsAltH /></button>
					<p className={markLook.heading}>
						preview
					</p>
					{allowLiveUpdates && <button onClick={updatePreviewHandler} className={markLook.button}>Update</button>}
					<button onClick={() => { setToggleDlList(true) }} className={markLook.button}>LINK GENERATOR</button>
					{
						toggleDlList &&

						<div className={markLook.dlContainer}>
							<button onClick={() => { setToggleDlList(false) }} className={markLook.closer}><FaPlus /></button>
							<form id='urlgen' className={markLook.dlControls} onSubmit={generateBlobAndURL}>
								<label htmlFor='filename'>
									<span>Filename:</span>
									<input type='text' id='filename' name='filename' required={true} />
								</label>
								<label htmlFor='json'>
									<span>JSON?</span>
									<input type='checkbox' id='json' name='dltype' value='JSON' />
								</label>
								<button type='submit' className={markLook.button}>Generate new URL</button>
							</form>
							<div className={markLook.dlListContainer}>
								<ul className={markLook.list}>
									{dlUrls.length > 0 &&

										dlUrls.map((obj, index) => {
											const { filename, extension, url, rawInput } = obj;
											return (
												<li key={`md_dl_${url}`}>
													<button onClick={() => { removeDlUrlFromList(index) }} className={markLook.button + ' ' + markLook.dlRemover}><FaPlus /></button>
													<button onClick={() => { setEditorToPreviousInput(rawInput) }} className={markLook.button}>Edit raw</button>
													<p>{`${filename}.${extension}`}</p>
													<a href={url} download={`md_parser_${filename}.${extension}`} className={markLook.dlLink}><FaFileDownload />Download</a>
												</li>)
										})
									}
								</ul>
								<button onClick={clearDlUrlList} className={markLook.button}>Clear list</button>
							</div>
						</div>
					}
				</div>
				<div className={outputClasser} dangerouslySetInnerHTML={{ __html: output }} />
			</div>
		</section>
	);
};

export default Markdown;
