import { createBrowserRouter } from 'react-router-dom';

import { ROUTES } from './paths';

import RegisterPage from '@auth/pages/RegisterPage';
import VerifyEmailPage from '@auth/pages/VerifyEmailPage';
import VerifyEmailPendingPage from '@auth/pages/VerifyEmailPendingPage';

import CompleteProfilePage from '@user/pages/CompleteProfilePage';

import ProtectedRoute from './ProtectedRoutes';
import RequireCompletedProfile from './RequireCompletedProfile';
import DashboardPage from '@user/pages/DashboardPage';
import LoginPage from '@auth/pages/LoginPage';
import ForgotPasswordPage from '@auth/pages/ForgotPasswordPage';
import ResetPasswordPage from '@auth/pages/ResetPasswordPage';
import ResendVerificationPage from '@auth/pages/ResendVerificationPage';
import UserLayout from '@user/layouts/UserLayout';
import UserPartiesPage from '@user/pages/PartiesPage';
import UserCreatePartyPage from '@user/pages/CreatePartyPage';

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
        path: ROUTES.RESEND_VERIFICATION,
        element: <ResendVerificationPage />,
    },

    {
        path: ROUTES.VERIFY_EMAIL,
        element: <VerifyEmailPage />,
    },

    {
        path: ROUTES.VERIFY_EMAIL_SENT,
        element: <VerifyEmailPendingPage />,
    },

    // Protected
    {
        element: <ProtectedRoute />,
        children: [
            // Needs login only
            {
                path: ROUTES.COMPLETE_PROFILE,
                element: <CompleteProfilePage />,
            },

            // User Center
            {
                element: <RequireCompletedProfile />,
                children: [
                    {
                        element: <UserLayout />,
                        children: [
                            {
                                path: ROUTES.USER_DASHBOARD,
                                element: <DashboardPage />,
                            },

                            {
                                path: ROUTES.USER_PARTIES,
                                element: <UserPartiesPage />,
                            },

                            {
                                path: ROUTES.USER_PARTY_CREATE,
                                element: <UserCreatePartyPage />,
                            },

                            {
                                path: ROUTES.USER_TICKETS,
                                element: <div>Tickets Page</div>,
                            },

                            {
                                path: ROUTES.USER_PURCHASES,
                                element: <div>Purchases Page</div>,
                            },

                            {
                                path: ROUTES.USER_PROFILE,
                                element: <div>Profile Page</div>,
                            },
                        ],
                    },
                ],
            },
        ],
    },
]);
