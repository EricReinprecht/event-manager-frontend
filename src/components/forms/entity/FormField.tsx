import type { FormFieldConfig } from './types';

interface Props {
    field: FormFieldConfig;

    value: any;

    onChange(name: string, value: any): void;
}

export default function FormField({ field, value, onChange }: Props) {
    return (
        <div className="form-input">
            <label>{field.label}</label>

            {field.type === 'textarea' && (
                <textarea
                    value={value}
                    placeholder={field.placeholder}
                    onChange={(e) => onChange(field.name, e.target.value)}
                />
            )}

            {field.type !== 'textarea' && field.type !== 'select' && (
                <input
                    type={field.type}
                    value={value}
                    placeholder={field.placeholder}
                    required={field.required}
                    onChange={(e) => onChange(field.name, e.target.value)}
                />
            )}

            {field.type === 'select' && (
                <select value={value} onChange={(e) => onChange(field.name, e.target.value)}>
                    {field.options?.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            )}
        </div>
    );
}
