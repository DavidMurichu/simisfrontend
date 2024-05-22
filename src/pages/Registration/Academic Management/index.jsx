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
import { Subject, PeopleAlt, EventNote, School, LibraryBooks, Today, ArrowForward } from '@mui/icons-material';

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
            case 'Terms':
                return (
                    <Typography variant="body1">
                        Manage academic terms such as semesters, trimesters, or quarters. This section allows you to
                        create, edit, and delete academic terms for your institution. You can define the duration of
                        each term and assign them to specific academic years. <br />
                        <Button component={Link} to="/terms" variant="outlined" color="primary">
                            Manage Terms
                        </Button>
                    </Typography>
                );
            case 'Classes':
                return (
                    <Typography variant="body1">
                        Manage classes or sections for different courses or subjects. Here, you can add new classes,
                        assign teachers, and enroll students. You can also view and edit class details such as
                        schedules, capacity, and associated subjects. <br />
                        <Button component={Link} to="/classes" variant="outlined" color="primary">
                            Manage Classes
                        </Button>
                    </Typography>
                );
            case 'Academic Years':
                return (
                    <Typography variant="body1">
                        Manage academic years and their associated terms. This section allows you to set up academic
                        years, define their start and end dates, and assign terms to each academic year. <br />
                        <Button component={Link} to="/academic-years" variant="outlined" color="primary">
                            Manage Academic Years
                        </Button>
                    </Typography>
                );
            case 'Academic Year Terms':
                return (
                    <Typography variant="body1">
                        Manage terms within academic years and their durations. This section enables you to define
                        terms within academic years, set their start and end dates, and manage their durations. <br />
                        <Button component={Link} to="/academic-year-terms" variant="outlined" color="primary">
                            Manage Academic Year Terms
                        </Button>
                    </Typography>
                );
            case 'Pupil Class Promotion':
                return (
                    <Typography variant="body1">
                        Manage promotions of pupils from one class to another. This section allows you to promote
                        pupils to higher classes, manage their academic progress, and track promotion history. <br />
                        <Button component={Link} to="/pupil-class-promotion" variant="outlined" color="primary">
                            Manage Pupil Class Promotion
                        </Button>
                    </Typography>
                );
            case 'Pupils Class Terms':
                return (
                    <Typography variant="body1">
                        Manage terms for classes and their durations. This section enables you to define terms for
                        classes, set their start and end dates, and manage their durations. <br />
                        <Button component={Link} to="/pupils-class-terms" variant="outlined" color="primary">
                            Manage Pupils Class Terms
                        </Button>
                    </Typography>
                );
            case 'Subjects':
                return (
                    <Typography variant="body1">
                        Manage subjects offered in classes or academic programs. This section allows you to add, edit,
                        and delete subjects, assign them to classes, and manage subject curriculum. <br />
                        <Button component={Link} to="/subjects" variant="outlined" color="primary">
                            Manage Subjects
                        </Button>
                    </Typography>
                );
            case 'Teachers':
                return (
                    <Typography variant="body1">
                        Manage teachers or instructors associated with classes. This section enables you to add, edit,
                        and delete teachers, assign them to classes, and manage teacher assignments. <br />
                        <Button component={Link} to="/teachers" variant="outlined" color="primary">
                            Manage Teachers
                        </Button>
                    </Typography>
                );
            default:
                return null;
        }
    };

    const sections = [
        { label: 'Subjects', description: 'Manage subjects offered in classes', icon: <Subject /> },
        { label: 'Teachers', description: 'Manage teachers or instructors', icon: <PeopleAlt /> },
        { label: 'Terms', description: 'Manage academic terms', icon: <EventNote /> },
        { label: 'Classes', description: 'Manage classes and sections', icon: <School /> },
        { label: 'Academic Years', description: 'Manage academic years', icon: <LibraryBooks /> },
        { label: 'Academic Year Terms', description: 'Manage terms within academic years', icon: <Today /> },
        { label: 'Pupil Class Promotion', description: 'Manage promotions of pupils', icon: <ArrowForward /> },
        { label: 'Pupils Class Terms', description: 'Manage terms for classes', icon: <ArrowForward /> },
    ];

    return (
        <MainCard title="Academic Management Panel" boxShadow={3} sx={{ p: 2 }}>
            <Typography variant="body1" gutterBottom>
                Welcome to the Academic Management Panel. This panel provides tools and features to manage various aspects of academic administration within the institution.
            </Typography>
            <List>
                {sections.map((section, index) => (
                    <ListItem button key={index} onClick={() => handleSectionClick(section.label)} sx={{ py: 2 }}>
                        <ListItemIcon>{section.icon}</ListItemIcon>
                        <ListItemText primary={section.label} secondary={section.description} />
                    </ListItem>
                ))}
            </List>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle align="center" variant="h4">
                    {selectedSection}
                </DialogTitle>
                <DialogContent dividers>
                    {renderDescription()}
                </DialogContent>
            </Dialog>
        </MainCard>

    );
}

export default AcademicManagementPanel;
