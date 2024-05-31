import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Link } from 'react-router-dom';
import { toast } from "react-toastify";
import Account from "../../../../services/account";

function EditRole() {
    const { roleId } = useParams();
    const navigate = useNavigate();
    const [roleData, setRoleData] = useState({
        branch_name: '',
        location: '',
        remarks: '',
        is_active: false,
    });

    useEffect(() => {
        const fetchRoleData = async () => {
            try {
                const response = await Account.getRoleById(roleId);
                if (response.status === 200) {
                    setRoleData(response.data);
                } else {
                    toast.warning("Error fetching role data, Try again");
                }
            } catch (error) {
                console.log("Error fetching role data", error);
            }
        };

        fetchRoleData();
    }, [roleId]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setRoleData({ ...roleData, [name]: type === 'checkbox' ? checked : value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const createdBy = sessionStorage.getItem("id");
            const response = await Account.updateRoleByAdminId(createdBy, roleId, roleData);
            if (response.status === 200) {
                toast.success("Updated role successfully");
                navigate("/administration/role-management");
            } else {
                toast.warning("Error, Try again");
            }
        } catch (error) {
            console.log("Error updating role", error);
        }
    };

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Typography variant="h3">Edit Role</Typography>
            </Grid>
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
    );
}

export default EditRole;
