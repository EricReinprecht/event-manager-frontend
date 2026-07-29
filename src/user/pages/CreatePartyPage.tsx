import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Form from '@components/forms/entity/Form';

import { createPartyForm } from '@user/constants/forms/createParty.constants.forms';

import { useCreateParty } from '@user/hooks/useUserCreateParty';

import type { CreatePartyRequest } from '@user/api/user-create-party.api';

import { useCategories } from '@/features/categories/hooks/useCategories';

export default function UserCreatePartyPage() {
    const navigate = useNavigate();

    const createPartyMutation = useCreateParty();

    const { data: categories = [], isLoading: categoriesLoading } = useCategories();

    const [values, setValues] = useState<Partial<CreatePartyRequest>>({});

    function update(name: string, value: any) {
        setValues({
            ...values,

            [name]: value,
        });
    }

    function submit() {
        createPartyMutation.mutate(values as CreatePartyRequest, {
            onSuccess(party) {
                navigate(`/parties/${party.id}`);
            },
        });
    }

    if (categoriesLoading) {
        return (
            <div className="base-form">
                <div className="base-form__container">Loading categories...</div>
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
                <h1>Create Party</h1>

                <Form
                    sections={createPartyForm(categoryOptions)}
                    values={values}
                    onChange={update}
                    onSubmit={submit}
                    submitLabel={createPartyMutation.isPending ? 'Creating...' : 'Create Party'}
                />

                {createPartyMutation.isError && (
                    <p className="form-error">Failed to create party.</p>
                )}
            </div>
        </div>
    );
}
