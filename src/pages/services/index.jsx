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
import { FileAddOutlined, HistoryOutlined, FileOutlined } from '@ant-design/icons';
import Box from '@mui/material/Box';

function ServicesManagementPanel() {
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
            case 'Service Management':
                return (
                    <Typography variant="body1" style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}>
                        Create school services. This section allows you to add new school services, specify the amount.
                        <br />
                        <Button component={Link} to="/school-services" variant="contained" color="primary" sx={{ mt: 2 }}>
                            Create Service
                        </Button>
                    </Typography>
                );
            case 'Pupil Service Management':
                return (
                    <Typography variant="body1" style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}>
                        View and manage pupil services. You can review service details and manage services.
                        <br />
                        <Button component={Link} to="/student-services" variant="contained" color="primary" sx={{ mt: 2 }}>
                            Manage Pupil Services
                        </Button>
                    </Typography>
                );
            case 'Services Invoiced':
                return (
                    <Typography variant="body1" style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}>
                        Manage invoices for services provided. This section allows you to add, edit, and delete service invoices and track payments.
                        <br />
                        <Button component={Link} to="/invoices/services-invoiced" variant="contained" color="primary" sx={{ mt: 2 }}>
                            Manage Services Invoiced
                        </Button>
                    </Typography>
                );
            default:
                return null;
        }
    };

    const sections = [
        { label: 'Service Management', description: 'Manage services', icon: <HistoryOutlined /> },
        { label: 'Pupil Service Management', description: 'Manage pupil services', icon: <HistoryOutlined /> },
        { label: 'Services Invoiced', description: 'Manage service invoices', icon: <FileOutlined /> },
    ];

    return (
        <MainCard title="Services Management Panel" boxShadow={3} sx={{ p: 2 }} style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}>
            <Typography variant="body1" gutterBottom>
                Welcome to the Services Management Panel. This panel provides tools and features to manage various aspects of service creation and management within the institution.
            </Typography>
            <List>
                {sections.map((section, index) => (
                    <ListItem
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

export default ServicesManagementPanel;
