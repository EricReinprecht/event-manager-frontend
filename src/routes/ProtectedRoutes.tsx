import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { getToken } from '@auth/storage/token.storage';
import { ROUTES } from '@routes/paths';
import { useCurrentUser } from '@auth/hooks/useCurrentUser';

export default function ProtectedRoute() {
    const token = getToken();

    const location = useLocation();

    const { data: user, isLoading } = useCurrentUser();

    console.log('PROTECTED ROUTE');
    console.log('TOKEN:', token);
    console.log('USER:', user);
    console.log('LOADING:', isLoading);
    console.log('PATH:', location.pathname);

    if (!token) {
        console.log('NO TOKEN -> LOGIN');

        return <Navigate to={ROUTES.LOGIN} replace />;
    }

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (user && !user.profile_completed && location.pathname !== ROUTES.COMPLETE_PROFILE) {
        console.log('PROFILE INCOMPLETE -> REDIRECT');

        return <Navigate to={ROUTES.COMPLETE_PROFILE} replace />;
    }

    console.log('ALLOW');

    return <Outlet />;
}
