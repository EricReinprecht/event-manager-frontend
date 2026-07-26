import type { ReactNode } from "react";
import "../../styles/forms/base-form.scss";

interface Props {
    title: string;
    children: ReactNode;
}

export default function BaseFormLayout({
    title,
    children,
}: Props) {

    return (
        <div className="base-form">

            <div className="base-form__container">

                <h1>
                    {title}
                </h1>

                <div className="base-form__content">
                    {children}
                </div>

            </div>

        </div>
    );
}