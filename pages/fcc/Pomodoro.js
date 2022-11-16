import Head from 'next/head';
import { ProjectLayout } from '../../components/global';
import { PomodoroComp } from '../../components/fcc/pomodoro';

const Pomodoro = () => {
	return (<>
		<Head>
			<title>A Pomodoro Timer</title>
			<meta name="description" content="A React Pomodoro Timer completed for freeCodeCamp's frontend certificate" />
			<link rel="icon" href="/favicon.ico" />
		</Head>

		<ProjectLayout>
			<h1>A Pomodoro Timer</h1>
			<PomodoroComp />
			<section>
				<p>
					Description blurb + link to codepen
				</p>
			</section>
		</ProjectLayout>
	</>);
};

export default Pomodoro;
