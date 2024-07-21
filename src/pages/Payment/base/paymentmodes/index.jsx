import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import MainCard from 'components/MainCard';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import TableTemplate from 'pages/HOC/tabletemplate';
import ApiService from 'services/apiservice';

const columns = [
    { field: 'id', headerName: 'ID' },
    { field: 'name', headerName: 'Payment Mode Name' },
    { field: 'acctypeid', headerName: 'Account Type ID' },
    { field: 'is_bank', headerName: 'Is Bank', sortable: true },
    { field: 'remarks', headerName: 'Remarks', sortable: false },
    { field: 'createdby', headerName: 'Created By', sortable: false },
    { field: 'createdon', headerName: 'Created On', sortable: true },
    { field: 'lasteditedby', headerName: 'Last Edited By', sortable: false },
    { field: 'lasteditedon', headerName: 'Last Edited On', sortable: true },
    { field: 'ipaddress', headerName: 'IP Address', sortable: false },
    { field: 'is_active', headerName: 'Is Active', sortable: true },
    { field: 'created_at', headerName: 'Created At', sortable: true },
    { field: 'updated_at', headerName: 'Updated At', sortable: true }
];

function PaymentPaymentMode() {
    const [refresh, setRefresh] = useState(false);
    const endpoint = 'home/get_data/paymentmodes';
    
    const handleEdit = () => {
        // Implement edit functionality if needed
    };

    const handleDelete = async (id) => {
        try {
            const data = { id: id };
            const response = await ApiService.delete('home/delete/paymentmodes', data);
            if (response.status === 200) {
                toast.success("Deleted successfully");
                setRefresh(!refresh);
            } else {
                toast.warning("Error deleting. Please try again.");
            }
        } catch (error) {
            console.error('Error deleting:', error);
            toast.error("Error deleting. Please try again.");
        }
    };

    const buttons = [
        { label: 'Edit', color: 'primary', handleFunction: handleEdit },
        { label: 'Delete', color: 'error', handleFunction: handleDelete },
    ];

    return (
        <MainCard title="Payment Modes Management" style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}>
            <Typography variant="body1" gutterBottom>
                Welcome to the Payment Modes Management page. Here you can manage payment mode details and their actions.
            </Typography>

            {/* Button for adding new payment mode */}
            <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/payment/add-payment-mode"
                sx={{ mr: 1 }}
            >
                Add New Payment Mode
            </Button>
            
            <TableTemplate
                buttons={buttons}
                refresh={refresh}
                columns={columns}
                endpoint={endpoint}
                handleDelete={handleDelete}
            />
        </MainCard>
    );
}

export default PaymentPaymentMode;
