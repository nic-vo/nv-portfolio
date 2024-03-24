import Link from 'next/link';
import { Duckies } from './_rootpage_';
import { FaArrowLeft } from 'react-icons/fa';

import { poppinsClass } from '@/styles/fonts';

const RootNotFound = () => {
	return (
		<>
			<main className='h-full w-full flex flex-col items-center justify-center gap-8'>
				<h1 className={poppinsClass + ' text-[8vmax] font-bold m-0'}>
					404: Not Found.
				</h1>
				<Link href='/'>
					<FaArrowLeft />
					<p>Back to home</p>
				</Link>
				<p>
					You didn&apos;t find what you were looking for, but you found the
					ducks. Say hi.
				</p>
				<Duckies />
			</main>
		</>
	);
};

export default RootNotFound;

export const metadata = {
	title: 'Nicolas Vo | 404',
};
