import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import AcademicYearService from '../../../../../../services/calendarService';
import MenuItem from "@mui/material/MenuItem";

function AddCalendarYear() {
    const navigate = useNavigate();
    const [calendarYearData, setCalendarYearData] = useState({
        year: '',
        is_active: true,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setCalendarYearData({
            ...calendarYearData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await AcademicYearService.createCalendarYear(calendarYearData);
            console.log('Submitted Calendar Year Data:', response.data);
            toast.success('Calendar year added successfully');
            navigate('/calendar');
        } catch (error) {
            console.error('Error adding calendar year:', error);
            toast.error('Failed to add calendar year');
        }
    };

    return (
        <Grid container spacing={3} style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}>
            <Grid item xs={12}>
                <Typography variant="h3">Add Calendar Year</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    fullWidth
                    label="Year"
                    name="year"
                    value={calendarYearData.year}
                    onChange={handleChange}
                    required
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    fullWidth
                    select
                    label="Is Active"
                    name="is_active"
                    value={calendarYearData.is_active}
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

export default AddCalendarYear;
