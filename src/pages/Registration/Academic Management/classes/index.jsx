import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TableTemplate from '../../../HOC/tabletemplate';
import {Link} from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";

const columns = [
    { field: 'name', headerName: 'Name' },
    { field: 'description', headerName: 'Description' },
    { field: 'created_at', headerName: 'Created On' },
    { field: 'createdby', headerName: 'Created By' },
    { field: 'updated_at', headerName: 'Last Edited On' },
    { field: 'lasteditedby', headerName: 'Last Edited By' },
    { field: 'ipaddress', headerName: 'IP Address' },
    { field: 'is_active', headerName: 'Status' },
];

const Classes = () => {
    const endpoint = 'home/get_data/sch_classes';
    const handleDelete = (id) => {
        console.log('Delete class with id:', id);
    };

    const handleEdit = (id) => {
        console.log('Edit class with id:', id);
    };

    return (
        <div style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}>
            <Typography variant="h5" gutterBottom>
                Class Management
            </Typography>
            <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/classes/add-class"
                sx={{ mr: 1 }}
            >
                Add new Class
            </Button>
            <TableTemplate
                columns={columns}
                endpoint={endpoint}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
            />
        </div>
    );
};

export default Classes;
