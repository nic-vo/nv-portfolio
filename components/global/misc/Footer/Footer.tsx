import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { ContactForm } from '../../../homepage';

import look from './Footer.module.scss';

const Footer = (props: { version: string }) => {
	const { version } = props;
	const date = new Date();

	return (
		<footer className={look.footer} id='footer'>
			<ContactForm />
			<hr className={look.divider} />
			<div className={look.links}>
				<a href='https://github.com/nic-vo' target='_blank'>
					<FaGithub /> <span className={look.hidden}>Github</span>
				</a>
				<a href='https://linkedin.com/in/nicolas-vo-685086208' target='_blank'>
					<FaLinkedin /> <span className={look.hidden}>LinkedIn</span>
				</a>
			</div>
			<div className={look.textbanner}>
				<p>v. {version}</p>
				<p>&copy; {date.getFullYear()} Nicolas Vo</p>
			</div>
		</footer>
	);
};

export default Footer;
