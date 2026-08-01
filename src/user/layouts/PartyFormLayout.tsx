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

import buildDateTime from '@/helper/build-datetime';

interface Props {
    mode: 'create' | 'edit' | 'view';

    initialValues?: Partial<PartyFormValues>;

    onSubmit?(values: CreatePartyRequest | UpdatePartyRequest): void;

    loading?: boolean;

    error?: boolean;

    disabled?: boolean;

    actionButton?: React.ReactNode;

    serverErrors?: Record<string, string>;
}

export default function PartyFormLayout({
    mode,
    initialValues = {},
    onSubmit,
    loading = false,
    disabled = false,
    actionButton,
    serverErrors = {},
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

    const sections = useMemo(() => createPartyForm(categoryOptions, t), [categoryOptions, t]);

    const [values, setValues] = useState<Partial<PartyFormValues>>(initialValues);

    const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

    const [backendErrors, setBackendErrors] = useState<Record<string, string>>(serverErrors);

    const [validationAttempt, setValidationAttempt] = useState(0);

    const hasSubmittedRef = useRef(false);

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

        const { categoryIds, startDate, startTime, endDate, endTime, ticketCategories, ...rest } =
            values;

        const timezone = values.location?.timezone;

        const payload = {
            ...rest,

            startAt: buildDateTime(startDate!, startTime!, timezone!),

            endAt: buildDateTime(endDate!, endTime!, timezone!),

            categories: categoryIds ?? [],

            ticketCategories: (ticketCategories ?? []).map((category) => ({
                ...category,

                accessWindows: (category.accessWindows ?? []).map((window) => ({
                    id: window.id,

                    startsAt: buildDateTime(window.startDate, window.startTime, timezone!),

                    endsAt: buildDateTime(window.endDate, window.endTime, timezone!),
                })),
            })),
        } as CreatePartyRequest | UpdatePartyRequest;

        onSubmit(payload);
    }

    useEffect(() => {
        setBackendErrors(serverErrors);

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

    return (
        <Form
            title={t(`party.${mode}.title`)}
            sections={sections}
            values={values}
            onChange={update}
            onSubmit={disabled ? undefined : submit}
            disabled={disabled}
            submitLabel={loading ? t(`party.${mode}.saving`) : t(`party.${mode}.submit`)}
            actionButton={actionButton}
            errors={errors}
            validationAttempt={validationAttempt}
        />
    );
}
