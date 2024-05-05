import Link from 'next/link';
import { Duckies } from './_components/page';
import { IoArrowBack } from 'react-icons/io5';

const RootNotFound = () => {
	return (
		<>
			<main className='h-lvh w-full flex flex-col items-center justify-center gap-8'>
				<h1 className='font-poppins text-6xl font-bold m-0'>404: Not Found.</h1>
				<Link
					href='/'
					className='flex gap-4 bg-white text-black p-4 rounded-full *:block items-center'>
					<IoArrowBack />
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
