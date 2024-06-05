import React, { useState, useEffect } from "react";
import TableTemplate from '../../../../HOC/tabletemplate';
import AcademicYearService from "../../../../../services/calendarService";
import { toast } from 'react-toastify';
import Typography from "../../../../../themes/typography";
import {useNavigate} from "react-router-dom";
import Box from "@mui/material/Box";

function Term() {
    const [terms, setTerms] = useState([]);
  const navigate = useNavigate();

    const fetchTerms = async () => {
        try {
            const response = await AcademicYearService.getAllTerms();
            const termsData = response.data;
            setTerms(termsData);
        } catch (error) {
            console.error('Error fetching terms:', error);
        }
    };

    useEffect(() => {
        fetchTerms();
    }, []);

    const handleDelete = async (id) => {
        try {
            await AcademicYearService.deleteTerm(id);
            fetchTerms();
            toast.success('Term deleted successfully');
        } catch (error) {
            console.error('Error deleting term:', error);
            toast.error('Failed to delete term');
        }
    };

    const handleEdit = (id) => {
        history.push(`/academic-years/edit-term/${id}`);
    };
    const endpoint = 'home/get_data/sch_terms';
    const columns = [
        { field: 'name', headerName: 'Term Name' },
        { field: 'description', headerName: 'Description' },
        { field: 'is_active', headerName: 'Status', renderCell: (row) => (
                <Box
                    sx={{
                        backgroundColor: row.is_active === '1' ? 'green' : 'red',
                        color: 'white',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        display: 'inline-block'
                    }}
                >
                    <Typography variant="body2">
                        {row.is_active === '1' ? "Active" : "Inactive"}
                    </Typography>
                </Box>
            )}
    ];

    return (
        <TableTemplate
            columns={columns}
            endpoint={endpoint}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
        />
    );
}

export default Term;
