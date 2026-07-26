import { api } from "../api/axios";

import type {
    AuthResponse
} from "./auth.types";


export async function login(
    email: string,
    password: string
) {

    const response =
        await api.post<AuthResponse>(
            "/auth/login",
            {
                email,
                password,
            }
        );


    return response.data;
}