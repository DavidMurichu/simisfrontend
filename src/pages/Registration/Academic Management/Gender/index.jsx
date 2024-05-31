import React, { useState, useEffect } from 'react';
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
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import MainCard from 'components/MainCard';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import GenderService from '../../../../services/pupilservice';

function Gender() {
    const [genders, setGenders] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchQuery, setSearchQuery] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    const [deleteGenderId, setDeleteGenderId] = useState(null);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

    const fetchGenders = async () => {
        try {
            const response = await GenderService.getAllGenders();
            setGenders(response.data);
        } catch (error) {
            console.error('Error fetching genders:', error);
            toast.error('Error fetching genders. Please try again.');
        }
    };

    useEffect(() => {
        fetchGenders();
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

    const handleDeleteGender = (genderId) => {
        setDeleteGenderId(genderId);
        setOpenDeleteDialog(true);
    };

    const handleConfirmDelete = async () => {
        try {
            // Replace with actual API call to delete gender
            const response = await GenderService.deleteGender(deleteGenderId);
            if (response.status === 200) {
                toast.success('Deleted gender successfully');
                setGenders(genders.filter(gender => gender.id !== deleteGenderId));
                setOpenDeleteDialog(false);
            } else {
                toast.warning('Error deleting gender. Please try again.');
            }
        } catch (error) {
            console.error('Error deleting gender:', error);
            toast.error('Error deleting gender. Please try again.');
        }
    };

    const handleCloseDialog = () => {
        setOpenDeleteDialog(false);
    };

    const filteredGenders = genders.filter((gender) =>
        gender.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <MainCard title="Gender Management">
            <Typography variant="body1" gutterBottom>
                Welcome to the Gender Management page. Here you can manage gender details and their actions.
            </Typography>

            <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
                <TextField
                    label="Search"
                    variant="outlined"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    size="small"
                />
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
                    {/* Add filter options here if needed */}
                </Box>
            </Collapse>
            <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/add-gender"
                sx={{ mb: 2 }}
            >
                Add Gender
            </Button>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Is Active</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredGenders
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((gender, index) => (
                                <TableRow key={gender.id}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{gender.name}</TableCell>
                                    <TableCell>{gender.description}</TableCell>
                                    <TableCell>{gender.is_active === '1' ? 'Active' : 'Inactive'}</TableCell>
                                    <TableCell>
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            component={Link}
                                            to={`/edit-gender/${gender.id}`}
                                            sx={{ mr: 1 }}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            color="secondary"
                                            onClick={() => handleDeleteGender(gender.id)}
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
                count={filteredGenders.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />

            <Dialog open={openDeleteDialog} onClose={handleCloseDialog}>
                <DialogTitle>Delete Gender</DialogTitle>
                <DialogContent>
                    Are you sure you want to delete this gender?
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancel</Button>
                    <Button onClick={handleConfirmDelete} color="secondary">Delete</Button>
                </DialogActions>
            </Dialog>
        </MainCard>
    );
}

export default Gender;
