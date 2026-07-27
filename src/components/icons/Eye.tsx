import type { SVGProps } from 'react';

type Props = SVGProps<SVGSVGElement> & {
    size?: number;
};

export default function EyeIcon({ size = 20, className, ...props }: Props) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            className={className}
            {...props}
        >
            <path
                d="M2 12C2 12 5.5 5 12 5C18.5 5 22 12 22 12C22 12 18.5 19 12 19C5.5 19 2 12 2 12Z"
                stroke="currentColor"
                strokeWidth="2"
            />

            <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
        </svg>
    );
}
