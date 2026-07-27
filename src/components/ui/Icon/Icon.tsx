import type { SVGProps } from 'react';

import ArrowRight from '@assets/icons/arrow-right.svg?react';
import Eye from '@assets/icons/eye.svg?react';

const icons = {
    arrowRight: ArrowRight,
    eye: Eye,
} as const;

export type IconName = keyof typeof icons;

type IconProps = SVGProps<SVGSVGElement> & {
    name: IconName;
    size?: number;
};

export default function Icon({ name, size = 24, ...props }: IconProps) {
    const Component = icons[name];

    return <Component width={size} height={size} {...props} />;
}
