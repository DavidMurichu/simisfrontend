import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { toast } from "react-toastify";
// import Account from "../../../services/account";

function EditClasses() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [classData, setClassData] = useState({
        name: '',
        description: '',
        createdOn: '',
        isActive: true,
    });

    useEffect(() => {
        const fetchClassData = async () => {
            try {
                // const response = await Account.getClassById(id); // Add a new method in Account to get class data by ID
                // if (response.status === 200) {
                //     setClassData(response.data);
                // } else {
                //     toast.warning("Error fetching class data");
                // }
            } catch (error) {
                console.log("Error fetching class data", error);
            }
        };

        fetchClassData();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setClassData({ ...classData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await Account.updateClass(id, classData); // Add a new method in Account to update class data
            if (response.status === 200) {
                toast.success("Updated class successfully");
                navigate("/classes");
            } else {
                toast.warning("Error, try again");
            }
        } catch (error) {
            console.log("Error updating class", error);
        }
    };

    return (
        <Grid container spacing={3} style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}>
            <Grid item xs={12}>
                <Typography variant="h3">Edit Class</Typography>
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
                <TextField
                    fullWidth
                    label="Created On"
                    name="createdOn"
                    value={classData.createdOn}
                    onChange={handleChange}
                    type="date"
                    required
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    fullWidth
                    select
                    label="Is Active"
                    name="isActive"
                    value={classData.isActive}
                    onChange={handleChange}
                    required
                >
                    <MenuItem value={true}>Active</MenuItem>
                    <MenuItem value={false}>Inactive</MenuItem>
                </TextField>
            </Grid>
            <Grid item xs={12}>
                <Button variant="contained" color="primary" onClick={handleSubmit}>Submit</Button>
                <Button variant="contained" color="secondary" onClick={() => navigate("/classes")} sx={{ ml: 2 }}>Cancel</Button>
            </Grid>
        </Grid>
    );
}

export default EditClasses;
