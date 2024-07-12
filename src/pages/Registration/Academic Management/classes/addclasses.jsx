import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { ToastContainer, toast } from "react-toastify";
import ClassesService from "../../../../services/classesService";
import ApiService from 'services/apiservice';

function AddClasses() {
    const navigate = useNavigate();
    const [classData, setClassData] = useState({
        name: '',
        description: '',
        createdby: sessionStorage.getItem("id"),
        lasteditedby:sessionStorage.getItem("id"),
        is_active: true,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setClassData({ ...classData, [name]: value });
    };

    const handleCheckboxChange = (e) => {
        setClassData({ ...classData, is_active: e.target.checked });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const dataToSubmit = {
            ...classData,
            is_active: classData.is_active ? '1' : '0',
        };

        try {
            
            const response = await ApiService.post('home/add_data/sch_classes',dataToSubmit, true);
            if (response.status === 201) {
                toast.success("Added class successfully");
                navigate("/classes");
            } else {
                toast.warning("Error, try again");
            }
        } catch (error) {
            console.log("Error adding new class", error);
        }
    };

    return (
        <Grid container spacing={3} style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}>
            <Grid item xs={12}>
                <Typography variant="h3">Add Class</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    fullWidth
                    label="Name"
                    name="name"
                    value={classData.name}
                    onChange={handleChange}
                    required
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    fullWidth
                    label="Description"
                    name="description"
                    value={classData.description}
                    onChange={handleChange}
                    required
                />
            </Grid>
            <Grid item xs={12}>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={classData.is_active}
                            onChange={handleCheckboxChange}
                            name="isActive"
                            color="primary"
                        />
                    }
                    label="Active"
                />
            </Grid>
            <Grid item xs={12}>
                <Button variant="contained" color="primary" onClick={handleSubmit}>Submit</Button>
                <Button variant="contained" color="secondary" onClick={() => navigate("/classes")} sx={{ ml: 2 }}>Cancel</Button>
            </Grid>
            <ToastContainer />
        </Grid>
    );
}

export default AddClasses;
