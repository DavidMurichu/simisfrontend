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
import PupilsService from '../../../../services/pupilservice';

function PupilClassPromotion() {
    const [pupils, setPupils] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchQuery, setSearchQuery] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    const [deletePupilId, setDeletePupilId] = useState(null);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

    const fetchPupils = async () => {
        try {
            const response = await PupilsService.getPromotedPupil();
            setPupils(response.data);
        } catch (error) {
            console.error('Error fetching pupils:', error);
        }
    };

    useEffect(() => {
        fetchPupils();
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

    const handleDeletePupil = (pupilId) => {
        setDeletePupilId(pupilId);
        setOpenDeleteDialog(true);
    };

    const handleConfirmDelete = async () => {
        try {
            // Implement logic to delete pupil from the service
            // await PupilsService.deletePupil(deletePupilId);
            // Update pupils state after deletion
            // setPupils(pupils.filter(pupil => pupil.id !== deletePupilId));
            setOpenDeleteDialog(false);
        } catch (error) {
            console.error('Error deleting pupil:', error);
        }
    };

    const handleCloseDialog = () => {
        setOpenDeleteDialog(false);
    };

    const filteredPupils = pupils.filter((pupil) =>
        pupil.class_name && pupil.class_name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <MainCard title="Pupil Class Promotion">
            <Typography variant="body1" gutterBottom>
                Welcome to the Pupil Class Promotion page. Here you can manage pupil promotions and their details.
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
                to="/promote-student"
                sx={{ mb: 2 }}
            >
                Promote Student
            </Button>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell>Student ID</TableCell>
                            <TableCell>Class</TableCell>
                            <TableCell>Academic Year</TableCell>
                            <TableCell>Promoted On</TableCell>
                            <TableCell>Last Updated</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredPupils
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((pupil, index) => (
                                <TableRow key={pupil.id}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{pupil.studentid}</TableCell>
                                    <TableCell>{pupil.class_name}</TableCell>
                                    <TableCell>{pupil.academicyear}</TableCell>
                                    <TableCell>{pupil.promotedon || 'N/A'}</TableCell>
                                    <TableCell>{pupil.updated_at}</TableCell>
                                    <TableCell>
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            component={Link}
                                            to={`/registration/view-pupil/${pupil.id}`}
                                            sx={{ mr: 1 }}
                                        >
                                            View Pupil
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            color="secondary"
                                            onClick={() => handleDeletePupil(pupil.id)}
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
                count={filteredPupils.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />

            <Dialog open={openDeleteDialog} onClose={handleCloseDialog}>
                <DialogTitle>Delete Pupil</DialogTitle>
                <DialogContent>
                    Are you sure you want to delete this pupil?
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancel</Button>
                    <Button onClick={handleConfirmDelete} color="secondary">Delete</Button>
                </DialogActions>
            </Dialog>
        </MainCard>
    );
}

export default PupilClassPromotion;
