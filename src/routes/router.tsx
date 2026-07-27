import { createBrowserRouter } from 'react-router-dom';

import { ROUTES } from './paths';

import RegisterPage from '@auth/pages/RegisterPage';
import VerifyEmailPage from '@auth/pages/VerifyEmailPage';
import CompleteProfilePage from '@user/pages/CompleteProfilePage';
import VerifyEmailPendingPage from '@/auth/pages/VerifyEmailPendingPage';

export const router = createBrowserRouter([
    {
        path: ROUTES.REGISTER,
        element: <RegisterPage />,
    },

    {
        path: ROUTES.VERIFY_EMAIL,
        element: <VerifyEmailPage />,
    },

    {
        path: ROUTES.VERIFY_EMAIL_SENT,
        element: <VerifyEmailPendingPage />,
    },

    {
        path: ROUTES.COMPLETE_PROFILE,
        element: <CompleteProfilePage />,
    },
]);
