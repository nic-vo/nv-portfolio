import { Footer } from './_components/layout';
import {
    silkscreenClass,
    overpassClass,
    poppinsClass,
    latoClass,
    jbMonoClass,
} from '@/styles/fonts';
import { sharedRobots } from '@/data/metadata';
import type { Metadata } from 'next';

import { PropsWithChildren } from 'react';

import '@/styles/globals.css';

const RootLayout = (props: PropsWithChildren) => {
    return (
        <html lang='en'>
            <body
                className={[
                    overpassClass.variable,
                    poppinsClass.variable,
                    latoClass.variable,
                    jbMonoClass.variable,
                    silkscreenClass.variable,
                    'font-overpass',
                ].join(' ')}>
                {props.children}
                <Footer />
            </body>
        </html>
    );
};

export default RootLayout;

export const metadata: Metadata = {
    keywords: [
        'Front end',
        'React',
        'Next.js',
        'Full stack',
        'Developer',
        'TypeScript',
    ],
    creator: 'Nicolas Vo',
    category: 'software',
    robots: sharedRobots,
};

export const revalidate = false;
