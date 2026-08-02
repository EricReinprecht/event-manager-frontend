import type { SVGProps } from 'react';

type Props = SVGProps<SVGSVGElement> & {
    size?: number;
};

export default function PublishIcon({ size = 20, className, ...props }: Props) {
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
                d="M12 16V4M12 4L7.5 8.5M12 4L16.5 8.5"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M5 13V19C5 20.1 5.9 21 7 21H17C18.1 21 19 20.1 19 19V13"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}
