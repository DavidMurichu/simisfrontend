import React from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import TableTemplate from '../../../HOC/tabletemplate';
import MainCard from 'components/MainCard';

const columns = [
    { field: 'teacheronduty', headerName: 'Teacher on Duty' },
    { field: 'recording_date', headerName: 'Recording Date' },
    { field: 'general_comment', headerName: 'General Comment' },
    { field: 'createdby', headerName: 'Created By' },
    { field: 'lasteditedby', headerName: 'Last Edited By' },
    { field: 'ipaddress', headerName: 'IP Address' },
    { field: 'is_active', headerName: 'Is Active' },
    { field: 'created_at', headerName: 'Created At' },
    { field: 'updated_at', headerName: 'Updated At' },
];

function ClassDailyRecordings() {
    const endpoint = 'home/get_data/sch_class_daily_recordings'; // Replace with your actual API endpoint

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
        <MainCard title="Class Daily Recordings" style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}>
            <Typography variant="body1" gutterBottom>
                Manage daily recordings for classes.
            </Typography>

            {/* Button for adding new record */}
            <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/class-daily-recording/add"
                sx={{ mb: 2 }}
            >
                Add Daily Recording
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

export default ClassDailyRecordings;
