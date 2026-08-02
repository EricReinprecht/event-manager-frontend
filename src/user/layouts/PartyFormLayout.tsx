import { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import Form from '@components/forms/entity/Form';
import validateForm from '@components/forms/entity/validateForm';
import scrollToFirstError from '@components/forms/entity/helper';

import { createPartyForm } from '../constants/forms/create.party.forms';

import { useCategories } from '@/features/categories/hooks/useCategories';

import type {
    CreatePartyRequest,
    PartyFormValues,
    UpdatePartyRequest,
} from '@user/types/party.types';

import {
    emptyPartyFormValues,
    formValuesToPartyRequest,
} from '@user/mappers/party-form.mapper';

const EMPTY_SERVER_ERRORS: Record<string, string> = {};

interface Props {
    mode: 'create' | 'edit' | 'view';

    initialValues?: Partial<PartyFormValues>;

    onSubmit?(values: CreatePartyRequest | UpdatePartyRequest): void;

    loading?: boolean;

    error?: boolean;

    disabled?: boolean;

    actionButton?: React.ReactNode;

    beforeActions?: React.ReactNode;

    showPublication?: boolean;

    serverErrors?: Record<string, string>;
}

export default function PartyFormLayout({
    mode,
    initialValues = {},
    onSubmit,
    loading = false,
    disabled = false,
    actionButton,
    beforeActions,
    showPublication = false,
    serverErrors = EMPTY_SERVER_ERRORS,
}: Props) {
    const { t } = useTranslation('user');

    const { data: categories = [] } = useCategories();

    const categoryOptions = useMemo(
        () =>
            categories.map((category) => ({
                label: category.name,
                value: category.id,
            })),
        [categories],
    );

    const sections = useMemo(
        () => createPartyForm(categoryOptions, t, showPublication),
        [categoryOptions, showPublication, t],
    );

    const [values, setValues] = useState<PartyFormValues>({
        ...emptyPartyFormValues,
        ...initialValues,
    });

    const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

    const [backendErrors, setBackendErrors] = useState<Record<string, string>>(serverErrors);

    const [validationAttempt, setValidationAttempt] = useState(0);

    const hasSubmittedRef = useRef(false);

    const isDisabled = mode === 'view' || disabled;

    const errors = useMemo(
        () => ({
            ...validationErrors,
            ...backendErrors,
        }),
        [validationErrors, backendErrors],
    );

    function validateCurrentValues(nextValues: Partial<PartyFormValues>) {
        return validateForm(nextValues, sections);
    }

    function clearBackendErrorsForField(fieldName: string) {
        setBackendErrors((current) =>
            Object.entries(current).reduce<Record<string, string>>(
                (result, [errorPath, message]) => {
                    const belongsToField =
                        errorPath === fieldName || errorPath.startsWith(`${fieldName}.`);

                    if (!belongsToField) {
                        result[errorPath] = message;
                    }

                    return result;
                },
                {},
            ),
        );
    }

    function update(name: string, value: unknown) {
        clearBackendErrorsForField(name);

        setValues((current) => {
            const nextValues = {
                ...current,
                [name]: value,
            };

            if (hasSubmittedRef.current) {
                setValidationErrors(validateCurrentValues(nextValues));
            }

            return nextValues;
        });
    }

    function submit() {
        if (!onSubmit || mode === 'view') {
            return;
        }

        hasSubmittedRef.current = true;

        if (document.querySelector('.media-upload[data-uploading="true"]')) {
            setValidationErrors({ _media: t('party.validation.waitForUploads') });
            return;
        }

        const currentValidationErrors = validateCurrentValues(values);

        setValidationErrors(currentValidationErrors);

        if (Object.keys(currentValidationErrors).length > 0) {
            setValidationAttempt((current) => current + 1);

            window.setTimeout(() => {
                scrollToFirstError(currentValidationErrors);
            }, 100);

            return;
        }

        setValidationErrors({});

        onSubmit(formValuesToPartyRequest(values, mode === 'edit' ? 'edit' : 'create'));
    }

    useEffect(() => {
        setBackendErrors((current) => {
            const currentEntries = Object.entries(current);
            const serverEntries = Object.entries(serverErrors);
            const unchanged =
                currentEntries.length === serverEntries.length &&
                serverEntries.every(([path, message]) => current[path] === message);

            return unchanged ? current : serverErrors;
        });

        if (Object.keys(serverErrors).length === 0) {
            return;
        }

        hasSubmittedRef.current = true;

        setValidationAttempt((current) => current + 1);

        const timeout = window.setTimeout(() => {
            scrollToFirstError(serverErrors);
        }, 100);

        return () => {
            window.clearTimeout(timeout);
        };
    }, [serverErrors]);

    useEffect(() => {
        const dirty = JSON.stringify(values) !== JSON.stringify({
            ...emptyPartyFormValues,
            ...initialValues,
        });
        if (!dirty || mode === 'view') return;
        const warn = (event: BeforeUnloadEvent) => {
            event.preventDefault();
            event.returnValue = '';
        };
        window.addEventListener('beforeunload', warn);
        return () => window.removeEventListener('beforeunload', warn);
    }, [values, initialValues, mode]);

    return (
        <Form
            key={mode}
            title={t(`party.${mode}.title`)}
            sections={sections}
            values={values}
            onChange={update}
            onSubmit={isDisabled ? undefined : submit}
            disabled={isDisabled}
            submitLabel={loading ? t(`party.${mode}.saving`) : t(`party.${mode}.submit`)}
            actionButton={actionButton}
            beforeActions={beforeActions}
            errors={errors}
            validationAttempt={validationAttempt}
        />
    );
}
