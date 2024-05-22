import React from 'react';
import Typography from '@mui/material/Typography';
import MainCard from 'components/MainCard';
import { Box, Button } from '@mui/material';

function Xi9d() {
    return (
        <MainCard title="Xi9d">
            <Typography variant="body1" gutterBottom>
                Welcome to the Xi9d Developer Advertisement page. Here you can learn more about the person behind Xi9d.
            </Typography>

            <Box mt={2}>
                <Typography variant="h5" gutterBottom>
                    Meet the Developer
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Hi there! I'm Paul webo (tourist), the developer behind Xi9d. As a passionate programmer, I strive to create innovative solutions that push the boundaries of technology. With a background in computer, I bring a unique blend of expertise and creativity to every project.
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Feel free to connect with me on{' '}
                    <a href="https://linkedin.com/in/paul-webo-910886248" target="_blank" rel="noopener noreferrer">
                        LinkedIn
                    </a>{' '}
                    or check out my{' '}
                    <a href="https://github.com/xi9d" target="_blank" rel="noopener noreferrer">
                        GitHub
                    </a>{' '}
                    to explore more of my work.
                </Typography>
            </Box>

            <Box mt={4}>
                <Typography variant="h5" gutterBottom>
                    Get in Touch
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Have any questions or inquiries? Feel free to reach out to me via email at paulwebo38@gmail.com
                </Typography>
            </Box>
        </MainCard>
    );
}

export default Xi9d;
