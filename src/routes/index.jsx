import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainRoutes from './MainRoutes';
import LoginRoutes from './LoginRoutes';
import ErrorPage from 'pages/ErrorPage';

const router = createBrowserRouter(
    [
        {
            ...MainRoutes,
            errorElement: <ErrorPage />,
        },
        {
            ...LoginRoutes,
            errorElement: <ErrorPage />,
        },

    ],
    { basename: import.meta.env.VITE_APP_BASE_NAME }
);

export default router;
