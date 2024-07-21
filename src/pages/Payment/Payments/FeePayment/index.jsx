import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import MainCard from 'components/MainCard';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import TableTemplate from 'pages/HOC/tabletemplate';
import ApiService from 'services/apiservice';

const columns = [
    {
        field: 'studentid',
        headerName: 'Student',
        foreign: 'student',
        foreignField: 'name'
    },
    {
        field: 'admision_no',
        headerName: 'Admision',
        foreign: 'student',
        foreignField: 'admission_no'
    },
    { field: 'amountpaid', headerName: 'Paid Amount', sortable: true },
    { field: 'paymentmodeid', headerName: 'Payment Mode', sortable: false },
    {
        field: 'paymentmodeid',
        headerName: 'Payment Mode',
        foreign: 'paymentmode',
        foreignField: 'name'
    },
    {
        field: 'bankid',
        headerName: 'Bank',
        foreign: 'bank',
        foreignField: 'name'
    },
    { field: 'transactionno', headerName: 'Transaction No', sortable: false },
    { field: 'receiptno', headerName: 'Receipt No', sortable: false },
    { field: 'paymentdate', headerName: 'Payment Date', sortable: true },
    { field: 'is_active', headerName: 'Is Active', sortable: true },

];

function FeePaymentsManagementPanel() {
    const [refresh, setRefresh] = useState(false);
    const endpoint = 'home/get_data/sch_fee_payments'; // Adjusted endpoint for fee payments

    const handleEdit = () => {
        // Add your edit logic here if needed
    };

    const handleDelete = async (id) => {
        try {
            const data = { id };
            const response = await ApiService.delete('home/delete/sch_fee_payments', data);
            if (response.status === 200) {
                toast.success("Deleted successfully");
                setRefresh(!refresh);
            } else {
                toast.warning("Error, try again");
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
        <MainCard title="Fee Payments Management" style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}>
            <Typography variant="body1" gutterBottom>
                Welcome to the Fee Payments Management page. Here you can manage fee payment details and their actions.
            </Typography>

            {/* Button for adding new fee payment */}
            <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/payment/add-fee-payment"
                sx={{ mr: 1 }}
            >
                Add New Fee Payment
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

export default FeePaymentsManagementPanel;
