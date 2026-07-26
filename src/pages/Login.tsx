import {
    useState
} from "react";

import {
    login
} from "../auth/auth.api";

import {
    useAuthStore
} from "../auth/auth.store";


export default function Login() {

    const authLogin =
        useAuthStore(
            state => state.login
        );


    const [email,setEmail] =
        useState("");

    const [password,setPassword] =
        useState("");


    async function submit() {

        const data =
            await login(
                email,
                password
            );


        authLogin(
            data.token,
            data.user
        );

    }


    return (
        <div>

            <input
                value={email}
                onChange={
                    e => setEmail(e.target.value)
                }
                placeholder="Email"
            />


            <input
                value={password}
                onChange={
                    e => setPassword(e.target.value)
                }
                placeholder="Password"
                type="password"
            />


            <button onClick={submit}>
                Login
            </button>

        </div>
    );
}