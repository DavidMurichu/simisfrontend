import { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from "react-toastify";
import SubjectsService from "../../../../services/SubjectService";

function EditSubject() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [subjectData, setSubjectData] = useState({
        name: '',
        subjectCode: '',
        description: '',
        createdOn: '',
        isActive: true,
    });

    const fetchSubject = async () => {
        try {
            const response = await SubjectsService.getSubjectById(id);
            setSubjectData(response.data);
        } catch (error) {
            console.error('Error fetching subject:', error);
        }
    };

    useEffect(() => {
        fetchSubject();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSubjectData({ ...subjectData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await SubjectsService.updateSubject(id, subjectData);
            if (response.status === 200) {
                toast.success("Updated subject successfully");
                navigate("/subject-management")
            } else {
                toast.warning("Error, Try again");
            }
        } catch (error) {
            console.log("Error updating subject", error);
        }
    };

    return (
        <Grid container spacing={3} style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}>
            <Grid item xs={12}>
                <Typography variant="h3">Edit Subject</Typography>
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
                <TextField
                    fullWidth
                    label="Created On"
                    name="createdOn"
                    value={subjectData.createdOn}
                    onChange={handleChange}
                    type="date"
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    fullWidth
                    select
                    label="Is Active"
                    name="isActive"
                    value={subjectData.isActive}
                    onChange={handleChange}
                >
                    <MenuItem value={true}>Active</MenuItem>
                    <MenuItem value={false}>Inactive</MenuItem>
                </TextField>
            </Grid>
            <Grid item xs={12}>
                <Button variant="contained" color="primary" onClick={handleSubmit}>Submit</Button>
                <Button variant="contained" color="secondary" component={Link} to="/subjects" sx={{ ml: 2 }}>Cancel</Button>
            </Grid>
        </Grid>
    );
}

export default EditSubject;
