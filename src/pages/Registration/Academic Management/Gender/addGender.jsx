import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { toast } from 'react-toastify';
import GenderService from '../../../../services/pupilservice'
import {useNavigate} from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
function AddGender() {
    const navigate = useNavigate();
    const [genderData, setGenderData] = useState({
        name: '',
        description: '',
        is_active: true,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setGenderData({
            ...genderData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await GenderService.addGender(genderData);
            if (response){
                toast.success('Gender added successfully');
                navigate("/gender");
            }else{
                toast.warning("Could not add gender")
            }
        } catch (error) {
            console.error('Error adding gender:', error);
            toast.error('Failed to add gender');
        }
    };

    return (
        <Grid container spacing={3} style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}>
            <Grid item xs={12}>
                <Typography variant="h3">Add Gender</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    fullWidth
                    label="Gender Name"
                    name="name"
                    value={genderData.name}
                    onChange={handleChange}
                    required
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    fullWidth
                    label="Description"
                    name="description"
                    value={genderData.description}
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
                    name="isActive"
                    value={genderData.is_active}
                    onChange={handleChange}
                >
                    <MenuItem value={true}>Active</MenuItem>
                    <MenuItem value={false}>Inactive</MenuItem>
                </TextField>
            </Grid>
            <Grid item xs={12}>
                <Button variant="contained" color="primary" onClick={handleSubmit}>Submit</Button>
                <Button variant="contained" color="secondary" onClick={() => navigate("/gender")} sx={{ ml: 2 }}>Cancel</Button>
            </Grid>
        </Grid>
    );
}

export default AddGender;
