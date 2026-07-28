import { createBrowserRouter } from 'react-router-dom';

import { ROUTES } from './paths';

import RegisterPage from '@auth/pages/RegisterPage';
import VerifyEmailPage from '@auth/pages/VerifyEmailPage';
import VerifyEmailPendingPage from '@auth/pages/VerifyEmailPendingPage';

import CompleteProfilePage from '@user/pages/CompleteProfilePage';

import ProtectedRoute from './ProtectedRoutes';
import RequireCompletedProfile from './RequireCompletedProfile';
import UserDashboardPage from '@user/pages/UserDashboardPage';
import LoginPage from '@auth/pages/LoginPage';
import ForgotPasswordPage from '@auth/pages/ForgotPasswordPage';
import ResetPasswordPage from '@auth/pages/ResetPasswordPage';

export const router = createBrowserRouter([
    {
        path: ROUTES.REGISTER,
        element: <RegisterPage />,
    },

    {
        path: ROUTES.LOGIN,
        element: <LoginPage />,
    },

    {
        path: ROUTES.FORGOT_PASSWORD,
        element: <ForgotPasswordPage />,
    },

    {
        path: ROUTES.RESET_PASSWORD,
        element: <ResetPasswordPage />,
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
        element: <ProtectedRoute />,
        children: [
            {
                children: [
                    // accessible after login, before profile completion
                    {
                        path: ROUTES.COMPLETE_PROFILE,
                        element: <CompleteProfilePage />,
                    },

                    {
                        path: ROUTES.USER_DASHBOARD,
                        element: <UserDashboardPage />,
                    },

                    // everything below requires completed profile
                    {
                        element: <RequireCompletedProfile />,
                        children: [
                            {
                                path: ROUTES.USER_PARTIES,
                                element: <div>Parties Page</div>,
                            },
                        ],
                    },
                ],
            },
        ],
    },
]);
