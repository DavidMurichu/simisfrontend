import React, { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';

// Project imports
import router from 'routes';
import ThemeCustomization from 'themes';
import ScrollTop from 'components/ScrollTop';
import { AuthProvider } from './contexts/AuthContext';
import { DarkModeProvider } from './utils/dark mode';
import useDarkMode from './utils/dark mode/darkmodehook';
import './utils/dark mode/style.css';

// ==============================|| APP - THEME, ROUTER, LOCAL ||============================== //

export default function App() {
    return (
        <DarkModeProvider style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }} >
            <AuthProvider style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }} >
                <MainApp style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}/>
            </AuthProvider>
        </DarkModeProvider>
    );
}

const MainApp = () => {
    const { isDarkMode } = useDarkMode();

    useEffect(() => {
        document.body.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
    }, [isDarkMode]);

    return (
        <ThemeCustomization>
            <ScrollTop>
                <RouterProvider router={router} />
            </ScrollTop>
        </ThemeCustomization>
    );
};
