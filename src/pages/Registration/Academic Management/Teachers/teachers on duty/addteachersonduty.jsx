import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import TeacherService from "../../../../../services/TeacherService";
import MenuItem from "@mui/material/MenuItem";

function AddTeachersOnDuty() {
    const navigate = useNavigate();
    const [teacherData, setTeacherData] = useState({
        teacherid: '',
        duty_start: '',
        duty_end: '',
        comments: '',
        createdby: sessionStorage.getItem('id'),
        lasteditedby: sessionStorage.getItem('id'),
        is_active: true,
    });
    const [teachers, setTeachers] = useState([]);

    useEffect(() => {
        async function fetchTeachers() {
            try {
                const response = await TeacherService.getAllPersons();
                const data = await response.data;
                setTeachers(data);
            } catch (error) {
                console.error('Error fetching teachers:', error);
            }
        }
        fetchTeachers();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTeacherData({ ...teacherData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await TeacherService.addTeacherOnDuty(teacherData);
            if (response.status === 201) {
                toast.success("Added teacher on duty successfully");
                navigate("/teacher-on-duty");
            } else {
                toast.warning("Error, Try again");
            }
        } catch (error) {
            console.log("Error adding new teacher on duty", error);
        }
    };

    return (
        <Grid container spacing={3} style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}>
            <Grid item xs={12}>
                <Typography variant="h3">Add Teacher on Duty</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    fullWidth
                    select
                    label="Teacher ID"
                    name="teacherid"
                    value={teacherData.teacherid}
                    onChange={handleChange}
                    required
                >
                    {teachers.map((teacher) => (
                        <MenuItem key={teacher.id} value={teacher.id}>
                            {teacher.name} {teacher.surname}
                        </MenuItem>
                    ))}
                </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    fullWidth
                    type="datetime-local"
                    label="Duty Start"
                    name="duty_start"
                    value={teacherData.duty_start}
                    onChange={handleChange}
                    required
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    fullWidth
                    type="datetime-local"
                    label="Duty End"
                    name="duty_end"
                    value={teacherData.duty_end}
                    onChange={handleChange}
                    required
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    fullWidth
                    multiline
                    rows={4}
                    label="Comments"
                    name="comments"
                    value={teacherData.comments}
                    onChange={handleChange}
                />
            </Grid>

            <Grid item xs={12}>
                <Button variant="contained" color="primary" onClick={handleSubmit}>Submit</Button>
                <Button variant="contained" color="secondary" component={Link} to="/teacher-on-duty" sx={{ ml: 2 }}>Cancel</Button>
            </Grid>
        </Grid>
    );
}

export default AddTeachersOnDuty;
