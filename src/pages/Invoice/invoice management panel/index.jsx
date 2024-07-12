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

function InvoiceManagementPanel() {
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
            case 'Create Arrear':
                return (
                    <Typography variant="body1" style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}>
                        Create arrears for students. This section allows you to add new arrears, specify the amount, and assign them to specific students.
                        <br />
                        <Button component={Link} to="/invoices/create-arrear" variant="contained" color="primary" sx={{ mt: 2 }}>
                            Create Arrear
                        </Button>
                    </Typography>
                );
            case 'Pupil Service Management':
                return (
                    <Typography variant="body1" style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}>
                        View and manage pupil services. You can review service details and manage services .
                        <br />
                        <Button component={Link} to="/invoices/pupil-service" variant="contained" color="primary" sx={{ mt: 2 }}>
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
        { label: 'Create Arrear', description: 'Create arrears for students', icon: <FileAddOutlined /> },
        { label: 'Pupil Service Management', description: 'Manage pupil services', icon: <HistoryOutlined /> },
        { label: 'Services Invoiced', description: 'Manage service invoices', icon: <FileOutlined /> },
    ];

    return (
        <MainCard title="Invoice Management Panel" boxShadow={3} sx={{ p: 2 }} style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}>
            <Typography variant="body1" gutterBottom>
                Welcome to the Invoice Management Panel. This panel provides tools and features to manage various aspects of invoice creation and management within the institution.
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

export default InvoiceManagementPanel;


