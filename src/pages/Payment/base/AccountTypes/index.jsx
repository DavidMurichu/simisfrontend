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
    { field: 'name', headerName: 'Name' },
    { field: 'subaccounttypeid', headerName: 'Sub Account Type ID' },
    { field: 'createdby', headerName: 'Created By' },
    { field: 'lasteditedby', headerName: 'Last Edited By' },
    { field: 'ipaddress', headerName: 'IP Address' },
    { field: 'is_active', headerName: 'Is Active' },
    { field: 'created_at', headerName: 'Created At' },
    { field: 'updated_at', headerName: 'Updated At' }
];


function PaymentAccountTypes() {
    const [refresh, setRefresh]=useState(false);
    const endpoint = 'home/get_data/account_types';
    const handleEdit=()=>{

    }
    const handleDelete = async (id) => {
        try {

            const data={
                id:id
            }
            // Example of how to use toast
            // Uncomment and add your delete logic here
            const response = await ApiService.delete('home/delete/account_types', data);
            if (response.status === 200) {
            toast.success("Deleted successfully");
            setRefresh(!refresh);
            } else {
                toast.warning("Error, try again");
            }
        } catch (error) {
            console.error('Error deleting :', error);
            toast.error("Error deleting Please try again.");
        }
    };

    const buttons = [
        { label: 'Edit', color: 'primary', handleFunction: handleEdit },
        { label: 'Delete', color: 'error', handleFunction: handleDelete },
    ];

    return (
        <MainCard title="Account Types Management" style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}>
            <Typography variant="body1" gutterBottom>
                Welcome to the  Account Types Management page. Here you can manage Account Types details and their actions.
            </Typography>

            {/* Button for adding new administrative charge */}
            <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/payment/add-account-type"
                sx={{ mr: 1 }}
            >
                Add New Account Type
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






export default PaymentAccountTypes;

