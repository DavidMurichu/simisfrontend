import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import MainCard from 'components/MainCard';
import TermsService from '../../../../../services/calendarService';
import {Link, useNavigate} from "react-router-dom";
import {toast, ToastContainer} from "react-toastify";

function AddStudentClassTerm() {
    const [studentClassPromotionId, setStudentClassPromotionId] = useState('');
    const [termName, setTermName] = useState('');
    const [createdOn, setCreatedOn] = useState('');
    const [isActive, setIsActive] = useState(true);
    const navigate = useNavigate();

    const handleSave = async () => {
        const newTerm = {
            studentclasspromotionid: studentClassPromotionId,
            termname: termName,
            createdon: createdOn,
            is_active: isActive ? '1' : '0',
            // Add other fields here if needed
        };

        try {
            await TermsService.addClassTerm(newTerm);
            navigate("/calendar")
        } catch (err) {
            if (err.data) {
                // Accessing the array of errors and getting the first error message
                const errorMessage = err.data[0].message;
                console.log("Error from response", err.data, errorMessage);
                toast.warning("Try again: " + errorMessage);
            } else if (err.message) {
                toast.error(err.message);
            } else {
                toast.error("An unexpected error occurred. Please try again.");
            }
        }
    };

    return (
        <MainCard title="Add Student Class Term">
            <ToastContainer/>
            <Typography variant="body1" gutterBottom>
                Fill in the details to add a new student class term.
            </Typography>
            <Box component="form" noValidate autoComplete="off">
                <TextField
                    label="Student Class Promotion ID"
                    variant="outlined"
                    fullWidth
                    value={studentClassPromotionId}
                    onChange={(e) => setStudentClassPromotionId(e.target.value)}
                    margin="normal"
                />
                <TextField
                    label="Term Name"
                    variant="outlined"
                    fullWidth
                    value={termName}
                    onChange={(e) => setTermName(e.target.value)}
                    margin="normal"
                />
                <TextField
                    label="Created On"
                    variant="outlined"
                    fullWidth
                    value={createdOn}
                    onChange={(e) => setCreatedOn(e.target.value)}
                    margin="normal"
                    type="date"
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <TextField
                    label="Is Active"
                    variant="outlined"
                    fullWidth
                    value={isActive}
                    onChange={(e) => setIsActive(e.target.checked)}
                    margin="normal"
                    type="checkbox"
                />
                <Box mt={2}>
                    <Button variant="contained" color="primary" onClick={handleSave}>
                        Save
                    </Button>
                    <Button variant="contained" color="secondary" component={Link} to="/calendar" sx={{ ml: 2 }}>Cancel</Button>
                </Box>
            </Box>
        </MainCard>
    );
}

export default AddStudentClassTerm;
