import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainRoutes from './MainRoutes';
import LoginRoutes from './LoginRoutes';
import ErrorPage from 'pages/ErrorPage';

const router = createBrowserRouter(
    [
        {
            ...MainRoutes,
            errorElement: <ErrorPage style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }} />,
        },
        {
            ...LoginRoutes,
            errorElement: <ErrorPage style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }} />,
        },

    ],
    { basename: import.meta.env.VITE_APP_BASE_NAME }
);

export default router;
