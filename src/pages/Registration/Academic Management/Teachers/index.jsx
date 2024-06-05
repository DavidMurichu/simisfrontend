import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TableTemplate from '../../../HOC/tabletemplate';
import MainCard from 'components/MainCard';
import { Link } from 'react-router-dom';
import { toast } from "react-toastify";
import TeacherService from "../../../../services/TeacherService";

const columns = [
    { field: 'name', headerName: 'Name' },
    { field: 'surname', headerName: 'Surname' },
    { field: 'firstname', headerName: 'First Name' },
    { field: 'lastname', headerName: 'Last Name' },
    { field: 'title', headerName: 'Title' },
    { field: 'mobileno', headerName: 'Mobile No' },
    { field: 'email', headerName: 'Email' },
    { field: 'physicaladdress', headerName: 'Physical Address' },
    { field: 'createdon', headerName: 'Created On'},
    { field: 'is_active', headerName: 'Is Active'},

];

function Teachers() {
    const endpoint = 'home/get_data/sch_teachers';

    const handleDelete = async (id) => {
        try {
            const response = await TeacherService.deletePerson(id);
            if (response.status === 200) {
                toast.success("Deleted teacher successfully");
            } else {
                toast.warning("Error, try again");
            }
        } catch (error) {
            console.error('Error deleting teacher:', error);
            toast.error("Error deleting teacher. Please try again.");
        }
    };

    return (
        <MainCard title="Teacher Management">
            <Typography variant="body1" gutterBottom>
                Welcome to the Teacher Management page. Here you can manage teacher details and their actions.
            </Typography>

            {/* Button for adding new teacher */}
            <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/add-teacher"
                sx={{ mb: 2 }}
            >
                Add New Teacher
            </Button>
            <TableTemplate
                columns={columns}
                endpoint={endpoint}
                handleDelete={handleDelete}
            />
        </MainCard>
    );
}

export default Teachers;
