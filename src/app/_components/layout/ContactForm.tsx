'use client';

import { useState, useRef, ElementRef } from 'react';
import Script from 'next/script';
import Spinner from './Spinner';
import {
	FaMinus,
	FaCheckCircle,
	FaExclamationCircle,
	FaArrowRight,
} from 'react-icons/fa';
import { whiteSpaceRemover } from './_lib';

import { jbMonoClass, latoClass, poppinsClass } from '@/styles/fonts';

import cLook from './ContactForm.module.scss';

const ContactForm = () => {
	const [status, setStatus] = useState<number | null>(null);
	const [message, setMessage] = useState<string | null>(null);
	const [formState, setFormState] = useState('IDLE');

	const nameRef = useRef<ElementRef<'input'>>(null);
	const emailRef = useRef<ElementRef<'input'>>(null);
	const birthdayRef = useRef<ElementRef<'input'>>(null);

	const submitHandler = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!nameRef.current || !emailRef.current || !birthdayRef.current) {
			setStatus(400);
			setMessage('Error with your input somehow');
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
				grcRep = (await window.grecaptcha.execute(
					process.env.NEXT_PUBLIC_CONTACT_FORM_RECAPTCHA_KEY,
					{ action: 'simple_contact_form_submit' },
				)) as string;
			} catch {
				statusMessage =
					'There was an error with ReCAPTCHA. Try again or refresh';
				throw new Error();
			}
			try {
				const response = await fetch('/cf', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						name: cleanName,
						email: cleanEmail,
						birthday: birthdayRef.current.value,
						threeToken: grcRep,
					}),
				});
				const inc = (await response.json()) as { message: string };
				statusMessage = inc.message;
				statusNumber = response.status;
			} catch {
				statusMessage = 'There was an error reaching the server; try again';
			}
		} catch {}
		setStatus(statusNumber);
		setMessage(statusMessage);
		setFormState('DONE');
	};

	const disableToggle =
		formState === 'PENDING' || (formState === 'DONE' && status === 200);
	const responseIcon =
		status && status < 300 ? (
			<FaCheckCircle style={{ color: 'mediumseagreen' }} />
		) : (
			<FaExclamationCircle style={{ color: 'firebrick' }} />
		);
	const reKey = process.env.NEXT_PUBLIC_CONTACT_FORM_RECAPTCHA_KEY;

	return (
		<>
			<Script src={`https://www.google.com/recaptcha/api.js?render=${reKey}`} />

			<section className='flex flex-col items-center w-full h-full gap-4'>
				<h2
					className={
						poppinsClass.className +
						' font-bold text-4xl lg:text-5xl text-center mb-4'
					}>
					Need something done?
				</h2>
				<form
					onSubmit={submitHandler}
					className='w-11/12 max-w-prose flex flex-col items-center gap-8'>
					<fieldset
						disabled={disableToggle}
						className={
							latoClass.className +
							' w-full flex flex-col items-center gap-4 border-0 p-0 m-0 disabled:opacity-50'
						}>
						<label
							htmlFor='name'
							className='w-full line text-center flex items-center gap-4 p-4 bg-transparent text-xl font-bold first:*:block'>
							<span className='block border-transparent border-b-4 p-4'>
								Name:
							</span>
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
								className={
									jbMonoClass.className +
									' justify-self-start w-full border-4 p-4 border-transparent border-b-white border-b-4 bg-transparent outline-0 text-base text-white font-normal focus:bg-white focus:text-black placeholder:focus:text-black transition-all h-full outline-none invalid:text-rose-500 invalid:border-rose-500 invalid:focus:bg-rose-200'
								}
							/>
						</label>
						<label
							htmlFor='email'
							className='w-full line text-center flex items-center gap-4 p-4 bg-transparent text-xl font-bold first:*:block'>
							<span className='block border-transparent border-b-4 p-4'>
								Email:
							</span>
							<input
								id='email'
								ref={emailRef}
								placeholder='Type here...'
								type='email'
								autoComplete='email'
								required
								className={
									jbMonoClass.className +
									' justify-self-start w-full border-4 p-4 border-transparent border-b-white bg-transparent outline-0 text-base text-white font-normal focus:bg-white focus:text-black placeholder:focus:text-black transition-all h-full outline-none invalid:text-rose-500 invalid:border-rose-500 invalid:focus:bg-rose-200'
								}
							/>
						</label>
						<label
							htmlFor='birthday'
							style={{ display: 'none' }}>
							Birthday:
							<input
								id='birthday'
								ref={birthdayRef}
								type='date'
								defaultValue='1984-06-21'
								autoComplete='off'
							/>
						</label>
					</fieldset>
					<div className='flex flex-col justify-start items-center m-4 min-h-32 gap-8'>
						<p className='text-center opacity-80'>
							This site is protected by reCAPTCHA and the Google
							<a
								href='https://policies.google.com/privacy'
								className='underline m-1 font-semibold'>
								Privacy Policy
							</a>
							and
							<a
								href='https://policies.google.com/terms'
								className='underline m-1 font-semibold'>
								Terms of Service
							</a>
							apply.
						</p>
						{!disableToggle && (
							<button
								type='submit'
								className='cursor-pointer flex items-center justify-center w-40 p-4 m-2 border-4 border-white text-xl rounded-3xl bg-transparent gap-2 hover:bg-white hover:text-black focus:bg-white focus:text-black active:bg-white active:text-black last:*:transition-all last:*:hover:translate-x-4 last:*:focus:translate-x-4 disabled:hidden transition-all'>
								Submit
								<FaArrowRight />
							</button>
						)}
					</div>
					<div className='flex items-center justify-center min-h-32 w-4/5 text-xl '>
						{formState === 'PENDING' && (
							<Spinner>
								<FaMinus className='text-9xl' />
							</Spinner>
						)}
						{formState === 'DONE' && responseIcon}
						{message !== null && (
							<p className={'text-center p-0 m-0 ml-4 ' + cLook.responseMesg}>
								{message}
							</p>
						)}
					</div>
				</form>
			</section>
		</>
	);
};

export default ContactForm;
