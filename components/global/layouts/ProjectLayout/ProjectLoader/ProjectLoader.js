import Spinner from '../../../misc/Spinner/Spinner';
import { FaPlus, FaExclamationTriangle } from 'react-icons/fa';

import look from './ProjectLoader.module.scss'

const ProjectLoader = ({ failed }) => {
	return (
		<div className={look.container}>
			{
				failed === true ?
					<FaExclamationTriangle /> :
					(
						<Spinner>
							<FaPlus />
						</Spinner>
					)
			}
			{
				failed === true ? (
					<p className={look.text}>
						{'Error loading project :('}
						<br />
						Refreshing the page might help.
					</p>
				) : (
					<p className={look.text}>
						Project loading...
					</p>
				)
			}
		</div>
	);
};

export default ProjectLoader;
