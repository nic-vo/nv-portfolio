import Spinner from '../../../misc/Spinner/Spinner';
import { FaPlus, FaExclamationTriangle } from 'react-icons/fa';

import look from './ProjectLoader.module.scss'

const ProjectLoaderComp = (props: { failed: boolean }) => {
	return (
		<div className={look.container}>
			{
				props.failed === true ?
					<FaExclamationTriangle /> :
					(
						<Spinner>
							<FaPlus />
						</Spinner>
					)
			}
			{
				props.failed === true ? (
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
}

const ProjectLoader = (props: {
	error?: Error | null,
	pastDelay?: boolean,
	timedOut?: boolean
}) => {
	const { error, pastDelay, timedOut } = props;
	return <ProjectLoaderComp failed={
		(error !== null && error !== undefined)
		|| (pastDelay !== undefined && pastDelay)
		|| (timedOut !== undefined && timedOut)
	} />
}

export default ProjectLoader;
