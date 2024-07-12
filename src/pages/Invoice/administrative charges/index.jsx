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




const AdminChargesPanel=()=>{

const [selectedSection, setSelectedSection] = useState(null);
const [open, setOpen] = useState(false);

const sections = [
    { label: 'Create Admin Charge', description: 'Create votehead', icon: <FileAddOutlined /> },
    { label: 'Create Admin Charge value', description: 'Create Admin Charges Values ', icon: <FileAddOutlined /> },
    { label: 'Process School Fee', description: 'Process Fee Invoice', icon: <FileAddOutlined /> },
];


const handleSectionClick = (section) => {
    setSelectedSection(section);
    setOpen(true);
};

const handleClose = () => {
    setOpen(false);
};

const renderDescription = () => {
    switch (selectedSection) {
        case 'Create Admin Charge':
            return (
                <Typography variant="body1" style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}>
                    Create arrears for students. This section allows you to add new arrears, specify the amount, and assign them to specific students.
                    <br />
                    <Button component={Link} to="/invoices/administrative-charge-management" variant="contained" color="primary" sx={{ mt: 2 }}>
                        Create VoteHead
                    </Button>
                </Typography>
            );
            case 'Create Admin Charge value':
                return (
                    <Typography variant="body1" style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}>
                        Create arrears for students. This section allows you to add new arrears, specify the amount, and assign them to specific students.
                        <br />
                        <Button component={Link} to="/invoices/administrative-charge-values-management" variant="contained" color="primary" sx={{ mt: 2 }}>
                            Create VoteHead Values
                        </Button>
                    </Typography>
                );
                case 'Process School Fee':
                    return (
                        <Typography variant="body1" style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}>
                            Process School Fee for students. This section allows you to Process School Fee, specify the amount, to specific students.
                            <br />
                            <Button component={Link} to="/invoices/school-fee-management" variant="contained" color="primary" sx={{ mt: 2 }}>
                               Process School Fee
                            </Button>
                        </Typography>
                    );
        default:
            return null;
    }
};

    return (
        <MainCard title="Admin Charges Management Panel" boxShadow={3} sx={{ p: 2 }} style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}>
            <Typography variant="body1" gutterBottom>
                Welcome to the Charges Management Panel. This panel provides tools and features to manage various aspects of charges creation and management within the institution.
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

export default AdminChargesPanel;

