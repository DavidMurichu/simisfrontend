import React, { useState, useEffect } from 'react';
import { Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import TableTemplate from '../../../HOC/tabletemplate';
import MainCard from 'components/MainCard';
import axios from 'axios';
import Schoolservice from "../../../../services/schoolservice";
import SubjectsService from "../../../../services/SubjectService";
import Box from "@mui/material/Box";

const columns = [
    { field: 'id', headerName: '#', width: 100 },
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'servicedurationid', headerName: 'Duration', width: 150 },
    { field: 'cost', headerName: 'Cost', width: 150 },
    { field: 'description', headerName: 'Description', width: 300 },
    { field: 'is_transport_route', headerName: 'Is Transport', width: 150, type: 'boolean' },
    { field: 'created_at', headerName: 'Created On', width: 200 },
    { field: 'invoiced_once', headerName: 'Invoiced Once', width: 150, type: 'boolean' },
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

const SchoolServiceManagement = () => {
    const endpoint = 'home/get_data/sch_services ';
    const handleDelete = async (id) => {
        try {
            // await Schoolservice.deleteService(id);
            // Update state or perform any necessary action after deletion
            toast.success("Deleted subject successfully");
        } catch (error) {
            console.error('Error deleting subject:', error);
            toast.error("Error deleting subject. Please try again.");
        }
    };

    const handleEdit = (id) => {
        // Implement your edit logic here
        console.log('Edit subject with id:', id);
    };

    return (
        <MainCard title="School Service Management" style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}>
            <Typography variant="body1" gutterBottom>
                Welcome to the School Service Management page. Here you can manage school service details and their actions.
            </Typography>

            {/* Button for adding new school service */}
            <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/add-school-service"
                sx={{ mb: 2 }}
            >
                Add New School Service
            </Button>

            <TableTemplate
                columns={columns}
                endpoint={endpoint}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
            />
        </MainCard>
    );
};

export default SchoolServiceManagement;
