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
  element: <MinimalLayout style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }} />,
  children: [
    {
      path: '/login',
      element: <AuthLogin style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }} />
    },
    {
      path: '/2FA',
      element: <TwoFactorAuth style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }} />
    },
    {
      path: '/forgot-password',
      element: <ForgotPassword style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }} />
    },
    {
      path: '/register',
      element: <AuthRegister style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }} />
    },

  ]
};

export default LoginRoutes;
