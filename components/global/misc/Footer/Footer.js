import footLook from './Footer.module.scss';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { ContactForm } from '../../../homepage';

const Footer = ({ version }) => {

	const date = new Date();

	return (
		<footer className={footLook.footer} id='footer'>
			<ContactForm />
			<hr className={footLook.divider} />
			<div className={footLook.links}>
				<a href='https://github.com/nic-vo' target='_blank'><FaGithub /></a>
				<a href='https://linkedin.com/in/nicolas-vo-685086208' target='_blank'><FaLinkedin /></a>
			</div>
			<div className={footLook.textbanner}>
				<p>v. {version}</p>
				<p>&copy; {date.getFullYear()} Nicolas Vo</p>
			</div>
		</footer>
	);
};

export default Footer;
