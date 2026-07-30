import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import Form from '@components/forms/entity/Form';

import { createPartyForm } from '@user/constants/forms/createParty.constants.forms';

import { useCategories } from '@/features/categories/hooks/useCategories';

import type { CreatePartyRequest } from '@user/api/user-create-party.api';

interface Props {
    title: string;

    submitLabel: string;

    initialValues?: Partial<CreatePartyRequest>;

    onSubmit(values: CreatePartyRequest): void;

    loading?: boolean;

    error?: boolean;
}

export default function PartyFormLayout({
    title,
    submitLabel,
    initialValues = {},
    onSubmit,
    loading = false,
    error = false,
}: Props) {
    const { t } = useTranslation('user');

    const { data: categories = [], isLoading: categoriesLoading } = useCategories();

    const [values, setValues] = useState<Partial<CreatePartyRequest>>(initialValues);

    function update(name: string, value: any) {
        setValues((current) => ({
            ...current,
            [name]: value,
        }));
    }

    if (categoriesLoading) {
        return (
            <div className="base-form">
                <div className="base-form__container">{t('party.create.loadingCategories')}</div>
            </div>
        );
    }

    const categoryOptions = categories.map((category) => ({
        label: category.Name,
        value: category.ID,
    }));

    return (
        <div className="base-form">
            <div className="base-form__container">
                <h1>{title}</h1>

                <Form
                    sections={createPartyForm(categoryOptions, t)}
                    values={values}
                    onChange={update}
                    onSubmit={() => onSubmit(values as CreatePartyRequest)}
                    submitLabel={loading ? submitLabel : submitLabel}
                />

                {error && <p className="form-error">{t('party.error')}</p>}
            </div>
        </div>
    );
}
