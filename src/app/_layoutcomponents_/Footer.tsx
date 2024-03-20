import { FaGithub, FaLinkedin } from 'react-icons/fa';
import ContactForm from './ContactForm';
import { cache } from 'react';
import path from 'path';
import fs from 'fs/promises';
import { Overpass } from 'next/font/google';

const overpass = Overpass({
	subsets: ['latin-ext'],
	display: 'swap',
	weight: 'variable',
	fallback: ['sans-serif'],
});

import globalLook from '@/styles/globalStyles.module.scss';

const getVersionNumber = cache(async (): Promise<string> => {
	// Read package.json
	const filePath = path.join(process.cwd(), 'package.json');
	const text = await fs.readFile(filePath, 'utf-8');
	const obj = (await JSON.parse(text)) as { version: string };
	return obj.version;
});

const getCopyrightDate = cache(() => new Date().getFullYear());

const Footer = async () => {
	const version = await getVersionNumber();
	const date = getCopyrightDate();
	const footerClasser =
		overpass.className + ' flex flex-col items-center w-full h-svh py-48';

	return (
		<footer
			className={footerClasser}
			id='footer'>
			<ContactForm />
			<hr className='w-1/12' />
			<div className='flex text-4xl gap-4 p-4'>
				<a
					href='https://github.com/nic-vo'
					target='_blank'>
					<FaGithub /> <span className={globalLook.hiddenAccess}>Github</span>
				</a>
				<a
					href='https://www.linkedin.com/in/nicolasvo/'
					target='_blank'>
					<FaLinkedin />{' '}
					<span className={globalLook.hiddenAccess}>LinkedIn</span>
				</a>
			</div>
			<div className='flex items-center max-w-screen-lg gap-8'>
				<p>v. {version}</p>
				<p>&copy; {date} Nicolas Vo</p>
			</div>
		</footer>
	);
};

export default Footer;
