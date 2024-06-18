import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import SchoolService from "../../../../../services/schoolservice";

function Addschoolserviceduration() {
    const navigate = useNavigate();
    const [schoolServiceData, setSchoolServiceData] = useState({
        name: '',
        description: '',
        createdby: sessionStorage.getItem("id"),
        lasteditedby: sessionStorage.getItem("id"),
        ipaddress: '',
        is_active: true,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSchoolServiceData({ ...schoolServiceData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await SchoolService.addSchoolService(schoolServiceData);
            if (response.status === 201) {
                toast.success("Added school service successfully");
                navigate("/school-services-durations");
            } else {
                toast.warning("Error, Try again");
            }
        } catch (error) {
            console.log("Error adding new school service", error);
        }
    };

    return (
        <div style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}>
            <Typography variant="h1">Add School Service</Typography>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Name"
                        name="name"
                        value={schoolServiceData.name}
                        onChange={handleChange}
                        required
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Description"
                        name="description"
                        value={schoolServiceData.description}
                        onChange={handleChange}
                    />
                </Grid>
                {/* You can add more fields here */}
                <Grid item xs={12}>
                    <Button variant="contained" color="primary" onClick={handleSubmit}>Submit</Button>
                    <Button variant="contained" color="secondary" component={Link} to="/school-services-durations" sx={{ ml: 2 }}>Cancel</Button>
                </Grid>
            </Grid>
        </div>
    );
}

export default Addschoolserviceduration;
