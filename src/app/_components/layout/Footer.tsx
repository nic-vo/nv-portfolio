import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { HiddenButAccessible } from '@/components/global';
import ContactForm from './ContactForm';
import { cache } from 'react';
import path from 'path';
import fs from 'fs/promises';

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

	return (
		<footer
			className='flex flex-col items-center w-full min-h-lvh py-24 bg-[linear-gradient(transparent,black)]'
			id='footer'>
			<ContactForm />
			<div className='flex text-4xl gap-4 p-4'>
				<a
					href='https://github.com/nic-vo'
					target='_blank'>
					<FaGithub aria-hidden={true} />{' '}
					<HiddenButAccessible>GitHub</HiddenButAccessible>
				</a>
				<a
					href='https://www.linkedin.com/in/nicolasvo/'
					target='_blank'>
					<FaLinkedin aria-hidden={true} />{' '}
					<HiddenButAccessible>LinkedIn</HiddenButAccessible>
				</a>
			</div>
			<div className='flex items-center max-w-screen-lg gap-8'>
				<span>v. {version}</span>
				<p>&copy; {date} Nicolas Vo</p>
			</div>
		</footer>
	);
};

export default Footer;
