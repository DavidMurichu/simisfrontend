import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TablePagination from '@mui/material/TablePagination';
import MainCard from 'components/MainCard';
import { Link } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import { ButtonGroup } from '@mui/material';
const fetchRecentPupils = () => {
    // Mock data
    const recentPupils = [
        { id: 1, name: 'John Doe', gender: 'Male' },
        { id: 2, name: 'Jane Smith', gender: 'Female' },
    ];

    return recentPupils;
};

export default function StudentInformation() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [recentPupils, setRecentPupils] = useState(fetchRecentPupils());
    const [filterGender, setFilterGender] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [showFilters, setShowFilters] = useState(false);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleFilterGender = (gender) => {
        setFilterGender(gender);
        setShowFilters(false);
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredPupils = recentPupils.filter((pupil) =>
        pupil.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (filterGender === 'All' || pupil.gender === filterGender)
    );

    return (
        <MainCard title="Student Information">
            <Typography variant="body1" gutterBottom>
                Welcome to the Student Information page. Here you can manage pupils/students and view their statistics.
            </Typography>

            {/* Search and filter controls */}
            <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
                <Box display="flex" alignItems="center">
                    <Button variant="contained" color="primary" component={Link} to="/registration/add-pupil" sx={{ mr: 1 }}>
                        Add Pupil
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        component={Link}
                        to="/registration/automation"
                        sx={{ mr: 1, backgroundColor: '#3f51b5', color: 'white' }}
                        startIcon={<SmartToyIcon />}
                    >
                        Registration Automation
                    </Button>
                    <TextField
                        label="Search"
                        variant="outlined"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        size="small"
                        sx={{ mr: 1 }}
                    />
                </Box>
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => setShowFilters(!showFilters)}
                >
                    {showFilters ? 'Hide Filters' : 'Show Filters'}
                </Button>
            </Box>

            <Collapse in={showFilters}>
                <Box mb={2}>
                    <ButtonGroup variant="outlined" color="primary" aria-label="Filter gender">
                        {['All', 'Male', 'Female'].map((gender) => (
                            <Button
                                key={gender}
                                variant={filterGender === gender ? 'contained' : 'outlined'}
                                onClick={() => handleFilterGender(gender)}
                            >
                                {gender}
                            </Button>
                        ))}
                    </ButtonGroup>
                </Box>
            </Collapse>

            {/* Table showing recent pupils */}
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Gender</TableCell>
                            <TableCell>View Details</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredPupils.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((pupil) => (
                            <TableRow key={pupil.id}>
                                <TableCell>{pupil.name}</TableCell>
                                <TableCell>{pupil.gender}</TableCell>
                                <TableCell>
                                    <Link to={`/registration/view-pupil/${pupil.id}`}>View Details</Link>
                                </TableCell>
                                <TableCell>
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        component={Link}
                                        to={`/registration/edit-pupil/${pupil.id}`}
                                        sx={{ mr: 1 }}
                                    >
                                        Edit
                                    </Button>
                                    <Button variant="outlined" color="secondary">
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Pagination for recent pupils */}
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={filteredPupils.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </MainCard>
    );
}
