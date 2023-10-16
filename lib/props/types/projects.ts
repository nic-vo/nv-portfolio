export type ProjectDataTypes = 'title'
	| 'wip'
	| 'slugline'
	| 'description'
	| 'techs'
	| 'original'
	| 'optional';

export type ProjectData = {
	category: 'other' | 'featured',
	project: string,
	title?: string,
	wip?: boolean,
	slugline?: string,
	description?: string,
	techs?: string[],
	original?: string,
	optional: DrumMachineProps | null
}

export type ProjectCardProps = Required<
	Pick<ProjectData, 'project' | 'title' | 'wip'>
> & {
	categoryName: string
}

const keypadChars = ['q', 'w', 'e', 'a', 's', 'd', 'z', 'x', 'c'];

interface DrumMachineSound {
	name: string,
	path: string
}

export type DrumMachineSoundList = {
	[key in typeof keypadChars[number]]: DrumMachineSound
}

export type DrumMachineProps = {
	banks: string[],
	numberOfBanks: number,
	soundList: DrumMachineSoundList[]
}

export type ProjectListProp = {
	categoryName: 'featured' | 'other',
	projects: ProjectCardProps[]
}

export type LayoutData = {
	otherProjects: ProjectListProp[],
	version: string,
	linkExclude: string
}
