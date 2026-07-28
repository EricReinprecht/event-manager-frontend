import { useNavigate } from 'react-router-dom';

import { removeToken } from '@auth/storage/token.storage';
import { ROUTES } from '@routes/paths';

export function useLogout() {
    const navigate = useNavigate();

    function logout() {
        removeToken();

        navigate(ROUTES.LOGIN, {
            replace: true,
        });
    }

    return logout;
}
