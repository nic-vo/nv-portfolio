import * as Featured from "@/components/featured";
import * as Other from "@/components/other";

import Wip from "@/components/global/misc/Wip/Wip";

import look from "./ProjectContainer.module.scss";
import { DrumMachineProps } from "@/lib/props/types/projects";

const ActiveComponent = (props: {
	project: string;
	optionalProps?: DrumMachineProps;
}) => {
	const { project, optionalProps } = props;
	switch (project) {
		case "BlockBuildersGC":
			return <Featured.BlockBuildersGC />;
		case "PortfolioSite":
			return <Featured.PortfolioSite />;
		case "Markdown":
			return <Other.Markdown />;
		case "MixDelta":
			return <Featured.MixDelta />;
		case "LofiCafe":
			return <Other.LofiCafe />;
		case "Calculator":
			return <Other.Calculator />;
		case "DrumMachine":
			const Thing = Other.DrumMachine(optionalProps!);
			return <Thing />;
		default:
			return <Wip />;
	}
};

const ProjectContainer = (props: {
	project: string;
	optionalProps?: DrumMachineProps;
}) => {
	const { project, optionalProps } = props;
	return (
		<section className={look.container}>
			<ActiveComponent
				project={project}
				optionalProps={optionalProps}
			/>
		</section>
	);
};

export default ProjectContainer;
