import {
    useState
} from "react";


import SecurityLayout from "@layouts/SecurityLayout";
import FormInput from "@components/forms/FormInput";
import "@styles/forms/security-form.scss";


export default function RegisterForm() {


    const [form,setForm] = useState({

        username:"",
        email:"",
        password:"",
        passwordConfirm:"",

    });



    function update(
        key:keyof typeof form,
        value:string
    ){

        setForm({

            ...form,

            [key]:value,

        });

    }



    function submit(
        e:React.FormEvent
    ){

        e.preventDefault();


        console.log(form);

    }



    return (

        <SecurityLayout>


            <form
                className="security-form"
                onSubmit={submit}
            >


                <FormInput

                    label="Username"

                    value={form.username}

                    placeholder="Your username"

                    onChange={
                        e=>update(
                            "username",
                            e.target.value
                        )
                    }

                />


                <FormInput

                    label="Email"

                    type="email"

                    value={form.email}

                    placeholder="you@example.com"

                    onChange={
                        e=>update(
                            "email",
                            e.target.value
                        )
                    }

                />


                <FormInput

                    label="Password"

                    type="password"

                    value={form.password}

                    onChange={
                        e=>update(
                            "password",
                            e.target.value
                        )
                    }

                />


                <FormInput

                    label="Confirm password"

                    type="password"

                    value={form.passwordConfirm}

                    onChange={
                        e=>update(
                            "passwordConfirm",
                            e.target.value
                        )
                    }

                />


                <button type="submit">

                    Create account

                </button>


            </form>


        </SecurityLayout>

    );
}