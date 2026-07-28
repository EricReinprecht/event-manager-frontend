import { useNavigate } from 'react-router-dom';

import { removeToken } from '@auth/storage/token.storage';
import { removeRefreshToken } from '@auth/storage/refresh-token.storage';

import { logoutRequest } from '@auth/api/auth.api';

import { ROUTES } from '@routes/paths';

export function useLogout() {
    const navigate = useNavigate();

    async function logout() {
        try {
            await logoutRequest();
        } catch (error) {
            console.error('Logout request failed', error);
        } finally {
            removeToken();

            removeRefreshToken();

            navigate(ROUTES.LOGIN, {
                replace: true,
            });
        }
    }

    return logout;
}
