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
import {
    AccountBalance,
    LocalOffer,
    Today,
    Event,
    Group,
    Assignment,
    LibraryBooks,
    EventNote
} from '@mui/icons-material';

function SchoolOperationsPanel() {
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
            case 'Bank Accounts':
                return (
                    <Typography variant="body1">
                        Manage bank accounts associated with the institution. This section allows you to add, edit, and delete bank accounts, as well as view account details. <br />
                        <Button component={Link} to="/bank-accounts" variant="outlined" color="primary">
                            Manage Bank Accounts
                        </Button>
                    </Typography>
                );
            case 'School Services':
                return (
                    <Typography variant="body1">
                        Manage various services offered by the school. This section allows you to add, edit, and delete school services, as well as view service details and availability. <br />
                        <Button component={Link} to="/school-services" variant="outlined" color="primary">
                            Manage School Services
                        </Button>
                    </Typography>
                );
            // Add cases for other sections as needed
            case 'School Services Durations':
                return (
                    <Typography variant="body1">
                        Manage durations for school services. This section enables you to set durations for different services offered by the school. <br />
                        <Button component={Link} to="/school-services-durations" variant="outlined" color="primary">
                            Manage Service Durations
                        </Button>
                    </Typography>
                );
            case 'Calendar Year':
                return (
                    <Typography variant="body1">
                        Manage the academic calendar year. This section allows you to define and manage the academic calendar for the school year. <br />
                        <Button component={Link} to="/calendar-year" variant="outlined" color="primary">
                            Manage Calendar Year
                        </Button>
                    </Typography>
                );
            case 'Calendar Events':
                return (
                    <Typography variant="body1">
                        Manage calendar events. This section enables you to add, edit, and delete events on the school calendar. <br />
                        <Button component={Link} to="/calendar-events" variant="outlined" color="primary">
                            Manage Calendar Events
                        </Button>
                    </Typography>
                );
            case 'Visitor Register':
                return (
                    <Typography variant="body1">
                        Manage visitor registrations. This section allows you to record and manage visitors to the school premises. <br />
                        <Button component={Link} to="/visitor-register" variant="outlined" color="primary">
                            Manage Visitor Register
                        </Button>
                    </Typography>
                );
            case 'Visitor Types':
                return (
                    <Typography variant="body1">
                        Manage types of visitors. This section enables you to define different types of visitors and their permissions/access levels. <br />
                        <Button component={Link} to="/visitor-types" variant="outlined" color="primary">
                            Manage Visitor Types
                        </Button>
                    </Typography>
                );
            case 'Class Daily Recording':
                return (
                    <Typography variant="body1">
                        Record daily activities for classes. This section allows teachers or administrators to record daily activities and events for each class. <br />
                        <Button component={Link} to="/class-daily-recording" variant="outlined" color="primary">
                            Record Daily Activities
                        </Button>
                    </Typography>
                );
            // Add more cases for additional sections
            default:
                return null;
        }
    };

    const sections = [
        { label: 'Bank Accounts', description: 'Manage bank accounts', icon: <AccountBalance /> },
        { label: 'School Services', description: 'Manage school services', icon: <LocalOffer /> },
        { label: 'School Services Durations', description: 'Manage durations for school services', icon: <Today /> },
        { label: 'Calendar Year', description: 'Manage the academic calendar year', icon: <Event /> },
        { label: 'Calendar Events', description: 'Manage calendar events', icon: <EventNote /> },
        { label: 'Visitor Register', description: 'Manage visitor registrations', icon: <Group /> },
        { label: 'Visitor Types', description: 'Manage types of visitors', icon: <Assignment /> },
        { label: 'Class Daily Recording', description: 'Record daily activities for classes', icon: <LibraryBooks /> },
        // Add more sections as needed
    ];

    return (
        <MainCard title="School Operations Panel" boxShadow={3} sx={{ p: 2 }}>
            <Typography variant="body1" gutterBottom>
                Welcome to the School operations panel. This panel provides tools and features to manage various aspects of school-operations within the institution.
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

export default SchoolOperationsPanel;
