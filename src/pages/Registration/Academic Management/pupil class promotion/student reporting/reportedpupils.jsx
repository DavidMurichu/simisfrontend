import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TableTemplate from '../../../../HOC/tabletemplate';
import MainCard from 'components/MainCard';
import {toast, ToastContainer} from 'react-toastify';
import PupilsService from '../../../../../services/pupilservice';
import {Link} from "react-router-dom";

const columns = [
    { field: 'name', headerName: 'name' },
    { field: 'current_class_id', headerName: 'Current Class' },
    { field: 'current_term_id', headerName: 'Current Term' },
    { field: 'academicyearid', headerName: 'Academic Year' },
    { field: 'created_at', headerName: 'Created At' },
    { field: 'updated_at', headerName: 'Last Edited At' },
    { field: 'is_active', headerName: 'Is Active' },
];

function ReportedPupils() {
    const [refresh, setRefresh]=useState(false);
    const endpoint = 'home/promoted';
    const handleEdit=async()=>{

    }
    const handleDelete=async()=>{


    }

    const buttons = [
        { label: 'Edit', color: 'primary', handleFunction: handleEdit },
        { label: 'Delete', color: 'error', handleFunction: handleDelete },
    ];

    return (
        <MainCard title="Reported Pupils" style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}>
            <ToastContainer/>
            <Typography variant="body1" gutterBottom>
                Welcome to the Reported Pupils page. Here you can manage reported pupils and their details.
            </Typography>
            <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/report-student"
                sx={{ mb: 2 }}
            >
                Report Students
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

export default ReportedPupils;
