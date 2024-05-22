import React from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

const LoginButton = () => {
    const navigate = useNavigate();

    const handleLogin = () => {
        // Add your login logic here, e.g., open a modal, redirect to a login page
        navigate('/login'); // Assuming '/login' is the path to your login page
    };

    return (
        <Button
            variant="contained"
            color="primary"
            onClick={handleLogin}
            sx={{
                marginLeft: 2, // Adjust the spacing as needed
            }}
        >
            Login
        </Button>
    );
};

export default LoginButton;