import Head from "next/head";
import Script from "next/script";
import { useState, useRef, useEffect } from "react";

import { whiteSpaceRemover } from "../../../lib/client/homepage/ContactForm/ContactForm";

const ContactForm = () => {
	const [response, setResponse] = useState(null);
	const [formState, setFormState] = useState('Idle');

	const nameRef = useRef();
	const emailRef = useRef();
	const birthdayRef = useRef();

	const submitHandler = async (e) => {
		e.preventDefault();
		setFormState('Pending');
		const cleanName = whiteSpaceRemover(nameRef.current.value);
		const cleanEmail = whiteSpaceRemover(emailRef.current.value);
		nameRef.current.value = cleanName;
		emailRef.current.value = cleanEmail;
		const grcRep = await window.grecaptcha.execute(process.env.NEXT_PUBLIC_RECAPTCHA_KEY, { action: 'simple_contact_form_submit' });
		const response = await fetch('http://localhost:3000/api/cf/cf', {
			method: 'POST',
			headers: { 'Content-type': 'application/json' },
			body: JSON.stringify({
				name: cleanName,
				email: cleanEmail,
				threeToken: grcRep
			})
		})
		const data = await response.json();
		setResponse(data);
		setFormState('DONE');
	};

	useEffect(() => {
		nameRef.current.value = 'Nicolas Vo';
		emailRef.current.value = 'nicvogue@gmail.com';
		birthdayRef.current.value = '1998-11-21';
	}, []);

	return (
		<>
			<Script
				src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_KEY}`}
				strategy='beforeInteractive' />

			<section style={{ paddingTop: "25vh" }}>
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
							<input id='email' ref={emailRef} type='email' autoComplete='email' required />
						</label>
						<label htmlFor='birthday' style={{ display: 'none' }}>
							<p>Birthday</p>
							<input id='birthday' ref={birthdayRef} type='date' autoComplete='off' />
						</label>
						<p>
							This site is protected by reCAPTCHA and the Google <a href="https://policies.google.com/privacy">Privacy Policy</a> and <a href="https://policies.google.com/terms">Terms of Service</a> apply.
						</p>
						<button type='submit'>Submit</button>
						<button type='button' onClick={() => {
							setResponse(null);
							setFormState('IDLE');
						}}>Reset</button>
					</fieldset>
				</form>
				<div>
					<p>{formState}</p>
					<p>{response !== null && response.status}</p>
					<p>{response !== null && response.newName}</p>
					<p>{response !== null && response.newEmail}</p>
					<p>{response !== null && response.rSuccess ? 'true' : ''}</p>
					<p>{response !== null && response.rScore}</p>
				</div>
			</section>
		</>
	);
};

export default ContactForm;
