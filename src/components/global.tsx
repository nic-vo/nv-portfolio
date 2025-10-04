import { DetailedHTMLProps, HTMLAttributes, PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';

/**
 * For instances where I want to reproduce styling
 * but otherwise keep an element customizable. \
 * */
type SCEC<T = HTMLElement> = PropsWithChildren &
    DetailedHTMLProps<HTMLAttributes<T>, T>;

export const SRText = (props: PropsWithChildren) => {
    return <span className='sr-only'>{props.children}</span>;
};

export const AppMain = ({ children, className, ...attrs }: SCEC) => (
    <main
        className={twMerge('', className)}
        {...attrs}>
        {children}
    </main>
);

export const HeadingOne = ({
    children,
    className,
    ...attrs
}: SCEC<HTMLHeadingElement>) => (
    <h1
        className={twMerge('', className)}
        {...attrs}>
        {children}
    </h1>
);
