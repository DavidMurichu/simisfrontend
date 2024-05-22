import { useState } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import {Link, useNavigate} from 'react-router-dom';
import {toast} from "react-toastify";
import Account from "../../../services/account";

function AddUser() {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        name: '',
        fullname: '',
        email: '',
        department: '',
        phone: '',
        role_id: 1,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { surname, fullname, username, email, role } = userData;
        try {
            const admin_id = sessionStorage.getItem("id");
            const response = await Account.addUserByAdminId(admin_id,userData);
            if (response.status === 200){
                toast.success("Added user successfully");
                navigate("/administration/user-management")
            }else{
                toast.warning("Error, Try again");
            }
        }catch (error){
            console.log("Error adding new user", error)
        }
    };
    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Typography variant="h3">Create User</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    fullWidth
                    label="Surname"
                    name="name"
                    value={userData.name}
                    onChange={handleChange}
                    required
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    fullWidth
                    label="Full Names"
                    name="fullname"
                    value={userData.fullname}
                    onChange={handleChange}
                    required
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    value={userData.email}
                    onChange={handleChange}
                    required
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    fullWidth
                    label="Department"
                    name="department"
                    value={userData.department}
                    onChange={handleChange}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    fullWidth
                    label="Phone"
                    name="phone"
                    value={userData.phone}
                    onChange={handleChange}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    fullWidth
                    select
                    label="Role"
                    name="role_id"
                    value={userData.role_id}
                    onChange={handleChange}
                    required
                >
                    <MenuItem value={1}>Administrator</MenuItem>
                    <MenuItem value={2}>Sacco Management Committee</MenuItem>
                    <MenuItem value={3}>Treasurer</MenuItem>
                    <MenuItem value={4}>Members</MenuItem>
                    <MenuItem value={5}>Normal User</MenuItem>
                </TextField>
            </Grid>
            <Grid item xs={12}>
                <Button variant="contained" color="primary" onClick={handleSubmit}>Submit</Button>
                <Button variant="contained" color="secondary" component={Link} to="/administration/user-management" sx={{ ml: 2 }}>Cancel</Button>
            </Grid>
        </Grid>
    );
}

export default AddUser;
