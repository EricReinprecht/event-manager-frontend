import type { FormSectionConfig } from './types';

import FormField from './FormField';

import CollapsibleSection from './CollapsibleSection';

interface Props {
    section: FormSectionConfig;

    values: Record<string, any>;

    onChange(name: string, value: any): void;

    disabled?: boolean;

    errors?: Record<string, string>;

    validationAttempt?: number;
}

export default function FormSection({
    section,
    values,
    onChange,
    disabled = false,
    errors = {},
    validationAttempt = 0,
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

    const sectionFieldNames = [
        ...(section.fields ?? []).map((field) => field.name),
        ...(section.rows ?? []).flat().map((field) => field.name),
    ];

    const hasErrors =
        Boolean(sectionError) ||
        Object.keys(errors).some((errorPath) =>
            sectionFieldNames.some(
                (fieldName) => errorPath === fieldName || errorPath.startsWith(`${fieldName}.`),
            ),
        );

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
                            validationAttempt={validationAttempt}
                            errorKey={field.name}
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
                    validationAttempt={validationAttempt}
                    errorKey={field.name}
                />
            ))}

            {sectionError && <p className="form-error">{sectionError}</p>}
        </>
    );

    if (section.collapsible) {
        return (
            <div data-error-key={`_section_${section.id}`}>
                <CollapsibleSection
                    title={section.title}
                    defaultOpen={section.defaultOpen}
                    forceOpen={hasErrors}
                    forceOpenKey={validationAttempt}
                >
                    {content}
                </CollapsibleSection>
            </div>
        );
    }

    return (
        <section className="form-section" data-error-key={`_section_${section.id}`}>
            <h2>{section.title}</h2>

            {content}
        </section>
    );
}
