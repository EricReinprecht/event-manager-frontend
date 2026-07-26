import type { ReactNode } from 'react';

import PageLayout from './PageLayout';

import '@styles/layouts/user-layout.scss';

interface Props {
    children: ReactNode;
}

export default function UserLayout({ children }: Props) {
    return (
        <PageLayout>
            <section className="user-layout">{children}</section>
        </PageLayout>
    );
}
