'use client';

import { useState, useRef, ElementRef, PropsWithChildren } from 'react';
import { SRText } from '@/components/global';
import {
	IoRemove,
	IoCheckmarkCircle,
	IoAlertCircle,
	IoArrowForward,
} from 'react-icons/io5';
import { whiteSpaceRemover } from './_lib';

const Spinner = (props: PropsWithChildren) => {
	return (
		<div className='flex items-center justify-center animate-spin m-0 p-0 origin-center'>
			{props.children}
		</div>
	);
};

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
			<IoCheckmarkCircle
				aria-label='Contact form submission success'
				className='block text-xl text-green-500'
			/>
		) : (
			<IoAlertCircle
				aria-label='Contact form submission error'
				className='block text-xl text-red-500'
			/>
		);

	return (
		<form
			onSubmit={submitHandler}
			className='w-11/12 max-w-prose flex flex-col items-center gap-8'>
			<h2 className='font-poppins font-bold text-4xl lg:text-5xl text-center mb-4'>
				Need something done?
			</h2>
			<fieldset
				disabled={disableToggle}
				className='font-lato w-full flex flex-col items-center gap-4 border-0 p-0 m-0 disabled:opacity-50'>
				<label
					htmlFor='name'
					className='font-lato w-full line text-center flex items-center gap-4 p-4 bg-transparent text-xl font-bold first:*:block'>
					<span className='block border-transparent border-b-4 p-4'>Name:</span>
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
						className='font-jbmono justify-self-start w-full border-4 p-4 border-transparent border-b-white border-b-4 bg-transparent text-base text-white font-normal focus-visible:bg-white focus-visible:text-black placeholder:focus-visible:text-black transition-all h-full outline-none'
					/>
				</label>
				<label
					htmlFor='email'
					className='font-lato w-full line text-center flex items-center gap-4 p-4 bg-transparent text-xl font-bold first:*:block'>
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
						className='font-jbmono justify-self-start w-full border-4 p-4 border-transparent border-b-white border-b-4 bg-transparent text-base text-white font-normal focus-visible:bg-white focus-visible:text-black placeholder:focus-visible:text-black transition-all h-full outline-none'
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
						className='underline m-1 font-semibold outline-white outline-offset-4 focus-visible:outline rounded-lg'>
						Privacy Policy
					</a>
					and
					<a
						href='https://policies.google.com/terms'
						className='underline m-1 font-semibold outline-white outline-offset-4 focus-visible:outline rounded-lg'>
						Terms of Service
					</a>
					apply.
				</p>
				{!disableToggle && status !== 201 && (
					<button
						type='submit'
						className='cursor-pointer flex items-center justify-center w-40 p-4 m-2 border-4 border-white text-xl rounded-3xl bg-transparent gap-2 outline-none hover:bg-white hover:text-black focus-visible:bg-white focus-visible:text-black active:bg-white active:text-black last:*:transition-all last:*:hover:translate-x-4 last:*:focus-visible:translate-x-4 disabled:hidden transition-all'>
						Submit
						<IoArrowForward aria-hidden={true} />
					</button>
				)}
			</div>
			<div
				role='status'
				className='flex items-center justify-center min-h-32 w-4/5 text-xl '>
				{formState === 'PENDING' && (
					<Spinner>
						<IoRemove
							className='text-6xl origin-center block'
							aria-hidden={true}
						/>
						<SRText>Loading...</SRText>
					</Spinner>
				)}
				{formState === 'DONE' && responseIcon}
				{message !== null && (
					<p className='text-center p-0 m-0 ml-4'>{message}</p>
				)}
			</div>
		</form>
	);
};

export default ContactForm;
