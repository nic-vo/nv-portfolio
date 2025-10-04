import {
    Silkscreen,
    Overpass,
    Poppins,
    Lato,
    JetBrains_Mono,
    Work_Sans,
} from 'next/font/google';

export const workSans = Work_Sans({
    weight: 'variable',
    subsets: ['latin', 'latin-ext'],
    variable: '--font-ws',
});
