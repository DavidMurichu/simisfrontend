import React from 'react';
import {useNavigate} from "react-router-dom";
import { toast } from 'react-toastify';
import TableTemplate from "../../../../../HOC/tabletemplate";
import AcademicYearService from '../../../../../../services/calendarService';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const AcademicTermYear = () => {
    const columns = [
        { field: 'academicyear', headerName: 'Academic Year' },
        { field: 'term', headerName: 'Term' },
        { field: 'name', headerName: 'Name' },
        { field: 'description', headerName: 'Description' },
        { field: 'startdate', headerName: 'Start Date' },
        { field: 'enddate', headerName: 'End Date' },
        { field: 'is_active', headerName: 'Status', renderCell: (params) => (
                <Box
                    sx={{
                        backgroundColor: params.value ? 'green' : 'red',
                        color: 'white',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        display: 'inline-block'
                    }}
                >
                    <Typography variant="body2">
                        {params.value ? "Active" : "Inactive"}
                    </Typography>
                </Box>
            )}
    ];

    const endpoint = 'home/get_data/sch_academic_year_terms';
    const navigate = useNavigate();

    const handleDelete = async (id) => {
        try {
            await AcademicYearService.deleteAcademicYearTerm(id);
            toast.success('Academic year term deleted successfully');
            // Optionally, refetch data to update the table
        } catch (error) {
            console.error('Error deleting academic year term:', error);
            toast.error('Failed to delete academic year term');
        }
    };

    const handleEdit = (id) => {
        navigate(`/academic-year-terms/edit/${id}`);
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

export default AcademicTermYear;
