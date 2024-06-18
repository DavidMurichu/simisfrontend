import React from 'react';
import Typography from '@mui/material/Typography';
import MainCard from 'components/MainCard';
import TableTemplate from '../../../../HOC/tabletemplate';
import Button from "@mui/material/Button";
import {Link} from "react-router-dom";

const columns = [
    { field: 'name', headerName: 'Name' },
    { field: 'description', headerName: 'Description' },
    { field: 'createdby', headerName: 'Created By' },
    { field: 'lasteditedby', headerName: 'Last Edited By' },
    { field: 'ipaddress', headerName: 'IP Address' },
    { field: 'is_active', headerName: 'Is Active' },
    { field: 'created_at', headerName: 'Created At' },
    { field: 'updated_at', headerName: 'Updated At' },
];

function SchoolServiceDuration() {
    const endpoint = 'home/get_data/sch_service_durations';

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
        <MainCard title="School Service Duration" style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}>
            <Typography variant="body1" gutterBottom>
                Welcome to the School Service Duration page. Here you can manage the duration of school services.
            </Typography>
            <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/school-services-durations/add"
                sx={{ mb: 2 }}
            >
                Add School Service duration
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

export default SchoolServiceDuration;
