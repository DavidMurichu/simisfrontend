import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import TermService from '../../../../../services/calendarService';

function AddTerm() {
    const navigate = useNavigate();
    const [termData, setTermData] = useState({
        name: '',
        description: '',
        is_active: true,
        active_term: true,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setTermData({
            ...termData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await TermService.createTerm(termData);
            console.log('Submitted Term Data:', response.data);
            toast.success('Term added successfully');
            navigate('/calendar');
        } catch (error) {
            console.error('Error adding term:', error);
            toast.error('Failed to add term');
        }
    };

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Typography variant="h3">Add Term</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    fullWidth
                    label="Term Name"
                    name="name"
                    value={termData.name}
                    onChange={handleChange}
                    required
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    fullWidth
                    label="Description"
                    name="description"
                    value={termData.description}
                    onChange={handleChange}
                    multiline
                    rows={4}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    fullWidth
                    select
                    label="Is Active"
                    name="is_active"
                    value={termData.is_active}
                    onChange={handleChange}
                >
                    <MenuItem value={true}>Active</MenuItem>
                    <MenuItem value={false}>Inactive</MenuItem>
                </TextField>
            </Grid>
            <Grid item xs={12}>
                <Button variant="contained" color="primary" onClick={handleSubmit}>Submit</Button>
                <Button variant="contained" color="secondary" component={Link} to="/calendar" sx={{ ml: 2 }}>Cancel</Button>
            </Grid>
        </Grid>
    );
}

export default AddTerm;
