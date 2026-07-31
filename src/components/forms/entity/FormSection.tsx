import type { FormSectionConfig } from './types';

import FormField from './FormField';

import CollapsibleSection from './CollapsibleSection';

interface Props {
    section: FormSectionConfig;

    values: Record<string, any>;

    onChange(name: string, value: any): void;

    disabled?: boolean;
}

export default function FormSection({ section, values, onChange, disabled = false }: Props) {
    const content = (
        <>
            {section.rows?.map((row, index) => (
                <div className="form-row" key={index}>
                    {row.map((field) => (
                        <FormField
                            key={field.name}
                            field={field}
                            value={values[field.name]}
                            onChange={onChange}
                            disabled={disabled}
                        />
                    ))}
                </div>
            ))}

            {section.fields?.map((field) => (
                <FormField
                    key={field.name}
                    field={field}
                    value={values[field.name]}
                    onChange={onChange}
                    disabled={disabled}
                />
            ))}
        </>
    );

    if (section.collapsible) {
        return (
            <CollapsibleSection title={section.title} defaultOpen={section.defaultOpen}>
                {content}
            </CollapsibleSection>
        );
    }

    return (
        <section className="form-section">
            <h2>{section.title}</h2>

            {content}
        </section>
    );
}
