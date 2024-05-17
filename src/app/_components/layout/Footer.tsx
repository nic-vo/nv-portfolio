import { IoLogoGithub, IoLogoLinkedin } from 'react-icons/io5';
import { SRText } from '@/components/global';
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
			className='flex flex-col items-center w-full min-h-lvh py-12 bg-[linear-gradient(transparent,black)] gap-4'
			id='footer'>
			<ContactForm />
			<div className='flex text-4xl gap-4 p-4'>
				<a
					href='https://github.com/nic-vo'
					target='_blank'
					className='p-2 focus-visible:outline outline-white outline-offset-4 rounded-lg'
					aria-label='Check out my GitHub'>
					<IoLogoGithub aria-hidden={true} />{' '}
					<SRText>Check out my GitHub</SRText>
				</a>
				<a
					href='https://www.linkedin.com/in/nicolasvo/'
					target='_blank'
					className='p-2 focus-visible:outline outline-white outline-offset-4 rounded-lg'
					aria-label='View my LinkedIn profile'>
					<IoLogoLinkedin aria-hidden={true} />{' '}
					<SRText>View my LinkedIn profile</SRText>
				</a>
			</div>
			<div className='font-lato font-light flex items-center max-w-screen-lg gap-8'>
				<span>v. {version}</span>
				<p>&copy; {date} Nicolas Vo</p>
			</div>
		</footer>
	);
};

export default Footer;
