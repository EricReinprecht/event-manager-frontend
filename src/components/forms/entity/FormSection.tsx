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

        return Object.entries(errors).reduce<Record<string, string>>(
            (result, [errorPath, message]) => {
                if (!errorPath.startsWith(prefix)) {
                    return result;
                }

                result[errorPath.substring(prefix.length)] = message;

                return result;
            },
            {},
        );
    }

    const sectionErrorKey = `_section_${section.id}`;

    const sectionError = errors[sectionErrorKey];

    const sectionFieldNames = [
        ...(section.fields ?? []).map((field) => field.name),

        ...(section.rows ?? []).flat().map((field) => field.name),
    ];

    function belongsToSection(errorPath: string): boolean {
        if (errorPath === sectionErrorKey) {
            return true;
        }

        return sectionFieldNames.some(
            (fieldName) => errorPath === fieldName || errorPath.startsWith(`${fieldName}.`),
        );
    }

    const sectionErrorPaths = Object.keys(errors).filter(belongsToSection);

    const hasErrors = sectionErrorPaths.length > 0;

    const errorCount = sectionErrorPaths.length;

    const content = (
        <>
            {section.rows?.map((row, rowIndex) => (
                <div className="form-row" key={rowIndex}>
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
            <div data-error-key={sectionErrorKey}>
                <CollapsibleSection
                    title={section.title}
                    defaultOpen={section.defaultOpen}
                    forceOpen={hasErrors}
                    forceOpenKey={validationAttempt}
                    errorCount={errorCount}
                    variant="section"
                >
                    {content}
                </CollapsibleSection>
            </div>
        );
    }

    return (
        <section
            className={`form-section ${hasErrors ? 'form-section--has-errors' : ''}`}
            data-error-key={sectionErrorKey}
        >
            <div className="form-section__title">
                <h2>{section.title}</h2>

                {errorCount > 0 && <span className="form-section__error-badge">{errorCount}</span>}
            </div>

            {content}
        </section>
    );
}
