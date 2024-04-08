import { Silkscreen } from 'next/font/google';

export const silkscreenClass = Silkscreen({
	weight: '400',
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-silkscreen',
	fallback: ['monospace', 'ui-monospace', 'system-ui'],
	preload: true,
});
