import React from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import TableTemplate from '../../../HOC/tabletemplate';
import MainCard from 'components/MainCard';
import { toast } from 'react-toastify';
import VisitorService from '../../../../services/visitortypeservice';
import Box from "@mui/material/Box";

const columns = [
    { field: 'name', headerName: 'Name' },
    { field: 'mobile', headerName: 'Mobile' },
    { field: 'date_visited', headerName: 'Date Visited' },
    { field: 'classid', headerName: 'Class ID' },
    { field: 'visiting_reason', headerName: 'Visiting Reason' },
    { field: 'sms', headerName: 'SMS' },
    { field: 'createdby', headerName: 'Created By' },
    { field: 'lasteditedby', headerName: 'Last Edited By' },
    { field: 'ipaddress', headerName: 'IP Address' },
    { field: 'is_active', headerName: 'Is Active', renderCell: (row) => (
            <Box
                sx={{
                    backgroundColor: row.is_active ? 'green' : 'red',
                    color: 'white',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    display: 'inline-block'
                }}
            >
                <Typography variant="body2">
                    {row.is_active ? "Active" : "Inactive"}
                </Typography>
            </Box>
        )},
];

function VisitorManagement() {
    const endpoint = 'home/get_data/sch_visitor_registers';

    const handleDelete = async (id) => {
        try {
            const response = await VisitorService.deleteVisitor(id);
            if (response.status === 200) {
                toast.success('Deleted visitor successfully');
            } else {
                toast.warning('Error deleting visitor. Please try again.');
            }
        } catch (error) {
            console.error('Error deleting visitor:', error);
            toast.error('Error deleting visitor. Please try again.');
        }
    };

    const handleEdit = (id) => {
        // Implement your edit logic here
        console.log('Edit visitor with id:', id);
    };

    return (
        <MainCard title="Visitor Management">
            <Typography variant="body1" gutterBottom>
                Welcome to the Visitor Management page. Here you can manage visitor details and their actions.
            </Typography>

            {/* Button to add new visitor */}
            <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/visitor/add-visitor"
                sx={{ mb: 2 }}
            >
                Add New Visitor
            </Button>

            {/* Render the table using TableTemplate */}
            <TableTemplate
                columns={columns}
                endpoint={endpoint}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
            />
        </MainCard>
    );
}

export default VisitorManagement;
