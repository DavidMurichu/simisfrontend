import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import AcademicYearService from '../../../../../services/calendarService';
import MenuItem from "@mui/material/MenuItem";

function AddAcademicYear() {
    const navigate = useNavigate();
    const userId = sessionStorage.getItem("id");

    const [academicYearData, setAcademicYearData] = useState({
        name: '',
        description: '',
        startdate: '',
        enddate: '',
        createdby: userId,
        lasteditedby: userId,
        ipaddress: '',
        is_active: true,
        year: ''
    });

    const [calendarYears, setCalendarYears] = useState([]);

    useEffect(() => {
        fetchCalendarYears();
    }, []);

    const fetchCalendarYears = async () => {
        try {
            const response = await AcademicYearService.getAllCalendarYears();
            setCalendarYears(response.data);
        } catch (error) {
            console.error('Error fetching calendar years:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setAcademicYearData({
            ...academicYearData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await AcademicYearService.createAcademicYear(academicYearData);
            console.log('Submitted Academic Year Data:', response.data);
            toast.success('Academic year added successfully');
            navigate('/calendar');
        } catch (error) {
            console.error('Error adding academic year:', error);
            toast.error('Failed to add academic year');
        }
    };

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Typography variant="h3">Add Academic Year</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    fullWidth
                    label="Name"
                    name="name"
                    value={academicYearData.name}
                    onChange={handleChange}
                    required
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    fullWidth
                    label="Description"
                    name="description"
                    value={academicYearData.description}
                    onChange={handleChange}
                    required
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    fullWidth
                    label="Start Date"
                    name="startdate"
                    type="date"
                    value={academicYearData.startdate}
                    onChange={handleChange}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    required
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    fullWidth
                    label="End Date"
                    name="enddate"
                    type="date"
                    value={academicYearData.enddate}
                    onChange={handleChange}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    required
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    fullWidth
                    select
                    label="Is Active"
                    name="is_active"
                    value={academicYearData.is_active}
                    onChange={handleChange}
                >
                    <MenuItem value={true}>Active</MenuItem>
                    <MenuItem value={false}>Inactive</MenuItem>
                </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    fullWidth
                    select
                    label="Year"
                    name="year"
                    value={academicYearData.year}
                    onChange={handleChange}
                    required
                >
                    {calendarYears.map((year) => (
                        <MenuItem key={year.id} value={year.year}>
                            {year.year}
                        </MenuItem>
                    ))}
                </TextField>
            </Grid>
            <Grid item xs={12}>
                <Button variant="contained" color="primary" onClick={handleSubmit}>Submit</Button>
                <Button variant="contained" color="secondary" component={Link} to="/calendar" sx={{ ml: 2 }}>Cancel</Button>
            </Grid>
        </Grid>
    );
}

export default AddAcademicYear;
