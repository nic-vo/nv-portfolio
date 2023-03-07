import targetLook from './Target.module.scss';

const Target = ({ difficulty, precisionHitHandler, hitHandler}) => {
	return (
		<div onClick={hitHandler} style={{ backgroundColor: "yellow" }}>
			<div onClick={precisionHitHandler} style={{ backgroundColor: "red" }}></div>
		</div>
	);
};

export default Target;
