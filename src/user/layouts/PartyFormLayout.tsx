import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import Form from '@components/forms/entity/Form';

import { createPartyForm } from '../constants/forms/create.party.forms';

import { useCategories } from '@/features/categories/hooks/useCategories';

import type {
    CreatePartyRequest,
    PartyFormValues,
    UpdatePartyRequest,
} from '@user/types/party.types';

import buildDateTime from '@/helper/build-datetime';

import validateForm from '@components/forms/entity/validateForm';

interface Props {
    mode: 'create' | 'edit' | 'view';

    initialValues?: Partial<PartyFormValues>;

    onSubmit?(values: CreatePartyRequest | UpdatePartyRequest): void;

    loading?: boolean;

    error?: boolean;

    disabled?: boolean;

    actionButton?: React.ReactNode;
}

export default function PartyFormLayout({
    mode,
    initialValues = {},
    onSubmit,
    loading = false,
    error = false,
    disabled = false,
    actionButton,
}: Props) {
    const { t } = useTranslation('user');

    const { data: categories = [], isLoading: categoriesLoading } = useCategories();

    const [values, setValues] = useState<Partial<PartyFormValues>>(initialValues);

    const [errors, setErrors] = useState<Record<string, string>>({});

    const [validationAttempt, setValidationAttempt] = useState(0);

    function update(name: string, value: unknown) {
        setValues((current) => ({
            ...current,
            [name]: value,
        }));
    }

    function submit() {
        if (!onSubmit || mode === 'view') {
            return;
        }

        const validationErrors = validateForm(values, sections);

        setErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) {
            setValidationAttempt((current) => current + 1);
            return;
        }

        const { categoryIds, startDate, startTime, endDate, endTime, ticketCategories, ...rest } =
            values;

        const timezone = values.location?.timezone;

        onSubmit({
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
        } as CreatePartyRequest | UpdatePartyRequest);
    }

    const categoryOptions = useMemo(
        () =>
            categories.map((category) => ({
                label: category.name,
                value: category.id,
            })),
        [categories],
    );

    const sections = useMemo(() => createPartyForm(categoryOptions, t), [categoryOptions, t]);

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
