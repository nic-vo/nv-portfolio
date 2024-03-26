import ProjectInfo, {
	getProjectDescription,
} from '../../_components/page/parts';

const title = 'A Calculator';

const CalculatorPage = async () => {
	const description = await getProjectDescription(__dirname);
	return (
		<ProjectInfo
			title='A Calculator'
			link={'https://codepen.io/jungle_cone/pen/VwMdemx'}
			techs={['React', 'CSS3']}
			description={description}
		/>
	);
};

export default CalculatorPage;

export const metadata = { title };
