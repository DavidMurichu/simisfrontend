import { Link } from 'react-router-dom';

// material-ui
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

// project import
import AuthWrapper from './AuthWrapper';

// ================================|| FORGOT PASSWORD ||================================ //

export default function ForgotPassword() {
    return (
        <AuthWrapper>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Typography variant="h3">Forgot Password</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="body1">
                        Please enter your email address. We will send you a link to reset your password.
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        id="email"
                        label="Email Address"
                        variant="outlined"
                    />
                </Grid>
                <Grid item xs={12}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Typography variant="body1" component={Link} to="/login" sx={{ textDecoration: 'none' }} color="primary">
                            Back to Login
                        </Typography>
                        <Button variant="contained" color="primary">
                            Reset Password
                        </Button>
                    </Stack>
                </Grid>
            </Grid>
        </AuthWrapper>
    );
}
