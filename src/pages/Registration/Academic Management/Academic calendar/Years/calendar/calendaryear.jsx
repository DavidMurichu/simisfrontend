import React from "react";
import { useNavigate} from "react-router-dom";
import { toast } from 'react-toastify';
import TableTemplate from "../../../../../HOC/tabletemplate";
import AcademicYearService from "../../../../../../services/calendarService";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const CalendarYear = () => {
    const columns = [
        { field: 'year', headerName: 'Year' },
        { field: 'createdon', headerName: 'Created On' },
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
    const endpoint = 'home/get_data/sys_years';
    const navigate = useNavigate();

    const handleDelete = async (id) => {
        try {
            await AcademicYearService.deleteCalendarYear(id);
            toast.success('Calendar year deleted successfully');
            // Optionally, refetch data to update the table
        } catch (error) {
            console.error('Error deleting calendar year:', error);
            toast.error('Failed to delete calendar year');
        }
    };

    const handleEdit = (id) => {
        navigate(`/academic-years/edit-calendar-year/${id}`);
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

export default CalendarYear;
