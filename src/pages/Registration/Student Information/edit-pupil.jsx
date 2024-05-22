import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MainCard from 'components/MainCard';

function EditPupil() {
    const [name, setName] = useState('');
    const [admissionNo, setAdmissionNo] = useState('');
    const [gender, setGender] = useState('');
    const [admissionClass, setAdmissionClass] = useState('');
    const [currentClass, setCurrentClass] = useState('');
    const [currentTerm, setCurrentTerm] = useState('');
    const [parentName, setParentName] = useState('');
    const [mobile, setMobile] = useState('');
    const [secondaryMobile, setSecondaryMobile] = useState('');
    const [city, setCity] = useState('');
    const [town, setTown] = useState('');
    const [address, setAddress] = useState('');
    const [admissionYear, setAdmissionYear] = useState('');
    const [currentAcademicYear, setCurrentAcademicYear] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name.trim() || !gender.trim()) {
            setError('Name and Gender are required.');
            return;
        }
        // Add logic to update pupil data
        console.log('Updated Pupil:', {
            name,
            admissionNo,
            gender,
            admissionClass,
            currentClass,
            currentTerm,
            parentName,
            mobile,
            secondaryMobile,
            city,
            town,
            address,
            admissionYear,
            currentAcademicYear,
        });
        clearForm();
        setSuccessMessage('Pupil updated successfully!');
        setError('');
    };

    const clearForm = () => {
        setName('');
        setAdmissionNo('');
        setGender('');
        setAdmissionClass('');
        setCurrentClass('');
        setCurrentTerm('');
        setParentName('');
        setMobile('');
        setSecondaryMobile('');
        setCity('');
        setTown('');
        setAddress('');
        setAdmissionYear('');
        setCurrentAcademicYear('');
    };

    return (
        <MainCard title="Edit Pupil">
            <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Pupil's Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            fullWidth
                            error={!!error && !name.trim()}
                            helperText={!!error && !name.trim() ? 'Name is required.' : ''}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Admission No"
                            value={admissionNo}
                            onChange={(e) => setAdmissionNo(e.target.value)}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            select
                            label="Gender"
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                            fullWidth
                            error={!!error && !gender.trim()}
                            helperText={!!error && !gender.trim() ? 'Gender is required.' : ''}
                            SelectProps={{
                                native: true,
                            }}
                        >
                            <option value=""></option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </TextField>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Admission Class"
                            value={admissionClass}
                            onChange={(e) => setAdmissionClass(e.target.value)}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Current Class"
                            value={currentClass}
                            onChange={(e) => setCurrentClass(e.target.value)}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Current Term"
                            value={currentTerm}
                            onChange={(e) => setCurrentTerm(e.target.value)}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Parent Name"
                            value={parentName}
                            onChange={(e) => setParentName(e.target.value)}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Mobile"
                            value={mobile}
                            onChange={(e) => setMobile(e.target.value)}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Secondary Mobile"
                            value={secondaryMobile}
                            onChange={(e) => setSecondaryMobile(e.target.value)}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="City"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Town"
                            value={town}
                            onChange={(e) => setTown(e.target.value)}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Admission Year"
                            value={admissionYear}
                            onChange={(e) => setAdmissionYear(e.target.value)}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Current Academic Year"
                            value={currentAcademicYear}
                            onChange={(e) => setCurrentAcademicYear(e.target.value)}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" color="primary">
                            Save Changes
                        </Button>
                    </Grid>
                    {successMessage && (
                        <Grid item xs={12}>
                            <div style={{ color: 'green' }}>{successMessage}</div>
                        </Grid>
                    )}
                </Grid>
            </form>
        </MainCard>
    );
}

export default EditPupil;
