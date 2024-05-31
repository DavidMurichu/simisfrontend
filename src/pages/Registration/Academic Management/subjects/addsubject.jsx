import { useState } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import SubjectsService from "../../../../services/SubjectService";

function AddSubject() {
    const navigate = useNavigate();
    const [subjectData, setSubjectData] = useState({
        name: '',
        subjectCode: '',
        description: '',
        createdOn: '',
        isActive: true,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSubjectData({ ...subjectData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await SubjectsService.addSubject(subjectData);
            if (response.status === 200) {
                toast.success("Added subject successfully");
                navigate("/subject-management")
            } else {
                toast.warning("Error, Try again");
            }
        } catch (error) {
            console.log("Error adding new subject", error);
        }
    };

    return (
        <Grid container spacing={3}>
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
                    name="subjectCode"
                    value={subjectData.subjectCode}
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
