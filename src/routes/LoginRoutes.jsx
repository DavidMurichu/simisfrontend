import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MinimalLayout from 'layout/MinimalLayout';
import TwoFactorAuth from "../pages/authentication/TwoFactorAuth";
import ForgotPassword from "../pages/authentication/forgotPassword";
import ViewUser from "../pages/Administration/User Management/view-user";
import EditUser from "../pages/Administration/User Management/edit-user";

// render - login
const AuthLogin = Loadable(lazy(() => import('pages/authentication/login')));
const AuthRegister = Loadable(lazy(() => import('pages/authentication/register')));

// ==============================|| AUTH ROUTING ||============================== //

const LoginRoutes = {
  path: '/',
  element: <MinimalLayout />,
  children: [
    {
      path: '/login',
      element: <AuthLogin />
    },
    {
      path: '/2FA',
      element: <TwoFactorAuth />
    },
    {
      path: '/forgot-password',
      element: <ForgotPassword/>
    },
    {
      path: '/register',
      element: <AuthRegister />
    },

  ]
};

export default LoginRoutes;
