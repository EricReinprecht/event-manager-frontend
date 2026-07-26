import RegisterPage from '@/auth/pages/RegisterPage';
import CompleteProfilePage from '@/user/pages/CompleteProfilePage';
import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <div>Home</div>,
    },
    {
        path: '/parties',
        element: <div>Parties</div>,
    },
    {
        path: '/dashboard',
        element: <div>Dashboard</div>,
    },
    {
        path: '/login',
        element: <div>Login</div>,
    },
    {
        path: '/register',
        element: <RegisterPage />,
    },
    {
        path: '/complete-profile',
        element: <CompleteProfilePage />,
    },
]);
