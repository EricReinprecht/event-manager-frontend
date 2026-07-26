export interface User {
    id: string;
    email: string;
    username?: string;
}

export interface AuthResponse {
    token: string;
    refreshToken?: string;
    user: User;
}

export interface RegisterRequest {
    username: string;
    email: string;
    password: string;
    passwordConfirm: string;
}
