import { useState } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import TeacherService from "../../../../services/TeacherService";

function AddPerson() {
    const navigate = useNavigate();
    const [personData, setPersonData] = useState({
        name: '',
        surname: '',
        firstname: '',
        lastname: '',
        title: '',
        mobileno: '',
        email: '',
        physicaladdress: '',
        createdon: '',
        is_active: true,
    });

    const handleChange = (e) => {
        const { name, value, checked, type } = e.target;
        const newValue = type === 'checkbox' ? checked : value;
        setPersonData({ ...personData, [name]: newValue });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await TeacherService.addPerson(personData);
            if (response.status === 201) {
                toast.success("Added person successfully");
                navigate("/teachers")
            } else {
                toast.warning("Error, Try again");
            }
        } catch (error) {
            console.log("Error adding new person", error);
        }
    };

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Typography variant="h3">Create New Teacher</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    fullWidth
                    label="Name"
                    name="name"
                    value={personData.name}
                    onChange={handleChange}
                    required
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    fullWidth
                    label="Surname"
                    name="surname"
                    value={personData.surname}
                    onChange={handleChange}
                    required
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    fullWidth
                    label="First Name"
                    name="firstname"
                    value={personData.firstname}
                    onChange={handleChange}
                    required
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    fullWidth
                    label="Last Name"
                    name="lastname"
                    value={personData.lastname}
                    onChange={handleChange}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    fullWidth
                    label="Title"
                    name="title"
                    value={personData.title}
                    onChange={handleChange}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    fullWidth
                    label="Mobile No"
                    name="mobileno"
                    value={personData.mobileno}
                    onChange={handleChange}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    value={personData.email}
                    onChange={handleChange}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    fullWidth
                    label="Physical Address"
                    name="physicaladdress"
                    value={personData.physicaladdress}
                    onChange={handleChange}
                />
            </Grid>
            <Grid item xs={12}>
                <Checkbox
                    checked={personData.is_active}
                    onChange={handleChange}
                    name="is_active"
                    color="primary"
                />
                <Typography variant="body1">Active</Typography>
            </Grid>
            <Grid item xs={12}>
                <Button variant="contained" color="primary" onClick={handleSubmit}>Submit</Button>
                <Button variant="contained" color="secondary" component={Link} to="/teachers" sx={{ ml: 2 }}>Cancel</Button>
            </Grid>
        </Grid>
    );
}

export default AddPerson;
