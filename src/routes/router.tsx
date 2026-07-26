import { createBrowserRouter } from 'react-router-dom';

import { ROUTES } from './paths';

import RegisterPage from '@auth/pages/RegisterPage';
import VerifyEmailPage from '@auth/pages/VerifyEmailPage';
import CompleteProfilePage from '@user/pages/CompleteProfilePage';

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
        path: ROUTES.COMPLETE_PROFILE,
        element: <CompleteProfilePage />,
    },
]);
