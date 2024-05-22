import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState('');
    const [role, setRole] = useState('');
    const [isVerified, setIsVerified] = useState(false);

    const login = () => {
        setIsLoggedIn(true);
    };

    const logout = () => {
        setIsLoggedIn(false);
        setUserName('');
    };

    return (
        <AuthContext.Provider value={{ setIsLoggedIn,isLoggedIn, login, logout, userName, setUserName, role, setRole, isVerified,setIsVerified }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
