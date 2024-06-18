import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TableTemplate from '../../../HOC/tabletemplate';
import MainCard from 'components/MainCard';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import SubjectsService from "../../../../services/SubjectService";
import Box from "@mui/material/Box";

const columns = [
    { field: 'id', headerName: 'ID' },
    { field: 'name', headerName: 'Name' },
    { field: 'subject_code', headerName: 'Subject Code' },
    { field: 'description', headerName: 'Description' },
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
    { field: 'created_at', headerName: 'Created At' },
    { field: 'updated_at', headerName: 'Updated At' },
];

function Subjects() {
    const endpoint = 'home/get_data/sch_subjects'; // Replace 'your-api-endpoint' with your actual API endpoint

    const handleDelete = async (id) => {
        try {
            await SubjectsService.deleteSubject(id);
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
        <MainCard title="Subject Management" style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}>
            <Typography variant="body1" gutterBottom>
                Welcome to the Subject Management page. Here you can manage subjects and their details.
            </Typography>

            {/* Button to add new subject */}
            <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/subject-management/add-subject"
                sx={{ mb: 2 }}
            >
                Add New Subject
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

export default Subjects;
