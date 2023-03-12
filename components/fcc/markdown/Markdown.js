import { useState, useEffect, useCallback } from 'react';

import { FaArrowsAltH, FaFileDownload, FaPlus } from 'react-icons/fa';

import { parse as mParse } from 'marked';
import { sanitize } from 'dompurify';

import defaultStateString from './mdDefaultState';
import preprocessing from '../../../lib/client/fcc/Markdown';

import markLook from './Markdown.module.scss';

const Markdown = () => {
	// Basic state for input output and various view toggles
	const [input, setInput] = useState(defaultStateString);
	const [output, setOutput] = useState(null);
	const [allowLiveUpdates, setAllowLiveUpdates] = useState(true);
	const [toggleEditor, setToggleEditor] = useState(false);
	const [togglePreview, setTogglePreview] = useState(false);
	// Toggle for download list and state to keep dl links
	const [toggleDlList, setToggleDlList] = useState(false);
	const [dlUrls, setDlUrls] = useState([]);

	const editorToggle = () => {
		setToggleEditor((prev) => { return !prev });
	};

	const previewToggle = () => {
		setTogglePreview((prev) => { return !prev });
	};

	const allowUpdatesOnClick = () => {
		setAllowLiveUpdates((prev) => { return !prev });
	};

	const textareaOnChange = (e) => {
		setInput(e.target.value);
	};

	const markedToOutput = () => {
		const dirty = mParse(preprocessing(input));
		setOutput(sanitize(dirty, { USE_PROFILES: { html: true } }));
	};

	const updatePreviewHandler = () => { markedToOutput() };

	// Generate url and blob to download based on dlwindow checker
	const generateBlobAndURL = () => {
		// Return if no filename
		const filename = document.getElementById('filename').value;
		if (filename === '' || filename === undefined) { return };
		const jsonCheck = document.getElementById('json');

		// Set these based on if checked
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

	// Clear dl link list by iterating through and calling revoke, then clear state
	const clearDlUrlList = useCallback(() => {
		dlUrls.forEach((file) => {
			URL.revokeObjectURL(file.url)
		});
		setDlUrls([]);
	}, [dlUrls]);

	// Remove specific url from list
	const removeDlUrlFromList = useCallback((qIndex) => {
		URL.revokeObjectURL(dlUrls[qIndex].url);
		const filtered = dlUrls.filter(
			(blob) => { return dlUrls.indexOf(blob) !== qIndex }
		);
		setDlUrls(filtered);
	}, [dlUrls]);

	const setEditorToPreviousInput = (rawInput) => {
		setInput(rawInput);
	};

	const resetToDemoHandler = () => {
		setInput(defaultStateString);
	};

	useEffect(() => {
		if (allowLiveUpdates === true) {
			markedToOutput();
		};
	}, [allowLiveUpdates]);

	const activeUpdateButtonClasser = allowLiveUpdates === true ? ` ${markLook.upActive}` : '';
	const editorClasser = `${markLook.editor} ${markLook.pane} ${toggleEditor === true ? markLook.toggled : togglePreview === true ? markLook.hidden : markLook.bothPanes}`;
	const previewClasser = `${markLook.preview} ${markLook.pane} ${togglePreview === true ? markLook.toggled : toggleEditor === true ? markLook.hidden : markLook.bothPanes}`;
	const textAreaClasser = markLook.paneChild + ' ' + markLook.textarea;
	const outputClasser = markLook.paneChild + ' ' + markLook.output;

	return (
		<section className={markLook.container}>
			<div className={editorClasser}>
				<div className={markLook.header}>
					<button
						onClick={resetToDemoHandler}
						className={markLook.button}>
						Reset to demo
					</button>
					<button
						onClick={allowUpdatesOnClick}
						className={markLook.button + activeUpdateButtonClasser}>
						Live updates:{allowLiveUpdates ? ' ALLOWED' : ' BLOCKED'}
					</button>
					{
						allowLiveUpdates === false &&
						<button
							onClick={updatePreviewHandler}
							className={markLook.button}>Update</button>
					}
					<p className={markLook.heading}>
						editor
					</p>
					<button
						className={markLook.button + ' ' + markLook.paneToggler}
						onClick={editorToggle}>
						<FaArrowsAltH />
					</button>
				</div>
				<textarea
					className={textAreaClasser}
					disabled={togglePreview}
					value={input}
					onChange={textareaOnChange} />
			</div>
			<div className={previewClasser}>
				<div className={markLook.header}>
					<button
						className={markLook.button + ' ' + markLook.paneToggler}
						onClick={previewToggle}>
						<FaArrowsAltH />
					</button>
					<p className={markLook.heading}>
						preview
					</p>
					{
						allowLiveUpdates &&
						<button
							onClick={updatePreviewHandler}
							className={markLook.button}>
							Update
						</button>
					}
					<button
						onClick={() => { setToggleDlList(true) }}
						className={markLook.button}>
						LINK GENERATOR
					</button>
					{
						toggleDlList &&

						<div className={markLook.dlContainer}>
							<button
								onClick={() => { setToggleDlList(false) }}
								className={markLook.closer}>
								<FaPlus />
							</button>
							<form
								id='urlgen'
								className={markLook.dlControls}
								onSubmit={generateBlobAndURL}>
								<label htmlFor='filename'>
									<span>Filename:</span>
									<input
										type='text'
										id='filename'
										name='filename'
										required={true} />
								</label>
								<label htmlFor='json'>
									<span>JSON?</span>
									<input
										type='checkbox'
										id='json'
										name='dltype'
										value='JSON' />
								</label>
								<button
									type='submit'
									className={markLook.button}>
									Generate new URL
								</button>
							</form>
							<div className={markLook.dlListContainer}>
								<ul className={markLook.list}>
									{dlUrls.length > 0 &&

										dlUrls.map((obj, index) => {
											const { filename, extension, url, rawInput } = obj;
											return (
												<li key={`md_dl_${url}`}>
													<button
														onClick={() => { removeDlUrlFromList(index) }}
														className={markLook.button + ' ' + markLook.dlRemover}>
														<FaPlus />
													</button>
													<button
														onClick={() => { setEditorToPreviousInput(rawInput) }}
														className={markLook.button}>
														Edit raw
													</button>
													<p>{`${filename}.${extension}`}</p>
													<a
														href={url}
														download={`md_parser_${filename}.${extension}`}
														className={markLook.dlLink}>
														<FaFileDownload />
														Download
													</a>
												</li>);
										})
									}
								</ul>
								<button
									onClick={clearDlUrlList}
									className={markLook.button}>
									Clear list
								</button>
							</div>
						</div>
					}
				</div>
				<div
					className={outputClasser}
					dangerouslySetInnerHTML={{ __html: output }} />
			</div>
		</section>
	);
};

export default Markdown;
