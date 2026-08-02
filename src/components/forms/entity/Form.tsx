import { useId } from 'react';
import { useTranslation } from 'react-i18next';

import UserPageHeader from '@user/layouts/UserPageHeader';

import FormSection from './FormSection';
import type { FormSectionConfig } from './types';

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
    errors = {},
    validationAttempt = 0,
}: Props) {
    const { t } = useTranslation('entityForm');
    const formId = useId();

    const errorCount = Object.keys(errors).length;

    return (
        <form
            id={formId}
            className="entity-form"
            onSubmit={(event) => {
                event.preventDefault();

                onSubmit?.();
            }}
        >
            <UserPageHeader
                title={title}
                actions={
                    <>
                        {actionButton}

                        {onSubmit && (
                            <button
                                type="submit"
                                form={formId}
                                className="form-button form-button--primary"
                                disabled={disabled}
                            >
                                {submitLabel}
                            </button>
                        )}
                    </>
                }
            />

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
        </form>
    );
}
