import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TableTemplate from '../../../HOC/tabletemplate';
import MainCard from 'components/MainCard';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import GenderService from '../../../../services/pupilservice';

const columns = [
    { field: 'name', headerName: 'Name' },
    { field: 'description', headerName: 'Description' },
    { field: 'is_active', headerName: 'Is Active' },
];

function Gender() {
    const endpoint = 'home/get_data/sch_student_genders';
    const handleDelete = async (id) => {
        try {
            const response = await GenderService.deleteGender(id);
            if (response.status === 200) {
                toast.success('Deleted gender successfully');
            } else {
                toast.warning('Error deleting gender. Please try again.');
            }
        } catch (error) {
            console.error('Error deleting gender:', error);
            toast.error('Error deleting gender. Please try again.');
        }
    };

    const handleEdit = (id) => {
        // Implement your edit logic here
        console.log('Edit gender with id:', id);
    };

    return (
        <MainCard title="Gender Management">
            <Typography variant="body1" gutterBottom>
                Welcome to the Gender Management page. Here you can manage gender details and their actions.
            </Typography>

            <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/add-gender"
                sx={{ mb: 2 }}
            >
                Add Gender
            </Button>

            <TableTemplate
                columns={columns}
                endpoint={endpoint}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
            />
        </MainCard>
    );
}

export default Gender;
