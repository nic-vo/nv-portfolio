import spinLook from './Spinner.module.scss';

const Spinner = (props: { children: React.ReactNode }) => {
	return (
		<div className={spinLook.spindiv}>
			{props.children}
		</div>
	);
};

export default Spinner;
