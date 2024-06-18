import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import SubjectsService from "../../../../services/SubjectService";

function AddSubject() {
    const navigate = useNavigate();
    const [subjectData, setSubjectData] = useState({
        name: '',
        subject_code: '',
        description: '',
        createdby: sessionStorage.getItem("id"),
        lasteditedby: sessionStorage.getItem("id"),
        createdOn: '',
        is_active: true,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSubjectData({ ...subjectData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await SubjectsService.addSubject(subjectData);
            if (response.status === 201) {
                toast.success("Added subject successfully");
                navigate("/subjects")
            } else {
                toast.warning("Error, Try again");
            }
        } catch (err) {
            if (err.data) {
                const errorMessage = err.data[0].message;
                console.log("Error from response", err.data, errorMessage);
                toast.warning("Try again: " + errorMessage);
            } else if (err.message) {
                toast.error(err.message);
            } else {
                toast.error("An unexpected error occurred. Please try again.");
            }
        }
    };

    return (
        <Grid container spacing={3} style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}>
            <Grid item xs={12}>
                <Typography variant="h3">Create Subject</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    fullWidth
                    label="Subject Name"
                    name="name"
                    value={subjectData.name}
                    onChange={handleChange}
                    required
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    fullWidth
                    label="Subject Code"
                    name="subject_code"
                    value={subjectData.subject_code}
                    onChange={handleChange}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    fullWidth
                    label="Description"
                    name="description"
                    value={subjectData.description}
                    onChange={handleChange}
                />
            </Grid>

            <Grid item xs={12}>
                <Button variant="contained" color="primary" onClick={handleSubmit}>Submit</Button>
                <Button variant="contained" color="secondary" component={Link} to="/subjects" sx={{ ml: 2 }}>Cancel</Button>
            </Grid>
        </Grid>
    );
}

export default AddSubject;
