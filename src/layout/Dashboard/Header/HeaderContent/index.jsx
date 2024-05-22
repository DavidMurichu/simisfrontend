import React, {useEffect} from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Search from './Search';
import Notification from './Notification';
import LoginButton from './LoginButton';
import {useAuth} from "../../../../contexts/AuthContext";
import Profile from "./Profile";
import MobileSection from "./MobileSection";

export default function HeaderContent() {
    const downLG = useMediaQuery((theme) => theme.breakpoints.down('lg'));
    const { isLoggedIn ,setIsLoggedIn, setUserName} = useAuth();
    useEffect(() => {
        const token = sessionStorage.getItem("token");
        if (token) {
            setIsLoggedIn(true);
            setUserName(sessionStorage.getItem("username"));
        } else {
            setIsLoggedIn(false);
            setUserName(null);
        }
    }, [setIsLoggedIn, setUserName]);
    return (
        <>
            {!downLG && <Search />}
            {downLG && <Box sx={{ width: '100%', ml: 1 }} />}
            {isLoggedIn ? (
                <>  <Notification />
                    {!downLG && <Profile />}
                    {downLG && <MobileSection />}
                </>
            ) : (
                <LoginButton />
            )}
        </>
    );
}