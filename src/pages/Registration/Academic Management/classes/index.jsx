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
import CircularProgress from '@mui/material/CircularProgress';
import MainCard from 'components/MainCard';
import { Link } from 'react-router-dom';
import ClassesService from "../../../../services/classesService";

export default function Classes() {
    const [classes, setClasses] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchQuery, setSearchQuery] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    const [deleteClassId, setDeleteClassId] = useState(null);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [loading, setLoading] = useState(true);

    const fetchClasses = async () => {
        try {
            const response = await ClassesService.getAllClasses();
            console.log("Fetched classes data:", response.data);
            setClasses(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching classes:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchClasses();
    }, []);

    useEffect(() => {
        console.log("Classes state:", classes);
    }, [classes]);

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

    const handleDeleteClass = (classId) => {
        setDeleteClassId(classId);
        setOpenDeleteDialog(true);
    };

    const handleConfirmDelete = async () => {
        try {
            // Call your delete API here
            setClasses(classes.filter(classItem => classItem.id !== deleteClassId));
            setOpenDeleteDialog(false);
        } catch (error) {
            console.error('Error deleting class:', error);
        }
    };

    const handleCloseDialog = () => {
        setOpenDeleteDialog(false);
    };

    const filteredClasses = classes.filter((classItem) =>
        classItem.name && classItem.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <MainCard title="Class Management">
            <Typography variant="body1" gutterBottom>
                Welcome to the Class Management page. Here you can manage school classes and their details.
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
                to="/classes/add-class"
                sx={{ mb: 2 }}
            >
                Add New Class
            </Button>

            {loading ? (
                <CircularProgress />
            ) : (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Description</TableCell>
                                <TableCell>Created On</TableCell>
                                <TableCell>Created By</TableCell>
                                <TableCell>Last Edited On</TableCell>
                                <TableCell>Last Edited By</TableCell>
                                <TableCell>IP Address</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredClasses
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((classItem) => (
                                    <TableRow key={classItem.id}>
                                        <TableCell>{classItem.name}</TableCell>
                                        <TableCell>{classItem.description}</TableCell>
                                        <TableCell>{classItem.createdon}</TableCell>
                                        <TableCell>{classItem.createdby}</TableCell>
                                        <TableCell>{classItem.lasteditedon}</TableCell>
                                        <TableCell>{classItem.lasteditedby}</TableCell>
                                        <TableCell>{classItem.ipaddress}</TableCell>
                                        <TableCell>
                                            <Box
                                                sx={{
                                                    backgroundColor: classItem.is_active === '1' ? 'green' : 'red',
                                                    color: 'white',
                                                    padding: '4px 8px',
                                                    borderRadius: '4px',
                                                    display: 'inline-block'
                                                }}
                                            >
                                                <Typography variant="body2">
                                                    {classItem.is_active === '1' ? "Active" : "Inactive"}
                                                </Typography>
                                            </Box>
                                        </TableCell>
                                        <TableCell>
                                            <Button
                                                variant="outlined"
                                                color="primary"
                                                component={Link}
                                                to={`/class-management/edit-class/${classItem.id}`}
                                                sx={{ mr: 1 }}
                                            >
                                                Edit
                                            </Button>
                                            <Button
                                                variant="outlined"
                                                color="secondary"
                                                onClick={() => handleDeleteClass(classItem.id)}
                                            >
                                                Delete
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}

            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={filteredClasses.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
            <Dialog open={openDeleteDialog} onClose={handleCloseDialog}>
                <DialogTitle>Delete Class</DialogTitle>
                <DialogContent>
                    Are you sure you want to delete this class?
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancel</Button>
                    <Button onClick={handleConfirmDelete} color="secondary">Delete</Button>
                </DialogActions>
            </Dialog>
        </MainCard>
    );
}
