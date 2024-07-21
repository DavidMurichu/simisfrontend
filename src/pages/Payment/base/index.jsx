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
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions'; // Import the icon for Sub Account Type
import PaymentIcon from '@mui/icons-material/Payment'; // Import the icon for Payment Mode

const BaseTablePanel = () => {
    const [selectedSection, setSelectedSection] = useState(null);
    const [open, setOpen] = useState(false);

    const sections = [
        { label: 'Account Type Management', description: 'Manage account types. This section allows you to create new account types, categorize them, and set their properties.', icon: <AccountBalanceIcon /> },
        { label: 'Sub Account Type Management', description: 'Manage sub account types. This section allows you to create new sub account types, categorize them, and set their properties.', icon: <SubscriptionsIcon /> },
        { label: 'Payment Mode Management', description: 'Manage payment modes. This section allows you to create new payment modes, categorize them, and set their properties.', icon: <PaymentIcon /> },
        { label: 'Banks Management', description: 'Manage Banks. This section allows you to create new Banks, categorize them, and set their properties.', icon: <PaymentIcon /> }
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
            case 'Account Type Management':
                return (
                    <Typography variant="body1" style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}>
                        Manage account types. This section allows you to create new account types, categorize them, and set their properties.
                        <br />
                        <Button component={Link} to="/payment/account-types" variant="contained" color="primary" sx={{ mt: 2 }}>
                            Manage Account Types
                        </Button>
                    </Typography>
                );
            case 'Sub Account Type Management':
                return (
                    <Typography variant="body1" style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}>
                        Manage sub account types. This section allows you to create new sub account types, categorize them, and set their properties.
                        <br />
                        <Button component={Link} to="/payment/sub-account-types" variant="contained" color="primary" sx={{ mt: 2 }}>
                            Manage Sub Account Types
                        </Button>
                    </Typography>
                );
            case 'Payment Mode Management':
                return (
                    <Typography variant="body1" style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}>
                        Manage payment modes. This section allows you to create new payment modes, categorize them, and set their properties.
                        <br />
                        <Button component={Link} to="/payment/payment-modes" variant="contained" color="primary" sx={{ mt: 2 }}>
                            Manage Payment Modes
                        </Button>
                    </Typography>
                );
                case 'Banks Management':
                    return (
                        <Typography variant="body1" style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}>
                            Manage Banks. This section allows you to create new Banks, categorize them, and set their properties.
                            <br />
                            <Button component={Link} to="/payment/banks" variant="contained" color="primary" sx={{ mt: 2 }}>
                                Manage Banks
                            </Button>
                        </Typography>
                    );
            default:
                return null;
        }
    };

    return (
        <MainCard title="Base Tables Management Panel" boxShadow={3} sx={{ p: 2 }} style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}>
            <Typography variant="body1" gutterBottom>
                Welcome to the Base Tables Panel. This panel provides tools and features to manage various aspects of base tables.
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

export default BaseTablePanel;
