import { Navigate, Outlet } from 'react-router-dom';
import { ROUTES } from './paths';
import { useMe } from '@user/hooks/useMe';

export default function RequireCompletedProfile() {
    const { data: user, isLoading } = useMe();

    console.log('CURRENT USER:', user);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return <Navigate to={ROUTES.LOGIN} replace />;
    }

    if (!user.profileCompleted) {
        return <Navigate to={ROUTES.COMPLETE_PROFILE} replace />;
    }

    return <Outlet />;
}
