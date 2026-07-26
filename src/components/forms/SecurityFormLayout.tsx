import type { ReactNode } from "react";

import BaseFormLayout from "./BaseFormLayout";

import "../../styles/forms/security-form.scss";


interface Props {

    title: string;

    children: ReactNode;

}


export default function SecurityFormLayout({
    title,
    children,
}: Props) {


    return (

        <BaseFormLayout title={title}>

            <div className="security-form">

                {children}

            </div>

        </BaseFormLayout>

    );
}