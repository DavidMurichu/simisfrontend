import React from 'react';
import Typography from '@mui/material/Typography';
import MainCard from 'components/MainCard';
import TableTemplate from '../../../../HOC/tabletemplate';
import Button from "@mui/material/Button";
import {Link} from "react-router-dom";

const columns = [
    { field: 'id', headerName: 'ID' },
    { field: 'name', headerName: 'Name' },
    { field: 'description', headerName: 'Description' },
    { field: 'createdby', headerName: 'Created By' },
    { field: 'lasteditedby', headerName: 'Last Edited By' },
    { field: 'ipaddress', headerName: 'IP Address' },
    { field: 'is_active', headerName: 'Is Active' },
    { field: 'created_at', headerName: 'Created At' },
    { field: 'updated_at', headerName: 'Updated At' },
];

function VisitorType() {
    const endpoint = 'home/get_data/sch_visitor_types';

    const handleDelete = async (id) => {
        try {
            // Implement delete logic here
        } catch (error) {
            console.error('Error deleting record:', error);
        }
    };

    const handleEdit = (id) => {
        // Implement edit logic here
    };

    return (
        <MainCard title="Visitor Type Management">
            <Typography variant="body1" gutterBottom>
                Welcome to the Visitor Type Management page. Here you can manage visitor types and their details.
            </Typography>
            <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/visitor-type/add"
                sx={{ mb: 2 }}
            >
                Add Visitor type
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

export default VisitorType;
