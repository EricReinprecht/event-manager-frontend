import { Navigate, Outlet } from 'react-router-dom';

import { getToken } from '@auth/storage/token.storage';
import { ROUTES } from '@routes/paths';

export default function ProtectedRoute() {
    const token = getToken();

    if (!token) {
        return <Navigate to={ROUTES.LOGIN} replace />;
    }

    return <Outlet />;
}
