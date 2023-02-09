import footLook from './Footer.module.scss';

const Footer = ({ version }) => {
	return (
		<footer className={footLook.footer}>site v. {version} by nicolas vo</footer>
	);
};

export default Footer;
