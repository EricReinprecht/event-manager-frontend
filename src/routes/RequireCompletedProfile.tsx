import { Navigate, Outlet } from 'react-router-dom';

import { ROUTES } from '@routes/paths';
import { useCurrentUser } from '@/auth/hooks/useCurrentUser';

export default function RequireCompletedProfile() {
    const { data: user, isLoading } = useCurrentUser();

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (!user?.profile_completed) {
        return <Navigate to={ROUTES.COMPLETE_PROFILE} replace />;
    }

    return <Outlet />;
}
