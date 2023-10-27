import { createContext, useState, useMemo, useCallback } from 'react';

import { DrumMachineProps, DrumMachineSoundList } from '../types';

const ContentContext = createContext<{
	banks: string[],
	activeBank: number,
	activeList: DrumMachineSoundList,
	changeActiveBank: (value: number) => void
}>({
	banks: [''],
	activeBank: 0,
	activeList: { q: { name: '', path: '' } },
	changeActiveBank: () => { }
});

export const ContentContextProvider = (props: {
	data: DrumMachineProps,
	children: React.ReactNode
}) => {
	const banks = useMemo(() => props.data.banks, []);
	const soundLists = useMemo(() => props.data.soundList, []);
	const [active, setActive] = useState(0);

	const changeActiveBank = useCallback(
		(value: number) => setActive(value),
		[]);

	return (
		<ContentContext.Provider value={{
			banks,
			activeBank: active,
			activeList: soundLists[active],
			changeActiveBank
		}}>
			{props.children}
		</ContentContext.Provider>
	);
}

export default ContentContext;
