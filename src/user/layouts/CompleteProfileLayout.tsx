import type { ReactNode } from 'react';

import '@styles/layouts/complete-profile-layout.scss';

type Props = {
    children: ReactNode;
};

export default function CompleteProfileLayout({ children }: Props) {
    return (
        <div className="complete-profile-layout">
            <div className="complete-profile-layout__card">{children}</div>
        </div>
    );
}
