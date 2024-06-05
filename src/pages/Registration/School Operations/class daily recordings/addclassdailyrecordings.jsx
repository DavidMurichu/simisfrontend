import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import TeacherService from '../../../../services/TeacherService'; // Adjust the path
import ClassDailyRecordingService from '../../../../services/classesService'; // Adjust the path

function AddClassDailyRecordings() {
    const navigate = useNavigate();
    const [recordingData, setRecordingData] = useState({
        teacheronduty: '',
        recording_date: '',
        general_comment: '',
        createdby: sessionStorage.getItem('id'),
        lasteditedby: sessionStorage.getItem('id'),
        ipaddress: '',
        is_active: true,
    });

    const [teachers, setTeachers] = useState([]);

    useEffect(() => {
        const fetchTeachers = async () => {
            try {
                const response = await TeacherService.getAllPersons();
                setTeachers(response.data);
            } catch (error) {
                console.error('Error fetching teachers:', error);
            }
        };

        fetchTeachers();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRecordingData({ ...recordingData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await ClassDailyRecordingService.addClassDailyRecording(recordingData);
            if (response.status === 201) {
                toast.success("Added class daily recording successfully");
                navigate("/class-daily-recording");
            } else {
                toast.warning("Error, Try again");
            }
        } catch (error) {
            console.error("Error adding new class daily recording", error);
        }
    };

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Typography variant="h3">Add Class Daily Recording</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    select
                    fullWidth
                    label="Teacher on Duty"
                    name="teacheronduty"
                    value={recordingData.teacheronduty}
                    onChange={handleChange}
                    required
                >
                    {teachers.map((teacher) => (
                        <MenuItem key={teacher.id} value={teacher.id}>
                            {teacher.name}
                        </MenuItem>
                    ))}
                </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    type="date"
                    fullWidth
                    label="Recording Date"
                    name="recording_date"
                    value={recordingData.recording_date}
                    onChange={handleChange}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    required
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    fullWidth
                    multiline
                    rows={4}
                    label="General Comment"
                    name="general_comment"
                    value={recordingData.general_comment}
                    onChange={handleChange}
                />
            </Grid>

            <Grid item xs={12}>
                <Button variant="contained" color="primary" onClick={handleSubmit}>Submit</Button>
                <Button variant="contained" color="secondary" component={Link} to="/class-daily-recording" sx={{ ml: 2 }}>Cancel</Button>
            </Grid>
        </Grid>
    );
}

export default AddClassDailyRecordings;
