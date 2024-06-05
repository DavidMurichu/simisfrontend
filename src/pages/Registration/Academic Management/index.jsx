import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import MainCard from 'components/MainCard';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Subject, PeopleAlt, EventNote, School } from '@mui/icons-material';

function AcademicManagementPanel() {
    const [selectedSection, setSelectedSection] = useState(null);
    const [open, setOpen] = useState(false);

    const handleSectionClick = (section) => {
        setSelectedSection(section);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const renderDescription = () => {
        switch (selectedSection) {
            case 'Academic Calendar':
                return (
                    <Typography variant="body1">
                        Manage the academic calendar such as semesters, trimesters, or quarters. You can define the duration of each term and assign them to specific academic years. This also provides an overview of each academic year and the corresponding pages.
                        <br />
                        <Button component={Link} to="/calendar" variant="contained" color="primary" sx={{ mt: 2 }}>
                            Manage Calendar
                        </Button>
                    </Typography>
                );
            case 'Classes':
                return (
                    <Typography variant="body1">
                        Manage classes or sections for different courses or subjects. Here, you can add new classes, assign teachers, and enroll students. You can also view and edit class details such as schedules, capacity, and associated subjects.
                        <br />
                        <Button component={Link} to="/classes" variant="contained" color="primary" sx={{ mt: 2 }}>
                            Manage Classes
                        </Button>
                    </Typography>
                );
            case 'Pupil Class Promotion':
                return (
                    <Typography variant="body1">
                        Manage promotions of pupils from one class to another. This section allows you to promote pupils to higher classes, manage their academic progress, and track promotion history.
                        <br />
                        <Button component={Link} to="/pupil-class-promotion" variant="contained" color="primary" sx={{ mt: 2 }}>
                            Manage Pupil Class Promotion
                        </Button>
                    </Typography>
                );
            case 'Pupils Class Terms':
                return (
                    <Typography variant="body1">
                        Manage terms for classes and their durations. This section enables you to define terms for classes, set their start and end dates, and manage their durations.
                        <br />
                        <Button component={Link} to="/pupils-class-terms" variant="contained" color="primary" sx={{ mt: 2 }}>
                            Manage Pupils Class Terms
                        </Button>
                    </Typography>
                );
            case 'Subjects':
                return (
                    <Typography variant="body1">
                        Manage subjects offered in classes or academic programs. This section allows you to add, edit, and delete subjects, assign them to classes, and manage subject curriculum.
                        <br />
                        <Button component={Link} to="/subjects" variant="contained" color="primary" sx={{ mt: 2 }}>
                            Manage Subjects
                        </Button>
                    </Typography>
                );
            case 'Teachers':
                return (
                    <Typography variant="body1">
                        Manage teachers or instructors associated with classes. This section enables you to add, edit, and delete teachers, assign them to classes, and manage teacher assignments.
                        <br />
                        <Button component={Link} to="/teachers" variant="contained" color="primary" sx={{ mt: 2 }}>
                            Manage Teachers
                        </Button>
                    </Typography>
                );
            case 'Gender':
                return (
                    <Typography variant="body1">
                      Manage Gender
                        <br />
                        <Button component={Link} to="/gender" variant="contained" color="primary" sx={{ mt: 2 }}>
                            Manage Gender
                        </Button>
                    </Typography>
                );case 'Teachers On Duty':
                return (
                    <Typography variant="body1">
                        Manage Teachers on duty for this week
                        <br />
                        <Button component={Link} to="/teacher-on-duty" variant="contained" color="primary" sx={{ mt: 2 }}>
                            Manage teachers on duty
                        </Button>
                    </Typography>
                );
            default:
                return null;
        }
    };

    const sections = [
        { label: 'Classes', description: 'Manage classes and sections', icon: <School /> },
        { label: 'Subjects', description: 'Manage subjects offered in classes', icon: <Subject /> },
        { label: 'Teachers', description: 'Manage teachers or instructors', icon: <PeopleAlt /> },
        { label: 'Teachers On Duty', description: 'Manage teachers on duty', icon: <PeopleAlt /> },
        { label: 'Pupil Class Promotion', description: 'Manage promotions of pupils', icon: <PeopleAlt /> },
        { label: 'Academic Calendar', description: 'Manage academic years', icon: <EventNote /> },
        { label: 'Gender', description: 'Manage Students Gender', icon: <PeopleAlt /> },
    ];

    return (
        <MainCard title="Academic Management Panel" boxShadow={3} sx={{ p: 2 }}>
            <Typography variant="body1" gutterBottom>
                Welcome to the Academic Management Panel. This panel provides tools and features to manage various aspects of academic administration within the institution.
            </Typography>
            <List>
                {sections.map((section, index) => (
                    <ListItem
                        button
                        key={index}
                        onClick={() => handleSectionClick(section.label)}
                        sx={{
                            py: 2,
                            backgroundColor: 'background.paper',
                            '&:hover': {
                                backgroundColor: 'primary.light',
                                color: 'white'
                            }
                        }}
                    >
                        <ListItemIcon sx={{ color: 'primary.main' }}>{section.icon}</ListItemIcon>
                        <ListItemText primary={section.label} secondary={section.description} />
                    </ListItem>
                ))}
            </List>
            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
                <DialogTitle align="center">{selectedSection}</DialogTitle>
                <DialogContent dividers>
                    {renderDescription()}
                </DialogContent>
            </Dialog>
        </MainCard>
    );
}

export default AcademicManagementPanel;
