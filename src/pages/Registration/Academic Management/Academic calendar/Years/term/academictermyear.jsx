import React, { useEffect, useState } from 'react';
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import AcademicYearService from '../../../../../../services/calendarService';

function AcademicTermYear() {
    const [academicYearTerms, setAcademicYearTerms] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const fetchAcademicYearTerms = async () => {
        try {
            const response = await AcademicYearService.getAllAcademicYearTerms();
            setAcademicYearTerms(response.data);
            console.log("Academic year team", academicYearTerms);
        } catch (error) {
            console.error('Error fetching academic year terms:', error);
        }
    };

    useEffect(() => {
        fetchAcademicYearTerms();
    }, []);

    const filteredAcademicYearTerms = academicYearTerms.filter((term) =>
        term.name && term.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div>
            <Typography variant="h4" gutterBottom>
                Academic Year Terms
            </Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Academic Year</TableCell>
                            <TableCell>Term</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Start Date</TableCell>
                            <TableCell>End Date</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredAcademicYearTerms
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((term) => (
                                <TableRow key={term.id}>
                                    <TableCell>{term.academicyear}</TableCell>
                                    <TableCell>{term.term}</TableCell>
                                    <TableCell>{term.name}</TableCell>
                                    <TableCell>{term.description}</TableCell>
                                    <TableCell>{term.startdate}</TableCell>
                                    <TableCell>{term.enddate}</TableCell>
                                    <TableCell>
                                        <Box
                                            sx={{
                                                backgroundColor: term.is_active ? 'green' : 'red',
                                                color: 'white',
                                                padding: '4px 8px',
                                                borderRadius: '4px',
                                                display: 'inline-block'
                                            }}
                                        >
                                            <Typography variant="body2">
                                                {term.is_active ? "Active" : "Inactive"}
                                            </Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            component={Link}
                                            to={`/academic-year-terms/edit/${term.id}`}
                                            sx={{ mr: 1 }}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            color="secondary"
                                            onClick={() => handleDelete(term.id)}
                                        >
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default AcademicTermYear;
