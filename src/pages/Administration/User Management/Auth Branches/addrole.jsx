import { useState } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Link, useNavigate } from 'react-router-dom';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Account from "../../../../services/account";

function AddRole() {
    const navigate = useNavigate();
    const [roleData, setRoleData] = useState({
        branch_name: '',
        location: '',
        remarks: '',
        is_active: false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setRoleData({ ...roleData, [name]: type === 'checkbox' ? checked : value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const createdBy = sessionStorage.getItem("id") || 1;
            const rolePayload = {
                ...roleData,
                createdby: createdBy,
                lasteditedby: createdBy,
                is_active: roleData.is_active ? 1 : 0
            };

            const response = await Account.addRoleByAdminId(rolePayload);
            console.log("Sending to database",rolePayload);
            if (response.status === 201) {
                toast.success("Added role successfully");
                setTimeout(() => {
                    navigate("/user-management/auth-branches");
                }, 2000);
            } else {
                toast.warning(`Error adding role: ${response.data.message || "Unexpected error"}`);
            }
        } catch (error) {
            console.error("Error adding new role:", error);
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(`Error adding role: ${error.response.data.message}`);
            } else {
                toast.error("Error adding role to the database");
            }
        }
    };

    return (
        <div>
            <Breadcrumbs aria-label="breadcrumb">
                <Link to="/">Home</Link>
                <Link to="/user-management">User Management</Link>
                <Typography color="textPrimary">Add Role</Typography>
            </Breadcrumbs>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Typography variant="h3">Create Role</Typography>
                </Grid>
                <ToastContainer />
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label="Branch Name"
                        name="branch_name"
                        value={roleData.branch_name}
                        onChange={handleChange}
                        required
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label="Location"
                        name="location"
                        value={roleData.location}
                        onChange={handleChange}
                        required
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Remarks"
                        name="remarks"
                        value={roleData.remarks}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                name="is_active"
                                checked={roleData.is_active}
                                onChange={handleChange}
                            />
                        }
                        label="Is Active"
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" color="primary" onClick={handleSubmit}>Submit</Button>
                    <Button variant="contained" color="secondary" component={Link} to="/user-management/auth-branches" sx={{ ml: 2 }}>Cancel</Button>
                </Grid>
            </Grid>
        </div>
    );
}

export default AddRole;
