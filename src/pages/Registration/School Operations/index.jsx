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
                        Manage bank accounts associated with the institution. This section allows you to add, edit, and delete bank accounts, as well as view account details.
                        <br />
                        <Button component={Link} to="/bank-accounts" variant="contained" color="primary" sx={{ mt: 2 }}>
                            Manage Bank Accounts
                        </Button>
                    </Typography>
                );
            case 'School Services':
                return (
                    <Typography variant="body1">
                        Manage various services offered by the school. This section allows you to add, edit, and delete school services, as well as view service details and availability.
                        <br />
                        <Button component={Link} to="/school-services" variant="contained" color="primary" sx={{ mt: 2 }}>
                            Manage School Services
                        </Button>
                    </Typography>
                );
            case 'School Services Durations':
                return (
                    <Typography variant="body1">
                        Manage durations for school services. This section enables you to set durations for different services offered by the school.
                        <br />
                        <Button component={Link} to="/school-services-durations" variant="contained" color="primary" sx={{ mt: 2 }}>
                            Manage Service Durations
                        </Button>
                    </Typography>
                );

            case 'Visitor management':
                return (
                    <Typography variant="body1">
                        Manage visitor registrations. This section allows you to record and manage visitors to the school premises.
                        <br />
                        <Button component={Link} to="/visitor" variant="contained" color="primary" sx={{ mt: 2 }}>
                            Manage Visitors
                        </Button>
                    </Typography>
                );
            case 'Visitor Types':
                return (
                    <Typography variant="body1">
                        Manage types of visitors. This section enables you to define different types of visitors and their permissions/access levels.
                        <br />
                        <Button component={Link} to="/visitor-types" variant="contained" color="primary" sx={{ mt: 2 }}>
                            Manage Visitor Types
                        </Button>
                    </Typography>
                );
            case 'Class Daily Recording':
                return (
                    <Typography variant="body1">
                        Record daily activities for classes. This section allows teachers or administrators to record daily activities and events for each class.
                        <br />
                        <Button component={Link} to="/class-daily-recording" variant="contained" color="primary" sx={{ mt: 2 }}>
                            Record Daily Activities
                        </Button>
                    </Typography>
                );
            case 'Inventory Management':
                return (
                    <Typography variant="body1">
                        Record daily activities for classes. This section allows teachers or administrators to record daily activities and events for each class.
                        <br />
                        <Button component={Link} to="/inventory" variant="contained" color="primary" sx={{ mt: 2 }}>
                            Inventrory Management
                        </Button>
                    </Typography>
                );
            case 'E-Learning Platform':
                return (
                    <Typography variant="body1">
                        Record daily activities for classes. This section allows teachers or administrators to record daily activities and events for each class.
                        <br />
                        <Button component={Link} to="/inventory" variant="contained" color="primary" sx={{ mt: 2 }}>
                            E-Learning Management
                        </Button>
                    </Typography>
                );
            default:
                return null;
        }
    };

    const sections = [
        { label: 'Inventory Management', description: 'Manage Inventory Around the school', icon: <LibraryBooks /> },
        { label: 'E-Learning Platform', description: 'Manage the elearning mechanism', icon: <LibraryBooks /> },
        { label: 'Bank Accounts', description: 'Manage bank accounts', icon: <AccountBalance /> },
        { label: 'School Services', description: 'Manage school services', icon: <LocalOffer /> },
        { label: 'School Services Durations', description: 'Manage durations for school services', icon: <Today /> },
        { label: 'Visitor management', description: 'Manage visitor registrations', icon: <Group /> },
        { label: 'Class Daily Recording', description: 'Record daily activities for classes', icon: <LibraryBooks /> },

    ];

    return (
        <MainCard title="School Operations Panel" boxShadow={3} sx={{ p: 2 }}>
            <Typography variant="body1" gutterBottom>
                Welcome to the School Operations Panel. This panel provides tools and features to manage various aspects of school operations within the institution.
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
