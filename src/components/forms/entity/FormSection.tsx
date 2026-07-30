import type { FormSectionConfig } from './types';

import FormField from './FormField';

interface Props {
    section: FormSectionConfig;

    values: Record<string, any>;

    onChange(name: string, value: any): void;

    disabled?: boolean;
}

export default function FormSection({ section, values, onChange, disabled = false }: Props) {
    return (
        <section className="form-section">
            <h2>{section.title}</h2>

            {section.fields.map((field) => (
                <FormField
                    key={field.name}
                    field={field}
                    value={values[field.name]}
                    onChange={onChange}
                    disabled={disabled}
                />
            ))}
        </section>
    );
}
