import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MainCard from 'components/MainCard';
import { Link } from "react-router-dom";

function ParentInfo() {
    const [parentName, setParentName] = useState('');
    const [mobile, setMobile] = useState('');
    const [secondaryMobile, setSecondaryMobile] = useState('');
    const [city, setCity] = useState('');
    const [town, setTown] = useState('');
    const [address, setAddress] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!parentName.trim() || !mobile.trim() || !city.trim() || !town.trim() || !address.trim()) {
            setError('All fields are required.');
            return;
        }
        // Add logic to save parent data
        console.log('New Parent Info:', {
            parentName,
            mobile,
            secondaryMobile,
            city,
            town,
            address,
        });
        clearForm();
        setSuccessMessage('Parent information added successfully!');
        setError('');
    };

    const clearForm = () => {
        setParentName('');
        setMobile('');
        setSecondaryMobile('');
        setCity('');
        setTown('');
        setAddress('');
    };

    return (
        <MainCard title="Parent Information" style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Parent's Name"
                            value={parentName}
                            onChange={(e) => setParentName(e.target.value)}
                            fullWidth
                            error={!!error && !parentName.trim()}
                            helperText={!!error && !parentName.trim() ? 'Parent\'s Name is required.' : ''}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Mobile"
                            value={mobile}
                            onChange={(e) => setMobile(e.target.value)}
                            fullWidth
                            error={!!error && !mobile.trim()}
                            helperText={!!error && !mobile.trim() ? 'Mobile is required.' : ''}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Secondary Mobile"
                            value={secondaryMobile}
                            onChange={(e) => setSecondaryMobile(e.target.value)}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="City"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            fullWidth
                            error={!!error && !city.trim()}
                            helperText={!!error && !city.trim() ? 'City is required.' : ''}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Town"
                            value={town}
                            onChange={(e) => setTown(e.target.value)}
                            fullWidth
                            error={!!error && !town.trim()}
                            helperText={!!error && !town.trim() ? 'Town is required.' : ''}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            fullWidth
                            error={!!error && !address.trim()}
                            helperText={!!error && !address.trim() ? 'Address is required.' : ''}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" color="primary">
                            Add Parent Info
                        </Button>
                        <Button variant="contained" color="secondary" component={Link} to="/registration/student-information" sx={{ ml: 2 }}>Cancel</Button>
                    </Grid>
                    {successMessage && (
                        <Grid item xs={12}>
                            <div style={{ color: 'green' }}>{successMessage}</div>
                        </Grid>
                    )}
                </Grid>
            </form>
        </MainCard>
    );
}

export default ParentInfo;
