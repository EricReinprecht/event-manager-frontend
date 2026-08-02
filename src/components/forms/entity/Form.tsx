import type { FormSectionConfig } from './types';
import FormSection from './FormSection';
import '@styles/forms/entity-form/index.scss';

import { useTranslation } from 'react-i18next';

interface Props {
    title: string;

    sections: FormSectionConfig[];

    values: Record<string, any>;

    onChange(name: string, value: any): void;

    onSubmit?(): void;

    submitLabel?: string;

    disabled?: boolean;

    actionButton?: React.ReactNode;

    beforeActions?: React.ReactNode;

    errors?: Record<string, string>;

    validationAttempt?: number;
}

export default function Form({
    title,
    sections,
    values,
    onChange,
    onSubmit,
    disabled = false,
    submitLabel,
    actionButton,
    beforeActions,
    errors = {},
    validationAttempt = 0,
}: Props) {
    const { t } = useTranslation('entityForm');

    const errorCount = Object.keys(errors).length;

    return (
        <form
            className="entity-form"
            onSubmit={(event) => {
                event.preventDefault();

                onSubmit?.();
            }}
        >
            <div className="entity-form__header">
                <h1>{title}</h1>
            </div>

            {errorCount > 0 && (
                <div className="form-validation-summary" role="alert" aria-live="polite">
                    <strong>
                        {t('validation.summary', {
                            count: errorCount,
                        })}
                    </strong>
                </div>
            )}

            {sections.map((section) => (
                <FormSection
                    key={section.id}
                    section={section}
                    values={values}
                    onChange={onChange}
                    disabled={disabled}
                    errors={errors}
                    validationAttempt={validationAttempt}
                />
            ))}

            {beforeActions}

            <div className="form-actions">
                {onSubmit && (
                    <button
                        type="submit"
                        className="form-button form-button--primary"
                        disabled={disabled}
                    >
                        {submitLabel}
                    </button>
                )}

                {actionButton}
            </div>
        </form>
    );
}
