// Import necessary dependencies
import React from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Link from '@mui/material/Link';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import FormHelperText from '@mui/material/FormHelperText';
import LinearProgress from '@mui/material/LinearProgress';
import EyeOutlined from '@ant-design/icons/EyeOutlined';
import EyeInvisibleOutlined from '@ant-design/icons/EyeInvisibleOutlined';
import AnimateButton from 'components/@extended/AnimateButton';
import { useAuth } from "../../../contexts/AuthContext";
import Account from "../../../services/account";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as Yup from "yup";
import { Link as RouterLink, useNavigate } from 'react-router-dom';


const AuthLogin = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const { setIsLoggedIn, setUserName } = useAuth();
    // const getCsrfToken = async () => {
    //     try {
    //         const response = await Account.getCsrfToken();
    //         return response.data.token;
    //     } catch (error) {
    //         console.error("Error fetching CSRF token:", error);
    //         throw error;
    //     }
    // };

    const handleLogin = async (values) => {
        try {
            setLoading(true);
            // const csrfToken = await getCsrfToken();
            const response = await Account.login(values.email, values.password);
            if (response.status === 200) {
                toast.success("successfully logged in " + response.message);
                setTimeout(async () => {
                    setUserName(sessionStorage.getItem("username"));
                    setIsLoggedIn(true);
                    if (response.active === 1){
                        navigate("/");
                    }else {
                    navigate("/2FA");
                    }
                }, 4000);
            } else {
                toast.warning("Invalid email or password" + response.error);
            }
        } catch (error) {
            toast.error("Error logging in", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Formik
            initialValues={{
                email: '',
                password: ''
            }}
            validationSchema={Yup.object().shape({
                email: Yup.string().email('Invalid email address').required('Email is required'),
                password: Yup.string().required('Password is required')
            })}
            onSubmit={(values, { setSubmitting }) => {
                handleLogin(values);
                setSubmitting(false);
            }}
        >
            {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                <form noValidate onSubmit={handleSubmit}>
                    <ToastContainer />
                    {loading && <LinearProgress />}
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Stack spacing={1}>
                                <InputLabel htmlFor="email-login">Email Address</InputLabel>
                                <OutlinedInput
                                    id="email-login"
                                    type="email"
                                    value={values.email}
                                    name="email"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    placeholder="Enter email address"
                                    fullWidth
                                    error={Boolean(touched.email && errors.email)}
                                />
                            </Stack>
                            {touched.email && errors.email && (
                                <FormHelperText error id="standard-weight-helper-text-email-login">
                                    {errors.email}
                                </FormHelperText>
                            )}
                        </Grid>
                        <Grid item xs={12}>
                            <Stack spacing={1}>
                                <InputLabel htmlFor="password-login">Password</InputLabel>
                                <OutlinedInput
                                    fullWidth
                                    error={Boolean(touched.password && errors.password)}
                                    id="password-login"
                                    type={showPassword ? 'text' : 'password'}
                                    value={values.password}
                                    name="password"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                                color="secondary"
                                            >
                                                {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    placeholder="Enter password"
                                />
                            </Stack>
                            {touched.password && errors.password && (
                                <FormHelperText error id="standard-weight-helper-text-password-login">
                                    {errors.password}
                                </FormHelperText>
                            )}
                        </Grid>
                        <Grid item xs={12} sx={{ mt: -1 }}>
                            <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                                <Link variant="h6" component={RouterLink} to="/forgot-password" color="text.primary">
                                    Forgot Password?
                                </Link>
                            </Stack>
                        </Grid>
                        {errors.submit && (
                            <Grid item xs={12}>
                                <FormHelperText error>{errors.submit}</FormHelperText>
                            </Grid>
                        )}
                        <Grid item xs={12}>
                            <AnimateButton>
                                <Button disableElevation disabled={isSubmitting || loading} fullWidth size="large" type="submit" variant="contained" color="primary">
                                    Login
                                </Button>
                            </AnimateButton>
                        </Grid>
                    </Grid>
                </form>
            )}
        </Formik>
    );
};

AuthLogin.propTypes = {
    isDemo: PropTypes.bool
};

export default AuthLogin;
