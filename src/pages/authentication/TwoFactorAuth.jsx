import { Link, useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import AuthWrapper from './AuthWrapper';
import axios from 'axios';
import Account from '../../services/account';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function TwoFactorAuth() {
    const navigate = useNavigate();
    const [verificationCode, setVerificationCode] = useState('');
    const [isVerifying, setIsVerifying] = useState(false);
    const inputRefs = useRef([]);

    useEffect(() => {
        if (verificationCode.length === 6) {
            verifyCode();
        }
    }, [verificationCode]);

    const verifyCode = async () => {
        setIsVerifying(true);
        try {
            const response = await Account.verify2FA({ verificationCode });
            setIsVerifying(false);
            console.log(response)
            if (response.status === 200) {
                toast.success("Verification successful. Redirecting...");
                setTimeout(() => {
                    navigate("/");
                }, 2000);
            } else {
                toast.error("Verification failed. Please try again.");
                setIsVerifying(false);
            }
        } catch (error) {
            toast.error("Error verifying code. Please try again.");
            setIsVerifying(false);
        }
    };

    const handleInputChange = (index, value) => {
        const newCode = verificationCode.split('');
        newCode[index] = value;
        setVerificationCode(newCode.join(''));
        if (value && index < inputRefs.current.length - 1) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace' && index > 0 && !verificationCode[index]) {
            inputRefs.current[index - 1].focus();
        }
    };

    const renderInputs = () => {
        const inputs = [];
        for (let i = 0; i < 6; i++) {
            inputs.push(
                <TextField
                    key={i}
                    inputRef={(el) => inputRefs.current[i] = el}
                    variant="outlined"
                    type="text"
                    inputProps={{ maxLength: 1 }}
                    value={verificationCode[i] || ''}
                    onChange={(e) => handleInputChange(i, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(e, i)}
                    style={{
                        width: 'calc(100% / 6)',
                        textAlign: 'center',
                        fontSize: '1.5rem',
                        fontWeight: verificationCode[i] ? 'bold' : 'normal',
                    }}
                />
            );
        }
        return inputs;
    };

    return (
        <AuthWrapper>
            <ToastContainer />
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Typography variant="h3">Two-Factor Authentication</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="body1">
                        Please enter the verification code sent to your email at {sessionStorage.getItem("tmp_email")}.
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Stack direction="row" spacing={1}>
                        {renderInputs()}
                    </Stack>
                </Grid>
                <Grid item xs={12}>
                    {isVerifying ? (
                        <CircularProgress />
                    ) : (
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                            <Link to="/login" style={{ textDecoration: 'none' }}>
                                <Typography variant="body1" color="primary">
                                    Back to Login
                                </Typography>
                            </Link>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={verifyCode}
                                disabled={verificationCode.length !== 6 || isVerifying}
                            >
                                Verify
                            </Button>
                        </Stack>
                    )}
                </Grid>
            </Grid>
        </AuthWrapper>
    );
}
