import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TableTemplate from '../../../../HOC/tabletemplate';
import MainCard from 'components/MainCard';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import PupilsService from '../../../../../services/pupilservice';

const columns = [
    { field: 'admission_no', headerName: 'Admission No' },
    { field: 'name', headerName: 'Student Name' },
    { field: 'current_class_id', headerName: 'Current Class' },
    { field: 'academicyearid', headerName: 'Academic Year' },

    { field: 'updated_at', headerName: 'Promoted At' },
];

function PupilClassPromotion() {
    const endpoint = 'home/promoted/students';
    const handleDelete = async (id) => {
        try {
            await PupilsService.deletePupil(id);
            toast.success('Deleted pupil successfully');
        } catch (error) {
            console.error('Error deleting pupil:', error);
            toast.error('Error deleting pupil. Please try again.');
        }
    };

    return (
        <MainCard title="Pupil Class Promotion" style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}>
            <Typography variant="body1" gutterBottom>
                Welcome to the Pupil Class Promotion page. Here you can manage pupil promotions and their details.
            </Typography>

            <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/promote-student"
                sx={{ mb: 2 }}
            >
                Promote Student
            </Button>

            <TableTemplate
                columns={columns}
                endpoint={endpoint}
                handleDelete={handleDelete}
            />
        </MainCard>
    );
}

export default PupilClassPromotion;
