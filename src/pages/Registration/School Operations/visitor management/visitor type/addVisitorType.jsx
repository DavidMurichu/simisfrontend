import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import VisitorTypeService from '../../../../../services/visitortypeservice';

function AddVisitorType() {
    const navigate = useNavigate();
    const [visitorTypeData, setVisitorTypeData] = useState({
        name: '',
        description: '',
        createdby: sessionStorage.getItem('id'),
        lasteditedby: sessionStorage.getItem('id'),
        ipaddress: '',
        is_active: true,

    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setVisitorTypeData({ ...visitorTypeData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await VisitorTypeService.addVisitorType(visitorTypeData);
            if (response.status === 201) {
                toast.success('Added visitor type successfully');
                navigate('/visitor-type');
            } else {
                toast.warning('Error, Try again');
            }
        } catch (error) {
            console.error('Error adding new visitor type', error);
        }
    };

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Typography variant="h3">Add Visitor Type</Typography>
            </Grid>
            <Grid item xs={12}>
                <TextField
                    fullWidth
                    label="Name"
                    name="name"
                    value={visitorTypeData.name}
                    onChange={handleChange}
                    required
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    fullWidth
                    multiline
                    rows={4}
                    label="Description"
                    name="description"
                    value={visitorTypeData.description}
                    onChange={handleChange}
                />
            </Grid>

            <Grid item xs={12}>
                <Button variant="contained" color="primary" onClick={handleSubmit}>Submit</Button>
                <Button variant="contained" color="secondary" component={Link} to="/visitor-type" sx={{ ml: 2 }}>Cancel</Button>
            </Grid>
        </Grid>
    );
}

export default AddVisitorType;
