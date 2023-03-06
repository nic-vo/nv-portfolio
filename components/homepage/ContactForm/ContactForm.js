import Script from 'next/script';
import { useState, useRef, useEffect } from 'react';

import { Spinner } from '../../global';
import { FaMinus, FaCheckCircle, FaExclamationCircle, FaArrowRight } from 'react-icons/fa';

import { whiteSpaceRemover } from '../../../lib/client/homepage/ContactForm/ContactForm';

import cLook from './ContactForm.module.scss';
import homeLook from '../Homepage.module.scss';

const ContactForm = () => {
	const [status, setStatus] = useState(null);
	const [message, setMessage] = useState(null);
	const [formState, setFormState] = useState('IDLE');

	const nameRef = useRef();
	const emailRef = useRef();
	const birthdayRef = useRef();

	const submitHandler = async (e) => {
		e.preventDefault();
		setFormState('PENDING');
		setMessage(null);
		const cleanName = whiteSpaceRemover(nameRef.current.value);
		const cleanEmail = whiteSpaceRemover(emailRef.current.value);
		nameRef.current.value = cleanName;
		emailRef.current.value = cleanEmail;
		const grcRep = await window.grecaptcha.execute(process.env.NEXT_PUBLIC_CONTACT_FORM_RECAPTCHA_KEY, { action: 'simple_contact_form_submit' });
		const response = await fetch('/api/cf/cf', {
			method: 'POST',
			headers: { 'Content-type': 'application/json' },
			body: JSON.stringify({
				name: cleanName,
				email: cleanEmail,
				birthday: birthdayRef.current.value,
				threeToken: grcRep
			})
		});
		const { message } = await response.json();
		setStatus(response.status);
		setMessage(message);
		setFormState('DONE');
	};

	const disableToggle = formState === 'PENDING' || (formState === 'DONE' && status === 200);

	return (
		<>
			<Script
				src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_CONTACT_FORM_RECAPTCHA_KEY}`}
				strategy='beforeInteractive' />

			<section className={cLook.container}>
				<h2 className={homeLook.hTwo}>Need something done?</h2>
				<form onSubmit={submitHandler} className={cLook.form}>
					<fieldset disabled={disableToggle} className={cLook.fieldset}>
						<label htmlFor='name' className={cLook.label}>
							<p className={cLook.labelText}>Name:</p>
							<input id='name' ref={nameRef} placeholder='Type here...' type='text' minLength={4} maxLength={100} pattern="^([A-Za-z]|\d| |'|\.|,|-|\(|\)){4,100}$" autoComplete='name' required className={cLook.input} />
						</label>
						<label htmlFor='email' className={cLook.label}>
							<p className={cLook.labelText}>Email:</p>
							<input id='email' ref={emailRef} placeholder='Type here...' type='email' autoComplete='email' required className={cLook.input} />
						</label>
						<label htmlFor='birthday' className={cLook.label} style={{ display: 'none' }}>
							<p className={cLook.labelText}>Birthday:</p>
							<input id='birthday' ref={birthdayRef} type='date' defaultValue='1984-06-21' autoComplete='off' />
						</label>
					</fieldset>
					<div className={cLook.buttons}>
						<p className={cLook.disclaimer}>
							This site is protected by reCAPTCHA and the Google <a href='https://policies.google.com/privacy'>Privacy Policy</a> and <a href='https://policies.google.com/terms'>Terms of Service</a> apply.
						</p>
						<button type='submit' disabled={disableToggle} className={cLook.button}><p>Submit</p><FaArrowRight /></button>
					</div>
				</form>
				<section className={cLook.responseArea}>
					{formState === 'PENDING' && <Spinner><FaMinus style={{ color: 'darkgoldenrod' }} /></Spinner>}
					{formState === 'DONE' ? status === 200 ? <FaCheckCircle style={{ color: 'mediumseagreen' }} /> : <FaExclamationCircle style={{ color: 'firebrick' }} /> : null}
					{message !== null && <p className={cLook.responseMsg}>{message}</p>}
				</section>
			</section>
		</>
	);
};

export default ContactForm;
