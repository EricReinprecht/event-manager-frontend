import type { InputHTMLAttributes, ReactNode } from 'react';

type Props = InputHTMLAttributes<HTMLInputElement> & {
    label: string;
    error?: string;
    rightIcon?: ReactNode;
};

export default function FormInput({ label, error, rightIcon, ...props }: Props) {
    return (
        <div className="form-input">
            <label>{label}</label>

            <div className="form-input__wrapper">
                <input {...props} />

                {rightIcon && <div className="form-input__icon">{rightIcon}</div>}
            </div>

            {error && <p className="form-input__error">{error}</p>}
        </div>
    );
}
