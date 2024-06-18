import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import AcademicYearService from '../../../../../../services/calendarService';

function Addacademicyearterm() {
    const navigate = useNavigate();
    const [academicYears, setAcademicYears] = useState([]);
    const [terms, setTerms] = useState([]);
    const [termData, setTermData] = useState({
        academicyear: '',
        term: '',
        name: '',
        description: '',
        startdate: '',
        enddate: '',
        is_active: true,
    });

    useEffect(() => {
        fetchAcademicYears();
        fetchTerms();
    }, []);

    const fetchAcademicYears = async () => {
        try {
            const response = await AcademicYearService.getAllAcademicYears();
            setAcademicYears(response.data);
            console.log("The academic years selected", academicYears)
        } catch (error) {
            console.error('Error fetching academic years:', error);
        }
    };

    const fetchTerms = async () => {
        try {
            const response = await AcademicYearService.getAllTerms();
            const termsData = response.data;
            setTerms(termsData);
        } catch (error) {
            console.error('Error fetching terms:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setTermData({
            ...termData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const createdBy = sessionStorage.getItem("id");
        const ipAddress = '';
        const dataToSubmit = {
            ...termData,
            createdby: createdBy,
            lasteditedby: createdBy,
            ipaddress: ipAddress,
        };
        try {
            const response = await AcademicYearService.createAcademicYearTerm(dataToSubmit);
            if (response.status === 201){
                toast.success('Academic year term added successfully');
                navigate('/calendar');
            }else{
                toast.warning("Error adding academic year term");
            }

        } catch (error) {
            console.error('Error adding academic year term:', error);
            toast.error('Failed to add academic year term');
        }
    };

    return (
        <Grid container spacing={3} style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}>
            <Grid item xs={12}>
                <Typography variant="h3">Add Academic Year Term</Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
                <TextField
                    fullWidth
                    label="Name"
                    name="name"
                    value={termData.name}
                    onChange={handleChange}
                    required
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    fullWidth
                    label="Description"
                    name="description"
                    value={termData.description}
                    onChange={handleChange}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    fullWidth
                    select
                    label="Academic Year"
                    name="academicyear"
                    value={termData.academicyear}
                    onChange={handleChange}
                    required
                >
                    {academicYears.map((year) => (
                        <MenuItem key={year.id} value={year.name}>
                            {year.name}
                        </MenuItem>
                    ))}
                </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    fullWidth
                    select
                    label="Term"
                    name="term"
                    value={termData.term}
                    onChange={handleChange}
                    required
                >
                    {terms.map((term) => (
                        <MenuItem key={term.id} value={term.name}>
                            {term.name}
                        </MenuItem>
                    ))}
                </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    fullWidth
                    type="date"
                    label="Start Date"
                    name="startdate"
                    value={termData.startdate}
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
                    type="date"
                    label="End Date"
                    name="enddate"
                    value={termData.enddate}
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
                    value={termData.is_active}
                    onChange={handleChange}
                >
                    <MenuItem value={true}>Active</MenuItem>
                    <MenuItem value={false}>Inactive</MenuItem>
                </TextField>
            </Grid>
            <Grid item xs={12}>
                <Button variant="contained" color="primary" onClick={handleSubmit}>
                    Submit
                </Button>
                <Button
                    variant="contained"
                    color="secondary"
                    component={Link}
                    to="/calendar"
                    sx={{ ml: 2 }}
                >
                    Cancel
                </Button>
            </Grid>
        </Grid>
    );
}

export default Addacademicyearterm;
