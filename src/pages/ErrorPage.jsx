import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { styled } from '@mui/system';

const StyledContainer = styled(Container)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    textAlign: 'center',
    padding: theme.spacing(4),
}));

const ErrorIcon = styled(ErrorOutlineIcon)(({ theme }) => ({
    fontSize: '8rem',
    color: theme.palette.error.main,
    marginBottom: theme.spacing(2),
}));

const ErrorMessagesBox = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${theme.palette.error.main}`,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(2),
    marginTop: theme.spacing(4),
    width: '100%',
    textAlign: 'left',
}));

const ErrorPage = () => {
    const [consoleMessages, setConsoleMessages] = useState([]);
    const [responseMessage, setResponseMessage] = useState('');
    const location = useLocation();

    useEffect(() => {
        // Mock fetching console messages and response message
        // This should be replaced with actual logic to fetch these details
        const fetchErrorDetails = async () => {
            const mockConsoleMessages = [
                'Error: Failed to fetch data',
                'Warning: Deprecated API call',
            ];
            const mockResponseMessage = location.state?.message || 'No additional error details available.';

            setConsoleMessages(mockConsoleMessages);
            setResponseMessage(mockResponseMessage);
        };

        fetchErrorDetails();
    }, [location.state]);

    return (
        <StyledContainer maxWidth="sm">
            <ErrorIcon />
            <Typography variant="h2" color="error" gutterBottom>
                Oops!
            </Typography>
            <Typography variant="h5" gutterBottom>
                Something went wrong
            </Typography>
            <Typography variant="body1" gutterBottom>
                The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </Typography>
            {responseMessage && (
                <ErrorMessagesBox>
                    <Typography variant="body1" color="error" gutterBottom>
                        Server Message: {responseMessage}
                    </Typography>
                </ErrorMessagesBox>
            )}
            {consoleMessages.length > 0 && (
                <ErrorMessagesBox>
                    <Typography variant="h6" color="error" gutterBottom>
                        Console Messages:
                    </Typography>
                    {consoleMessages.map((msg, index) => (
                        <Typography key={index} variant="body2" color="textSecondary">
                            {msg}
                        </Typography>
                    ))}
                </ErrorMessagesBox>
            )}
            <Box mt={4}>
                <Button
                    variant="contained"
                    color="primary"
                    component={Link}
                    to="/"
                    sx={{ mr: 2 }}
                >
                    Go to Home
                </Button>
                <Button
                    variant="outlined"
                    color="secondary"
                    component={Link}
                    to="/contact"
                >
                    Contact Support
                </Button>
            </Box>
        </StyledContainer>
    );
};

export default ErrorPage;
