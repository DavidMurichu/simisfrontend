import React, { useEffect, useState } from "react";
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
import TableContainer from "@mui/material/TableContainer";
import TablePagination from '@mui/material/TablePagination';
import TextField from '@mui/material/TextField';
import AcademicYearService from "../../../../../services/calendarService";

function AcademicYear() {
    const [academicYears, setAcademicYears] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchQuery, setSearchQuery] = useState('');

    const fetchAcademicYears = async () => {
        try {
            const response = await AcademicYearService.getAllAcademicYears();
            setAcademicYears(response.data);
        } catch (error) {
            console.error('Error fetching academic years:', error);
        }
    };

    useEffect(() => {
        fetchAcademicYears();
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
            await AcademicYearService.deleteAcademicYear(id);
            fetchAcademicYears(); // Refresh the list after deletion
            toast.success('Academic year deleted successfully');
        } catch (error) {
            console.error('Error deleting academic year:', error);
            toast.error('Failed to delete academic year');
        }
    };

    const filteredAcademicYears = academicYears.filter((year) =>
        year.name && year.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div>
            <Box mb={2} display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="h4">Academic Years</Typography>
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
                            <TableCell>Name</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Start Date</TableCell>
                            <TableCell>End Date</TableCell>
                            <TableCell>Created By</TableCell>
                            <TableCell>Last Edited By</TableCell>
                            <TableCell>IP Address</TableCell>
                            <TableCell>Is Active</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredAcademicYears
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((year) => (
                                <TableRow key={year.id}>
                                    <TableCell>{year.name}</TableCell>
                                    <TableCell>{year.description}</TableCell>
                                    <TableCell>{year.startdate}</TableCell>
                                    <TableCell>{year.enddate}</TableCell>
                                    <TableCell>{year.createdby}</TableCell>
                                    <TableCell>{year.lasteditedby}</TableCell>
                                    <TableCell>{year.ipaddress || 'N/A'}</TableCell>
                                    <TableCell>
                                        <Box
                                            sx={{
                                                backgroundColor: year.is_active === '1' ? 'green' : 'red',
                                                color: 'white',
                                                padding: '4px 8px',
                                                borderRadius: '4px',
                                                display: 'inline-block'
                                            }}
                                        >
                                            <Typography variant="body2">
                                                {year.is_active === '1' ? "Active" : "Inactive"}
                                            </Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            component={Link}
                                            to={`/academic-years/edit-academic-year/${year.id}`}
                                            sx={{ mr: 1 }}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            color="secondary"
                                            onClick={() => handleDelete(year.id)}
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
                count={filteredAcademicYears.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </div>
    );
}

export default AcademicYear;
