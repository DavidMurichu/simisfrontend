import { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from "react-toastify";
import TeacherService from "../../../../services/TeacherService";

function EditPerson() {
    const navigate = useNavigate();
    const { id } = useParams();
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
        isActive: true,
    });

    const fetchPerson = async () => {
        try {
            const response = await TeacherService.getPersonById(id);
            setPersonData(response.data);
        } catch (error) {
            console.error('Error fetching person:', error);
        }
    };

    useEffect(() => {
        fetchPerson();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPersonData({ ...personData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await TeacherService.updatePerson(id, personData);
            if (response.status === 200) {
                toast.success("Updated person successfully");
                navigate("/person-management")
            } else {
                toast.warning("Error, Try again");
            }
        } catch (error) {
            console.log("Error updating person", error);
        }
    };

    return (
        <Grid container spacing={3} style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}>
            <Grid item xs={12}>
                <Typography variant="h3">Edit Teacher</Typography>
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
            <Grid item xs={12} sm={6}>
                <TextField
                    fullWidth
                    label="Created On"
                    name="createdon"
                    value={personData.createdon}
                    onChange={handleChange}
                    type="date"
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    fullWidth
                    select
                    label="Is Active"
                    name="isActive"
                    value={personData.isActive}
                    onChange={handleChange}
                >
                    <MenuItem value={true}>Active</MenuItem>
                    <MenuItem value={false}>Inactive</MenuItem>
                </TextField>
            </Grid>
            <Grid item xs={12}>
                <Button variant="contained" color="primary" onClick={handleSubmit}>Submit</Button>
                <Button variant="contained" color="secondary" component={Link} to="/teachers" sx={{ ml: 2 }}>Cancel</Button>
            </Grid>
        </Grid>
    );
}

export default EditPerson;
