import type { FormSectionConfig } from './types';

import FormField from './FormField';

import CollapsibleSection from './CollapsibleSection';

interface Props {
    section: FormSectionConfig;

    values: Record<string, any>;

    onChange(name: string, value: any): void;

    disabled?: boolean;

    errors?: Record<string, string>;
}

export default function FormSection({
    section,
    values,
    onChange,
    disabled = false,
    errors = {},
}: Props) {
    function getFieldErrors(fieldName: string): Record<string, string> {
        const prefix = `${fieldName}.`;

        return Object.entries(errors).reduce<Record<string, string>>((result, [key, message]) => {
            if (!key.startsWith(prefix)) {
                return result;
            }

            result[key.substring(prefix.length)] = message;

            return result;
        }, {});
    }

    const sectionError = errors[`_section_${section.id}`];

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
                            error={errors[field.name]}
                            fieldErrors={getFieldErrors(field.name)}
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
                    error={errors[field.name]}
                    fieldErrors={getFieldErrors(field.name)}
                />
            ))}

            {sectionError && <p className="form-error">{sectionError}</p>}
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
