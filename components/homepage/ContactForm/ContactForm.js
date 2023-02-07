import Head from 'next/head';
import Script from 'next/script';
import { useState, useRef, useEffect } from 'react';

import { Spinner } from '../../global';
import { FaMinus, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';

import { whiteSpaceRemover } from '../../../lib/client/homepage/ContactForm/ContactForm';

const ContactForm = () => {
	const [status, setStatus] = useState(null);
	const [message, setMessage] = useState(null);
	const [formState, setFormState] = useState('Idle');

	const nameRef = useRef();
	const emailRef = useRef();
	const birthdayRef = useRef();

	const submitHandler = async (e) => {
		e.preventDefault();
		setFormState('PENDING');
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
		setStatus(response.status);
		const { message } = await response.json();
		setMessage(message);
		setFormState('DONE');
	};

	useEffect(() => {
		nameRef.current.value = 'Nicolas Vo';
		emailRef.current.value = 'nicvogue@gmail.com';
	}, []);

	return (
		<>
			<Script
				src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_CONTACT_FORM_RECAPTCHA_KEY}`}
				strategy='beforeInteractive' />

			<section style={{ paddingTop: '25vh' }}>
				<h1>
					Contact Me
				</h1>
				<form onSubmit={submitHandler}>
					<fieldset>
						<label htmlFor='name'>
							<p>Name</p>
							<input id='name' ref={nameRef} type='text' minLength={4} maxLength={100} pattern="^([A-Za-z]|\d| |'|\.|,|-|\(|\)){4,100}$" autoComplete='name' required />
						</label>
						<label htmlFor='email'>
							<p>Email</p>
							<input id='email' ref={emailRef} type='email' autoComplete='email' required style={{border: 'none'}}/>
						</label>
						<label htmlFor='birthday' style={{ display: 'none' }}>
							<p>Birthday</p>
							<input id='birthday' ref={birthdayRef} type='date' defaultValue='1984-06-21' autoComplete='off' />
						</label>
						<p>
							This site is protected by reCAPTCHA and the Google <a href='https://policies.google.com/privacy'>Privacy Policy</a> and <a href='https://policies.google.com/terms'>Terms of Service</a> apply.
						</p>
						<button type='submit'>Submit</button>
						<button type='button' onClick={() => {
							setMessage(null);
							setStatus(null);
							setFormState('IDLE');
						}}>Reset</button>
					</fieldset>
				</form>
				<div>
					<div style={{ fontSize: '4rem' }}>{formState === 'PENDING' && <Spinner><FaMinus /></Spinner>}
						{formState === 'DONE' ? status === 200 ? <FaCheckCircle /> : <FaExclamationCircle /> : null}
					</div>
					<p>{status !== null && status}</p>
					<p>{message !== null && message}</p>
				</div>
			</section>
		</>
	);
};

export default ContactForm;
