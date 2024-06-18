import React, {useEffect} from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Search from './Search';
import Notification from './Notification';
import LoginButton from './LoginButton';
import {useAuth} from "../../../../contexts/AuthContext";
import Profile from "./Profile";
import MobileSection from "./MobileSection";
import Darkmodetoggle from "../../../../utils/dark mode/darkmodetoggle";

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
            {!downLG && <Search style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}/>}
            {downLG && <Box sx={{ width: '100%', ml: 1 }} />}
            <Darkmodetoggle/>
            {isLoggedIn ? (
                <>  <Notification style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}/>
                    {!downLG && <Profile style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}/>}
                    {downLG && <MobileSection style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}/>}
                </>
            ) : (
                <LoginButton style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }} />
            )}
        </>
    );
}
