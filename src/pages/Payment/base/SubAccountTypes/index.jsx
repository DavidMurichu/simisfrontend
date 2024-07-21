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
    { field: 'name', headerName: 'Sub Account Name' },
    { field: 'accounttypeid', headerName: 'Account Type ID' },
    { field: 'priority', headerName: 'Priority', sortable: true },
    { field: 'remarks', headerName: 'Remarks', sortable: false },
    { field: 'ipaddress', headerName: 'IP Address', sortable: false },
    { field: 'createdby', headerName: 'Created By', sortable: false },
    { field: 'lasteditedby', headerName: 'Last Edited By', sortable: false },
    { field: 'is_active', headerName: 'Is Active', sortable: true },
    { field: 'created_at', headerName: 'Created At', sortable: true },
    { field: 'updated_at', headerName: 'Updated At', sortable: true }
];


function PaymentSubAccountTypes() {
    const [refresh, setRefresh]=useState(false);
    const endpoint = 'home/get_data/sub_account_types';
    
    const handleEdit=()=>{

    }
    const handleDelete = async (id) => {
        try {

            const data={
                id:id
            }
            // Example of how to use toast
            // Uncomment and add your delete logic here
            const response = await ApiService.delete('home/delete/sub_account_types', data);
            if (response.status === 200) {
            toast.success("Deleted successfully");
            setRefresh(!refresh);
            } else {
                toast.warning("Error, try again");
            }
        } catch (error) {
            console.error('Error deleting :', error);
            toast.error("Error deleting . Please try again.");
        }
    };
    const buttons = [
        { label: 'Edit', color: 'primary', handleFunction: handleEdit },
        { label: 'Delete', color: 'error', handleFunction: handleDelete },
    ];
    return (
        <MainCard title="Sub Account Types Management" style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}>
            <Typography variant="body1" gutterBottom>
                Welcome to the Sub Account Types Management page. Here you can manage sub account types details and their actions.
            </Typography>

            {/* Button for adding new sub account type */}
            <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/payment/add-sub-account-types"
                sx={{ mr: 1 }}
            >
                Add New Sub Account Type
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

export default PaymentSubAccountTypes;
