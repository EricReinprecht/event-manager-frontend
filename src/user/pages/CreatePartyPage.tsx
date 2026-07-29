import { useState } from 'react';

import Form from '@components/forms/entity/Form';

import { CREATE_PARTY_FORM } from '@user/constants/forms/createParty.constants.forms';

export default function UserCreatePartyPage() {
    const [values, setValues] = useState({});

    function update(name: string, value: any) {
        setValues({
            ...values,
            [name]: value,
        });
    }

    function submit() {
        console.log(values);

        // call api here
    }

    return (
        <div className="base-form">
            <div className="base-form__container">
                <h1>Create Party</h1>

                <Form
                    sections={CREATE_PARTY_FORM}
                    values={values}
                    onChange={update}
                    onSubmit={submit}
                    submitLabel="Create Party"
                />
            </div>
        </div>
    );
}
