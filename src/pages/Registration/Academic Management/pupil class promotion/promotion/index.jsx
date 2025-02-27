import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TableTemplate from '../../../../HOC/tabletemplate';
import MainCard from 'components/MainCard';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import PupilsService from '../../../../../services/pupilservice';
import ApiService from 'services/apiservice';

const columns = [
    {
        field: 'studentid',
        headerName: 'Student',
        foreign: 'student',
        foreignField: 'name'
    },
    {
        field: 'admission_no',
        headerName: 'Admission No',
        foreign: 'student',
        foreignField: 'admission_no'
    },
    { field: 'current_class_id', headerName: 'Class' },
    { field: 'academicyear', headerName: 'Academic Year' },
    { field: 'updated_at', headerName: 'Promoted At' },
];


function PupilClassPromotion() {
    const [refresh, setRefresh]=useState(false);

    const endpoint = 'home/get_data/sch_student_class_promotions';
    const handleEdit = () => {
        // Add your edit logic here if needed
    };
    
    const handleDelete = async (id) => {
        try {
            const data = { id };
            const response = await ApiService.delete('home/delete/sch_student_class_promotions', data);
            if (response.status === 200) {
                toast.success("Deleted successfully");
                setRefresh(!refresh);
            } else {
                toast.warning("Error, try again");
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
                refresh={refresh}
                buttons={buttons}
                columns={columns}
                endpoint={endpoint}
                handleDelete={handleDelete}
            />
        </MainCard>
    );
}

export default PupilClassPromotion;
