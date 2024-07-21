import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import MainCard from 'components/MainCard';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import TableTemplate from 'pages/HOC/tabletemplate';
import ApiService from 'services/apiservice';

function BanksManagement() {
    const [refresh, setRefresh] = useState(false);
    const endpoint = 'home/get_data/banks';
    
    const handleEdit = () => {
        // Implement edit functionality if needed
    };

    const handleDelete = async (id) => {
        try {
            const data = { id: id };
            const response = await ApiService.delete('home/delete/banks', data);
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

    // Adjusted columns to match fillable fields in Laravel model 'Bank'
    const columns = [
        { field: 'id', headerName: 'ID' },
        { field: 'name', headerName: 'Name' },
        { field: 'createdby', headerName: 'Created By' },
        { field: 'lasteditedby', headerName: 'Last Edited By' },
        { field: 'ipaddress', headerName: 'IP Address' },
        { field: 'description', headerName: 'Description' },
        { field: 'is_active', headerName: 'Is Active' },
        { field: 'created_at', headerName: 'Created At' },
        { field: 'updated_at', headerName: 'Updated At' }
    ];

    return (
        <MainCard title="Banks Management" style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}>
            <Typography variant="body1" gutterBottom>
                Welcome to the Banks Management page. Here you can manage bank details and their actions.
            </Typography>

            {/* Button for adding new bank */}
            <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/payment/add-bank"
                sx={{ mr: 1 }}
            >
                Add New Bank
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

export default BanksManagement;
