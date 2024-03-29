import { useState, useRef, ElementRef } from 'react';
import Script from 'next/script';
import { Spinner } from '../../global';
import { FaMinus, FaCheckCircle, FaExclamationCircle, FaArrowRight } from 'react-icons/fa';
import { whiteSpaceRemover } from '../../../lib/client/homepage/ContactForm/ContactForm';

import cLook from './ContactForm.module.scss';
import homeLook from '../Homepage.module.scss';

const ContactForm = () => {
	const [status, setStatus] = useState<number | null>(null);
	const [message, setMessage] = useState<string | null>(null);
	const [formState, setFormState] = useState('IDLE');

	const nameRef = useRef<ElementRef<'input'>>(null);
	const emailRef = useRef<ElementRef<'input'>>(null);
	const birthdayRef = useRef<ElementRef<'input'>>(null);

	const submitHandler = async (e: React.FormEvent) => {
		e.preventDefault();
		if (
			!nameRef.current
			|| !emailRef.current
			|| !birthdayRef.current
		) {
			setStatus(400);
			setMessage('Error with your input somehow')
			return null;
		}
		setFormState('PENDING');
		setStatus(null);
		setMessage(null);
		const cleanName = whiteSpaceRemover(nameRef.current.value);
		const cleanEmail = whiteSpaceRemover(emailRef.current.value);
		nameRef.current.value = cleanName;
		emailRef.current.value = cleanEmail;
		let statusNumber = 500;
		let statusMessage = 'Unknown error';
		try {
			let grcRep: string;
			try {
				grcRep = await window.grecaptcha.execute(
					process.env.NEXT_PUBLIC_CONTACT_FORM_RECAPTCHA_KEY,
					{ action: 'simple_contact_form_submit' }) as string;
			} catch {
				statusMessage = 'There was an error with ReCAPTCHA. Try again or refresh';
				throw new Error();
			}
			try {
				const response = await fetch('/api/cf', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						name: cleanName,
						email: cleanEmail,
						birthday: birthdayRef.current.value,
						threeToken: grcRep
					})
				});
				const inc = await response.json() as { message: string };
				statusMessage = inc.message;
				statusNumber = response.status;
			} catch {
				statusMessage = 'There was an error reaching the server; try again'
			}
		} catch { }
		setStatus(statusNumber);
		setMessage(statusMessage);
		setFormState('DONE');
	};

	const disableToggle = formState === 'PENDING' || (formState === 'DONE' && status === 200);
	const responseIcon = status === 200 ? <FaCheckCircle style={{ color: 'mediumseagreen' }} /> :
		<FaExclamationCircle style={{ color: 'firebrick' }} />;
	const reKey = process.env.NEXT_PUBLIC_CONTACT_FORM_RECAPTCHA_KEY;

	return (
		<>
			<Script src={`https://www.google.com/recaptcha/api.js?render=${reKey}`} />

			<section className={cLook.container}>
				<h2 className={homeLook.hTwo}>Need something done?</h2>
				<form onSubmit={submitHandler} className={cLook.form}>
					<fieldset disabled={disableToggle} className={cLook.fieldset}>
						<label
							htmlFor='name'
							className={cLook.label}>
							Name:
							<input
								id='name'
								ref={nameRef}
								placeholder='Type here...'
								type='text'
								minLength={4}
								maxLength={100}
								pattern="^([A-Za-z]|\d| |'|\.|,|-|\(|\)){4,100}$"
								autoComplete='name'
								required
								className={cLook.input} />
						</label>
						<label
							htmlFor='email'
							className={cLook.label}>
							Email:
							<input
								id='email'
								ref={emailRef}
								placeholder='Type here...'
								type='email'
								autoComplete='email'
								required
								className={cLook.input} />
						</label>
						<label
							htmlFor='birthday'
							className={cLook.label}
							style={{ display: 'none' }}>
							Birthday:
							<input
								id='birthday'
								ref={birthdayRef}
								type='date'
								defaultValue='1984-06-21'
								autoComplete='off' />
						</label>
					</fieldset>
					<div className={cLook.buttons}>
						<p className={cLook.disclaimer}>
							This site is protected by reCAPTCHA and the Google
							<a href='https://policies.google.com/privacy'>Privacy Policy</a>
							and
							<a href='https://policies.google.com/terms'>Terms of Service</a>
							apply.
						</p>
						<button
							type='submit'
							disabled={disableToggle}
							className={cLook.button}>Submit<FaArrowRight /></button>
					</div>
				</form>
				<div className={cLook.responseArea}>
					{
						formState === 'PENDING' &&
						<Spinner><FaMinus style={{ color: 'darkgoldenrod' }} /></Spinner>
					}
					{
						formState === 'DONE' &&
						responseIcon
					}
					{
						message !== null &&
						<p className={cLook.responseMsg}>{message}</p>
					}
				</div>
			</section>
		</>
	);
};

export default ContactForm;
