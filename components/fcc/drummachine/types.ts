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
	soundList: DrumMachineSoundList[]
}
