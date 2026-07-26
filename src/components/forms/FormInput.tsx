import type { InputHTMLAttributes } from 'react';

import '@styles/forms/input.scss';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    label: string;

    error?: string;
}

export default function FormInput({ label, error, ...props }: Props) {
    return (
        <div className="form-input">
            <label>{label}</label>

            <input {...props} />

            {error && <span className="form-input__error">{error}</span>}
        </div>
    );
}
