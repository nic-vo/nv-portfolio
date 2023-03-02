import wipLook from './Wip.module.scss';

const Wip = () => {
	return (
		<div className={wipLook.container}>
			<p className={wipLook.big}>WIP</p>
			<p className={wipLook.small}>(work in progress)</p>
		</div>
	);
};

export default Wip;
