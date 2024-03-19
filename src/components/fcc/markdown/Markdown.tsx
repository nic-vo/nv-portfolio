import { useState, useEffect, useCallback, ChangeEvent, FormEvent } from 'react';

import { FaArrowsAltH, FaFileDownload, FaPlus } from 'react-icons/fa';

import { parse as mParse } from 'marked';
import { sanitize } from 'isomorphic-dompurify';

import defaultStateString from './mdDefaultState';
import preprocessing from '../../../lib/client/fcc/Markdown';

import style from './Markdown.module.scss';

const Markdown = () => {
	// Basic state for input output and various view toggles
	const [input, setInput] = useState(defaultStateString);
	const [output, setOutput] = useState<string>('');
	const [allowLiveUpdates, setAllowLiveUpdates] = useState(true);
	const [toggleEditor, setToggleEditor] = useState(false);
	const [togglePreview, setTogglePreview] = useState(false);
	// Toggle for download list and state to keep dl links
	const [toggleDlList, setToggleDlList] = useState(false);
	const [dlUrls, setDlUrls] = useState<
		{
			filename: string,
			extension: 'md' | 'json',
			url: string,
			rawInput: string
		}[]
	>([]);

	const editorToggle = () => setToggleEditor(prev => !prev);

	const previewToggle = () => setTogglePreview(prev => !prev);

	const allowUpdatesOnClick = () => setAllowLiveUpdates(prev => !prev);

	const textareaOnChange = (e: ChangeEvent<HTMLTextAreaElement>) =>
		setInput(e.target.value);

	const markedToOutput = () => {
		const dirty = mParse(preprocessing(input));
		setOutput(sanitize(dirty, { USE_PROFILES: { html: true } }));
	};

	const updatePreviewHandler = () => markedToOutput();

	// Generate url and blob to download based on dlwindow checker
	const generateBlobAndURL = (e: FormEvent) => {
		e.preventDefault();
		// Return if no filename
		const fninput = document.getElementById('filename') as HTMLInputElement;
		const filename = fninput.value;
		if (filename === '' || filename === undefined || filename === null) return;
		const jsonCheck = document.getElementById('json') as HTMLInputElement;

		// Set these based on if checked
		let mimetype, extension: 'json' | 'md', dataOutput;
		if (jsonCheck.checked === true) {
			mimetype = 'text/plain';
			extension = 'json';
			dataOutput = JSON.stringify({ text: input });
		} else {
			mimetype = 'text/markdown';
			extension = 'md';
			dataOutput = input;
		}
		const blob = new Blob([dataOutput], { type: mimetype });
		const url = URL.createObjectURL(blob);
		const newFile = { filename, extension, url, rawInput: input };
		if (dlUrls.length === 0) setDlUrls([newFile]);
		else setDlUrls(prev => [...prev, newFile]);
	};

	// Clear dl link list by iterating through and calling revoke, then clear state
	const clearDlUrlList = useCallback(() => {
		dlUrls.forEach((file) => {
			URL.revokeObjectURL(file.url)
		});
		setDlUrls([]);
	}, [dlUrls]);

	// Remove specific url from list
	const removeDlUrlFromList = useCallback((qIndex: number) => {
		URL.revokeObjectURL(dlUrls[qIndex].url);
		const filtered = dlUrls.filter(
			(blob) => { return dlUrls.indexOf(blob) !== qIndex }
		);
		setDlUrls(filtered);
	}, [dlUrls]);

	const setEditorToPreviousInput = (rawInput: string) => {
		setInput(rawInput);
	};

	const resetToDemoHandler = () => {
		setInput(defaultStateString);
	};

	useEffect(() => {
		if (allowLiveUpdates === true) {
			markedToOutput();
		};
	}, [allowLiveUpdates, input]);

	const activeUpdateButtonClasser = allowLiveUpdates === true ?
		` ${style.upActive}`
		: '';
	const editorClasser = `${style.editor} ${style.pane} ${toggleEditor === true ?
		style.toggled : togglePreview === true ?
			style.hidden : style.bothPanes}`;
	const previewClasser = `${style.preview} ${style.pane} ${togglePreview === true ?
		style.toggled : toggleEditor === true ?
			style.hidden : style.bothPanes}`;
	const textAreaClasser = style.paneChild + ' ' + style.textarea;
	const outputClasser = style.paneChild + ' ' + style.output;

	return (
		<section className={style.container}>
			<div className={style.editDialogue}>
				<div className={editorClasser}>
					<div className={style.header}>
						<button
							onClick={resetToDemoHandler}
							className={style.button}>
							Reset to demo
						</button>
						<button
							onClick={allowUpdatesOnClick}
							className={style.button + activeUpdateButtonClasser}>
							Live updates:{allowLiveUpdates ? ' ALLOWED' : ' BLOCKED'}
						</button>
						{
							allowLiveUpdates === false &&
							<button
								onClick={updatePreviewHandler}
								className={style.button}>Update</button>
						}
						<p className={style.heading}>
							editor
						</p>
						<button
							className={style.button + ' ' + style.paneToggler}
							onClick={editorToggle}>
							<FaArrowsAltH />
						</button>
					</div>
					<div className={style.contentContainer}>
						<textarea
							className={textAreaClasser}
							disabled={togglePreview}
							value={input}
							onChange={textareaOnChange} />
					</div>
				</div>
				<div className={previewClasser}>
					<div className={style.header}>
						<button
							className={style.button + ' ' + style.paneToggler}
							onClick={previewToggle}>
							<FaArrowsAltH />
						</button>
						<p className={style.heading}>
							preview
						</p>
						{
							allowLiveUpdates === false &&
							<button
								onClick={updatePreviewHandler}
								className={style.button}>
								Update
							</button>
						}
						<button
							onClick={() => { setToggleDlList(true) }}
							className={style.button}>
							LINK GENERATOR
						</button>
					</div>
					<div className={style.contentContainer}>
						<div
							className={outputClasser}
							dangerouslySetInnerHTML={{ __html: output }} />
					</div>
				</div>
			</div>

			{
				toggleDlList &&

				<div className={style.dlContainer}>
					<button
						onClick={() => { setToggleDlList(false) }}
						className={style.closer}>
						<FaPlus />
					</button>
					<form
						id='urlgen'
						className={style.dlControls}
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
							className={style.button}>
							Generate new URL
						</button>
					</form>
					<div className={style.dlListContainer}>
						<ul className={style.list}>
							{dlUrls.length > 0 &&

								dlUrls.map((obj, index) => {
									const { filename, extension, url, rawInput } = obj;
									return (
										<li key={`md_dl_${url}`}>
											<button
												onClick={() => { removeDlUrlFromList(index) }}
												className={style.button + ' ' + style.dlRemover}>
												<FaPlus />
											</button>
											<button
												onClick={() => { setEditorToPreviousInput(rawInput) }}
												className={style.button}>
												Edit raw
											</button>
											<p>{`${filename}.${extension}`}</p>
											<a
												href={url}
												download={`md_parser_${filename}.${extension}`}
												className={style.dlLink}>
												<FaFileDownload />
												Download
											</a>
										</li>);
								})
							}
						</ul>
						<button
							onClick={clearDlUrlList}
							className={style.button}>
							Clear list
						</button>
					</div>
				</div>
			}
		</section>
	);
};

export default Markdown;
