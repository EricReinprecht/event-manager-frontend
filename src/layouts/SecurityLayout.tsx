import type { ReactNode } from "react";

import PageLayout from "./PageLayout";

import "../styles/layouts/security-layout.scss";


interface Props {

    children: ReactNode;

}


export default function SecurityLayout({
    children,
}: Props) {


    return (

        <PageLayout>

            <section className="security-layout">

                {children}

            </section>

        </PageLayout>

    );

}