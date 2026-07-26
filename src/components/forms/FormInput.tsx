import type { ChangeEvent } from "react";

import "@styles/forms/input.scss";


interface Props {

    label: string;

    type?: string;

    value: string;

    placeholder?: string;

    error?: string;

    onChange: (
        event: ChangeEvent<HTMLInputElement>
    ) => void;

}


export default function FormInput({
    label,
    type = "text",
    value,
    placeholder,
    error,
    onChange,
}: Props) {


    return (

        <div className="form-input">


            <label>
                {label}
            </label>


            <input
                type={type}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
            />


            {
                error &&
                <span className="form-input__error">
                    {error}
                </span>
            }


        </div>

    );
}