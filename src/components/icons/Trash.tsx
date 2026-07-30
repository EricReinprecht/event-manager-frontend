import type { SVGProps } from 'react';

type Props = SVGProps<SVGSVGElement> & {
    size?: number;
};

export default function Trash({ size = 20, className, ...props }: Props) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            className={className}
            {...props}
        >
            <path d="M3 6H21" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />

            <path
                d="M8 6V4C8 3.45 8.45 3 9 3H15C15.55 3 16 3.45 16 4V6"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
            />

            <path
                d="M19 6L18 20C17.95 20.55 17.5 21 17 21H7C6.5 21 6.05 20.55 6 20L5 6"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
            />

            <path d="M10 11V17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />

            <path d="M14 11V17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
    );
}
