const KEY = 'refreshToken';

export function setRefreshToken(token: string) {
    localStorage.setItem(KEY, token);
}

export function getRefreshToken() {
    return localStorage.getItem(KEY);
}

export function removeRefreshToken() {
    localStorage.removeItem(KEY);
}
