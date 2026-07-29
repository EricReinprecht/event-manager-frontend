import type { FormSectionConfig } from './types';
import FormSection from './FormSection';
import '@styles/forms/entity-form.scss';

interface Props {
    sections: FormSectionConfig[];

    values: Record<string, any>;

    onChange(name: string, value: any): void;

    onSubmit(): void;

    submitLabel?: string;
}

export default function Form({
    sections,
    values,
    onChange,
    onSubmit,
    submitLabel = 'Save',
}: Props) {
    return (
        <form
            className="entity-form"
            onSubmit={(e) => {
                e.preventDefault();

                onSubmit();
            }}
        >
            {sections.map((section) => (
                <FormSection
                    key={section.title}
                    section={section}
                    values={values}
                    onChange={onChange}
                />
            ))}

            <button type="submit" className="form-button">
                {submitLabel}
            </button>
        </form>
    );
}
