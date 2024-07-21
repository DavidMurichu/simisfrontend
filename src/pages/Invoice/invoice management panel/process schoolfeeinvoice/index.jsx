import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import MainCard from 'components/MainCard';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify'; // Import toast from react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for React Toastify
import TableTemplate from 'pages/HOC/tabletemplate';
import ApiService from 'services/apiservice';

const columns = [
    {
        field: 'studentid',
        headerName: 'Pupil',
        foreign: 'student',
        foreignField: 'name'
    },
    {
        field: 'adminsionno',
        headerName: 'Admission',
        foreign: 'student',
        foreignField: 'admission_no'
    },
   
    {
        field: 'term',
        headerName: 'Invoiced term',
        foreign: 'classterm',
        foreignField: 'term'
    },
    
    { field: 'amount', headerName: 'Amount' },
    { field: 'balance', headerName: 'Balance' },
    { field: 'created_at', headerName: 'Created On' },
    { field: 'is_active', headerName: 'Is Active' }
];

function SchoolFeeManagement() {
    const [refresh, setRefresh]=useState(false);
    
    const [endpoint, setEndpoint]= useState('home/get_data/sch_fee_invoices');

    const handleDelete = async (id) => {
        try {

            const data={
                id:id
            }
            // Example of how to use toast
            // Uncomment and add your delete logic here
            const response = await ApiService.delete('home/delete/sch_fee_invoices', data);
            if (response.status === 200) {
            toast.success("Deleted successfully");
            setRefresh(!refresh);
            } else {
                toast.warning("Error, try again");
            }
        } catch (error) {
            console.error('Error deleting administrative charge:', error);
            toast.error("Error deleting administrative charge. Please try again.");
        }
    };

    const handleEdit = (id) => {
        console.log(id);
        // Add your edit logic here
    };

    const handleReverse = async (id) => {
        try {

            const data={
                id:id
            }
            // Example of how to use toast
            // Uncomment and add your delete logic here
            const response = await ApiService.delete('home/reverse-invoice', data);
            if (response.status === 200) {
            toast.success("Reversed successfully");
            setRefresh(!refresh);

            window.location.reload();
            } else {
                toast.warning("Error, try again");
            }
        } catch (error) {
            console.error('Error reversing    invoice:', error);
            toast.error("Error reversing invoice. Please try again.");
        }
    };

    

    const buttons = [
        { label: 'Edit', color: 'primary', handleFunction: handleEdit },
        { label: 'Delete', color: 'error', handleFunction: handleDelete },
        { label: 'Reverse', color: 'secondary', handleFunction: handleReverse },
    ];

    return (
        <MainCard title="Administrative Charges Management" style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}>
            <Typography variant="body1" gutterBottom>
                Welcome to the School Fee Management page. Here you can manage fee invoices and their actions.
            </Typography>

            {/* Button for adding new administrative charge */}
            <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/school-fee-invoice"
                sx={{ mr: 1 }}
            >
                Process School Fee
            </Button>
            <TableTemplate
                refresh={refresh}
                buttons={buttons}
                columns={columns}
                endpoint={endpoint}
                handleDelete={handleDelete}
            />
            
        </MainCard>
    );
}

export default SchoolFeeManagement;
