import type { ButtonHTMLAttributes, ReactNode } from 'react';

type FormButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    children: ReactNode;
    loading?: boolean;
};

export default function FormButton({
    children,
    loading = false,
    disabled,
    className = '',
    ...props
}: FormButtonProps) {
    return (
        <button
            className={`form-button ${className}`.trim()}
            disabled={disabled || loading}
            {...props}
        >
            {loading ? 'Loading...' : children}
        </button>
    );
}
