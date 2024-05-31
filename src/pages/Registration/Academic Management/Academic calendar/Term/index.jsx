import React, { useEffect, useState } from "react";
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
import TablePagination from '@mui/material/TablePagination';
import TextField from '@mui/material/TextField';
import AcademicYearService from "../../../../../services/calendarService";
import { toast } from 'react-toastify';

function Term() {
    const [terms, setTerms] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

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

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleDelete = async (id) => {
        try {
            await AcademicYearService.deleteTerm(id);
            fetchTerms(); // Refresh the list after deletion
            toast.success('Term deleted successfully');
        } catch (error) {
            console.error('Error deleting term:', error);
            toast.error('Failed to delete term');
        }
    };

    const filteredTerms = terms.filter((term) =>
        term.name && term.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div>
            <Box mb={2} display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="h4">Terms</Typography>
                <TextField
                    label="Search"
                    variant="outlined"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    size="small"
                />
            </Box>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Term Name</TableCell>
                            <TableCell>Start Date</TableCell>
                            <TableCell>End Date</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredTerms
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((term) => (
                                <TableRow key={term.id}>
                                    <TableCell>{term.name}</TableCell>
                                    <TableCell>{term.start_date}</TableCell>
                                    <TableCell>{term.end_date}</TableCell>
                                    <TableCell>{term.description || 'N/A'}</TableCell>
                                    <TableCell>
                                        <Box
                                            sx={{
                                                backgroundColor: term.is_active === '1' ? 'green' : 'red',
                                                color: 'white',
                                                padding: '4px 8px',
                                                borderRadius: '4px',
                                                display: 'inline-block'
                                            }}
                                        >
                                            <Typography variant="body2">
                                                {term.is_active === '1' ? "Active" : "Inactive"}
                                            </Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            component={Link}
                                            to={`/academic-years/edit-term/${term.id}`}
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
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={filteredTerms.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </div>
    );
}

export default Term;
