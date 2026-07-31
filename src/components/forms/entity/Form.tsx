import type { FormSectionConfig } from './types';
import FormSection from './FormSection';
import '@styles/forms/entity-form.scss';

interface Props {
    title: string;

    sections: FormSectionConfig[];

    values: Record<string, any>;

    onChange(name: string, value: any): void;

    onSubmit?(): void;

    submitLabel?: string;

    disabled?: boolean;

    actionButton?: React.ReactNode;
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
