import spinLook from './Spinner.module.scss';

const Spinner = ({ children }) => {
	return (
		<div className={spinLook.spindiv}>
			{children}
		</div>
	);
};

export default Spinner;
