import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import Form from '@components/forms/entity/Form';

import { createPartyForm } from '@user/constants/forms/createParty.constants.forms';

import { useCategories } from '@/features/categories/hooks/useCategories';

import type {
    CreatePartyRequest,
    PartyDetailed,
    PartyFormValues,
    UpdatePartyRequest,
} from '@user/types/party.types';

interface Props {
    mode: 'create' | 'edit' | 'view';

    initialValues?: Partial<PartyFormValues>;

    onSubmit?(values: CreatePartyRequest | UpdatePartyRequest): void;

    loading?: boolean;

    error?: boolean;

    disabled?: boolean;
}

export default function PartyFormLayout({
    mode,
    initialValues = {},
    onSubmit,
    loading = false,
    error = false,
    disabled = false,
}: Props) {
    const { t } = useTranslation('user');

    const { data: categories = [], isLoading: categoriesLoading } = useCategories();

    const [values, setValues] = useState<Partial<PartyFormValues>>(initialValues);

    function update(name: string, value: unknown) {
        setValues((current: Partial<PartyFormValues>) => ({
            ...current,
            [name]: value,
        }));
    }

    function submit() {
        if (!onSubmit || mode === 'view') {
            return;
        }

        const { categoryIds, ...rest } = values;

        onSubmit({
            ...rest,
            categories: categoryIds ?? [],
        } as CreatePartyRequest | UpdatePartyRequest);
    }

    if (categoriesLoading) {
        return (
            <div className="base-form">
                <div className="base-form__container">{t('party.create.loadingCategories')}</div>
            </div>
        );
    }

    const categoryOptions = categories.map((category) => ({
        label: category.name,
        value: category.id,
    }));

    return (
        <div className="base-form">
            <div className="base-form__container">
                <h1>
                    {mode === 'create'
                        ? t('party.create.title')
                        : mode === 'edit'
                          ? t('party.edit.title')
                          : t('party.view.title')}
                </h1>

                <Form
                    sections={createPartyForm(categoryOptions, t)}
                    values={values}
                    onChange={update}
                    onSubmit={disabled ? undefined : submit}
                    disabled={disabled}
                    submitLabel={loading ? t(`party.${mode}.saving`) : t(`party.${mode}.submit`)}
                />

                {error && !disabled && <p className="form-error">{t(`party.${mode}.error`)}</p>}
            </div>
        </div>
    );
}
