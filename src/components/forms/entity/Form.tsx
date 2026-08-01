import type { FormSectionConfig } from './types';
import FormSection from './FormSection';
import '@styles/forms/entity-form/index.scss';

interface Props {
    title: string;

    sections: FormSectionConfig[];

    values: Record<string, any>;

    onChange(name: string, value: any): void;

    onSubmit?(): void;

    submitLabel?: string;

    disabled?: boolean;

    actionButton?: React.ReactNode;

    errors?: Record<string, string>;
}

export default function Form({
    title,
    sections,
    values,
    onChange,
    onSubmit,
    submitLabel = 'Save',
    disabled = false,
    actionButton,
    errors = {},
}: Props) {
    return (
        <>
            <form
                className="entity-form"
                onSubmit={(e) => {
                    e.preventDefault();

                    if (!disabled) {
                        onSubmit?.();
                    }
                }}
            >
                <div className="form-content">
                    <h1>{title}</h1>
                    {sections.map((section) => (
                        <FormSection
                            key={section.title}
                            section={section}
                            values={values}
                            onChange={onChange}
                            disabled={disabled}
                            errors={errors}
                        />
                    ))}
                </div>
                <div className="form-actions">
                    {onSubmit && (
                        <button type="submit" className="form-button" disabled={disabled}>
                            {submitLabel}
                        </button>
                    )}

                    {actionButton}
                </div>
            </form>
        </>
    );
}
