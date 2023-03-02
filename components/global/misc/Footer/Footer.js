import footLook from './Footer.module.scss';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { ContactForm } from '../../../homepage';

const Footer = ({ version }) => {
	return (
		<footer className={footLook.footer}>
			<ContactForm />
			<hr className={footLook.divider} />
			<p>site v. {version} by nicolas vo</p>
			<div className={footLook.links}>
				<a href='https://github.com/nic-vo' target='_blank'><FaGithub /></a>
				<a href='https://linkedin.com/in/nicolas-vo-685086208' target='_blank'><FaLinkedin /></a>
			</div>
		</footer>
	);
};

export default Footer;
