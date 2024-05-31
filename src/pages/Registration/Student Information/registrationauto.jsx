import React, { useState } from 'react';
import { Typography, Button, Box, Grid, Paper, Tabs, Tab } from '@mui/material';
import AddPupil from "./add-pupil";
import ParentInfo from "./parentinfo";
import PupilClass from "./pupilclass";


function RegistrationAuto() {
    const [activeStep, setActiveStep] = useState(0);
    const steps = [
        { label: 'Pupil Details', status: 'incomplete' },
        { label: 'Class Assignments', status: 'incomplete' },
        { label: 'Pupil Services', status: 'incomplete' },
        { label: 'Fee Payments', status: 'incomplete' },
        { label: 'Generate Admission Number', status: 'incomplete' },
        { label: 'Confirmation', status: 'incomplete' }
    ];

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const renderStepContent = (step) => {
        switch (step) {
            case 0:
                return <PupilDetails />;
            case 1:
                return <ClassAssignments />;
            case 2:
                return <PupilServices />;
            case 3:
                return <FeePayments />;
            case 4:
                return <GenerateAdmissionNumber />;
            case 5:
                return <Confirmation />;
            default:
                return null;
        }
    };

    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                Registration Process
            </Typography>
            <Paper>
                <Tabs value={activeStep} variant="scrollable" scrollButtons="auto">
                    {steps.map((step, index) => (
                        <Tab
                            key={index}
                            label={step.label}
                            disabled={index > activeStep}
                            sx={{ color: index === activeStep ? 'primary.main' : step.status === 'complete' ? 'success.main' : 'error.main' }}
                        />
                    ))}
                </Tabs>
            </Paper>
            <Box mt={2} mb={4}>
                {renderStepContent(activeStep)}
            </Box>
            <Grid container justifyContent="space-between">
                <Grid item>
                    <Button disabled={activeStep === 0} onClick={handleBack}>Back</Button>
                </Grid>
                <Grid item>
                    <Button variant="contained" color="primary" onClick={handleNext} disabled={activeStep === steps.length - 1}>Next</Button>
                </Grid>
            </Grid>
        </Box>
    );
}
function PupilDetails() {
    return (
        <Typography variant="body1"><AddPupil/></Typography>
    );
}
function GuardianInformation() {
    return (
        <Typography variant="body1"><ParentInfo/></Typography>
    );
}
function ClassAssignments() {
    return (
        <Typography variant="body1"><PupilClass/></Typography>
    );
}
function GenerateAdmissionNumber() {
    return (
        <Typography variant="body1">Generate Admission Number Placeholder</Typography>
    );
}

function PupilServices() {
    return (
        <Typography variant="body1">Pupil Services Placeholder</Typography>
    );
}

function FeePayments() {
    return (
        <Typography variant="body1">Fee Payments Placeholder</Typography>
    );
}



function Confirmation() {
    return (
        <Typography variant="body1">Confirmation Placeholder</Typography>
    );
}

export default RegistrationAuto;
