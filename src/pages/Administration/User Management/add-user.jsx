import { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import MenuItem from '@mui/material/MenuItem';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import Account from "../../../services/account";

function AddUser() {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        view_all: 0,
        username: '',
        email: '',
        branch_id: 1,
    });
    const [branches, setBranches] = useState([]);

    useEffect(() => {
        const fetchBranches = async () => {
            try {
                const response = await Account.getAllBranches();
                setBranches(response.data);
            } catch (error) {
                console.error('Error fetching branches:', error);
                toast.error("Error fetching branches");
            }
        };
        fetchBranches();
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setUserData(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? (checked ? 1 : 0) : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const admin_id = sessionStorage.getItem("id");
            const { view_all, username, email, branch_id } = userData;
            const user = { view_all, username, email, branch_id };
            const requestData = { admin_id, user };
            const response = await Account.addUserByAdminId(requestData);
            if (response.status === 200) {
                toast.success("Added user successfully");
                navigate("/administration/user-management")
            } else {
                toast.warning("Error adding user");
            }
        } catch (error) {
            console.error("Error adding new user", error);
            toast.error("Error adding user");
        }
    };


    return (
        <Grid container spacing={3} style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}>
            <Grid item xs={12}>
                <Typography variant="h3">Create User</Typography>
            </Grid>
            <Grid item xs={12}>
                <TextField
                    fullWidth
                    label="Username"
                    name="username"
                    value={userData.username}
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
                <FormControlLabel
                    control={<Checkbox checked={userData.view_all === 1} onChange={handleChange} name="view_all" />}
                    label="View All"
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    fullWidth
                    select
                    label="Branch"
                    name="branch_id"
                    value={userData.branch_id}
                    onChange={handleChange}
                    required
                >
                    {branches.map(branch => (
                        <MenuItem key={branch.id} value={branch.id}>{branch.branch_name}</MenuItem>
                    ))}
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
