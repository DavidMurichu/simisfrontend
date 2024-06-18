import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import TableTemplate from "../../../../HOC/tabletemplate";
import AcademicYearService from "../../../../../services/calendarService";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const AcademicYear = () => {
    const columns = [
        { field: 'name', headerName: 'Name' },
        { field: 'description', headerName: 'Description' },
        { field: 'startdate', headerName: 'Start Date' },
        { field: 'enddate', headerName: 'End Date' },
        { field: 'createdby', headerName: 'Created By' },
        { field: 'lasteditedby', headerName: 'Last Edited By' },
        { field: 'ipaddress', headerName: 'IP Address', renderCell: (params) => (params.value || 'N/A') },
        { field: 'is_active', headerName: 'Is Active', renderCell: (params) => (
                <Box
                    sx={{
                        backgroundColor: params.value === '1' ? 'green' : 'red',
                        color: 'white',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        display: 'inline-block'
                    }}
                >
                    <Typography variant="body2">
                        {params.value === '1' ? "Active" : "Inactive"}
                    </Typography>
                </Box>
            )}
    ];

    const endpoint = 'home/get_data/sch_academic_year_terms';
    const navigate = useNavigate();

    const handleDelete = async (id) => {
        try {
            await AcademicYearService.deleteAcademicYear(id);
            toast.success('Academic year deleted successfully');
            // Optionally, refetch data to update the table
        } catch (error) {
            console.error('Error deleting academic year:', error);
            toast.error('Failed to delete academic year');
        }
    };

    const handleEdit = (id) => {
        navigate(`/academic-years/edit-academic-year/${id}`);
    };

    return (
        <TableTemplate
            columns={columns}
            endpoint={endpoint}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}
        />
    );
};

export default AcademicYear;
