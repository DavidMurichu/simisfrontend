import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import VisitorService from '../../../../services/visitortypeservice';
import GenderService from '../../../../services/pupilservice';
import ClassesService from '../../../../services/classesService';
import VisitorTypeService from '../../../../services/visitortypeservice';

function AddVisitor() {
    const navigate = useNavigate();
    const [visitorData, setVisitorData] = useState({
        visitortype: '',
        name: '',
        mobile: '',
        gendername: '',
        date_visited: '',
        classid: '',
        visiting_reason: '',
        sms: '',
        createdby: sessionStorage.getItem('id'),
        lasteditedby: sessionStorage.getItem('id'),
        ipaddress: '',
        is_active: true,
    });

    const [genders, setGenders] = useState([]);
    const [classes, setClasses] = useState([]);
    const [visitorTypes, setVisitorTypes] = useState([]);

    useEffect(() => {
        const fetchGenders = async () => {
            try {
                const response = await GenderService.getAllSystemGenders();
                setGenders(response.data);
            } catch (error) {
                console.error('Error fetching genders:', error);
            }
        };

        const fetchVisitorTypes = async () => {
            try {
                const response = await VisitorTypeService.getAllVisitorTypes();
                setVisitorTypes(response.data);
            } catch (error) {
                console.error('Error fetching visitor types:', error);
            }
        };

        const fetchClasses = async () => {
            try {
                const response = await ClassesService.getAllClasses();
                setClasses(response.data);
            } catch (error) {
                console.error('Error fetching classes:', error);
            }
        };

        fetchGenders();
        fetchVisitorTypes();
        fetchClasses();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setVisitorData({ ...visitorData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await VisitorService.addVisitor(visitorData);
            if (response.status === 201) {
                toast.success("Added visitor successfully");
                navigate("/visitor");
            } else {
                toast.warning("Error, Try again");
            }
        } catch (error) {
            console.log("Error adding new visitor", error);
        }
    };

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Typography variant="h3">Add Visitor</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    select
                    fullWidth
                    label="Visitor Type"
                    name="visitortype"
                    value={visitorData.visitortype}
                    onChange={handleChange}
                    required
                >
                    {visitorTypes.map((type) => (
                        <MenuItem key={type.id} value={type.name}>
                            {type.name}
                        </MenuItem>
                    ))}
                </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    fullWidth
                    label="Name"
                    name="name"
                    value={visitorData.name}
                    onChange={handleChange}
                    required
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    fullWidth
                    label="Mobile"
                    name="mobile"
                    value={visitorData.mobile}
                    onChange={handleChange}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    select
                    fullWidth
                    label="Gender"
                    name="gendername"
                    value={visitorData.gendername}
                    onChange={handleChange}
                    required
                >
                    {genders.map((gender) => (
                        <MenuItem key={gender.id} value={gender.name}>
                            {gender.name}
                        </MenuItem>
                    ))}
                </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    type="date"
                    fullWidth
                    label="Date Visited"
                    name="date_visited"
                    value={visitorData.date_visited}
                    onChange={handleChange}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    select
                    fullWidth
                    label="Class"
                    name="classid"
                    value={visitorData.classid}
                    onChange={handleChange}
                    required
                >
                    {classes.map((cls) => (
                        <MenuItem key={cls.id} value={cls.name}>
                            {cls.name}
                        </MenuItem>
                    ))}
                </TextField>
            </Grid>
            <Grid item xs={12}>
                <TextField
                    fullWidth
                    label="Visiting Reason"
                    name="visiting_reason"
                    value={visitorData.visiting_reason}
                    onChange={handleChange}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    fullWidth
                    multiline
                    rows={4}
                    label="SMS"
                    name="sms"
                    value={visitorData.sms}
                    onChange={handleChange}
                />
            </Grid>
            <Grid item xs={12}>
                <Button variant="contained" color="primary" onClick={handleSubmit}>Submit</Button>
                <Button variant="contained" color="secondary" component={Link} to="/visitor" sx={{ ml: 2 }}>Cancel</Button>
            </Grid>
        </Grid>
    );
}

export default AddVisitor;
