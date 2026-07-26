import type { ReactNode } from "react";

import "../styles/layouts/page-layout.scss";


interface Props {
    children: ReactNode;
}


export default function PageLayout({
    children,
}: Props) {

    return (

        <main className="page-layout">

            {children}

        </main>

    );
}