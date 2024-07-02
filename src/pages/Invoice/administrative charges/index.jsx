import React from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TableTemplate from '../../HOC/tabletemplate';
import MainCard from 'components/MainCard';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import AdministrativeChargesService from '../../../services/apiservice';

const columns = [
    { field: 'name', headerName: 'Name' },
    { field: 'description', headerName: 'Description' },
    { field: 'paymentterm', headerName: 'Payment Term' },
    { field: 'created_at', headerName: 'Created On' },
    { field: 'updated_at', headerName: 'Updated At' },
    { field: 'is_active', headerName: 'Is Active' }
];

function AdministrativeCharges() {
    const endpoint = 'home/get_data/sch_vote_heads';
    const handleDelete = async (id) => {
        try {
            // const response = await AdministrativeChargesService.deleteCharge(id);
            // if (response.status === 200) {
            //     toast.success("Deleted administrative charge successfully");
            // } else {
            //     toast.warning("Error, try again");
            // }
        } catch (error) {
            console.error('Error deleting administrative charge:', error);
            toast.error("Error deleting administrative charge. Please try again.");
        }
    };

    return (
        <MainCard title="Administrative Charges Management" style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}>
            <Typography variant="body1" gutterBottom>
                Welcome to the Administrative Charges Management page. Here you can manage administrative charges details and their actions.
            </Typography>

            {/* Button for adding new administrative charge */}
            <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/add-administrative-charge"
                sx={{ mb: 2 }}
            >
                Add New Administrative Charge
            </Button>
            <TableTemplate
                columns={columns}
                endpoint={endpoint}
                handleDelete={handleDelete}
            />
        </MainCard>
    );
}





const AdminChargesPanel=()=>{

const [selectedSection, setSelectedSection] = useState(null);
const [open, setOpen] = useState(false);

const sections = [
    { label: 'Create Admin Charge', description: 'Create Admin Charges for School', icon: <FileAddOutlined /> },
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
        case 'Admin Charges':
            return (
                <Typography variant="body1" style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}>
                    Create arrears for students. This section allows you to add new arrears, specify the amount, and assign them to specific students.
                    <br />
                    <Button component={Link} to="/invoices/administrative-charges" variant="contained" color="primary" sx={{ mt: 2 }}>
                        Create Arrear
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

export default AdministrativeCharges;

