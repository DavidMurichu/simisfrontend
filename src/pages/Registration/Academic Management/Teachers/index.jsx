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
import { toast } from "react-toastify";
import TeacherService from "../../../../services/TeacherService";

function Teachers() {
    const [teachers, setTeachers] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchQuery, setSearchQuery] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    const [deleteTeacherId, setDeleteTeacherId] = useState(null);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

    const fetchTeachers = async () => {
        try {
            const response = await TeacherService.getAllPersons();
            setTeachers(response.data);
        } catch (error) {
            console.error('Error fetching teachers:', error);
            toast.error('Error fetching teachers. Please try again.');
        }
    };

    useEffect(() => {
        fetchTeachers();
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

    const handleDeleteTeacher = (teacherId) => {
        setDeleteTeacherId(teacherId);
        setOpenDeleteDialog(true);
    };

    const handleConfirmDelete = async () => {
        try {
            const response = await TeacherService.deletePerson(deleteTeacherId);
            if (response.status === 200) {
                toast.success("Deleted teacher successfully");
                setTeachers(teachers.filter(teacher => teacher.id !== deleteTeacherId));
                setOpenDeleteDialog(false);
            } else {
                toast.warning("Error, try again");
            }
        } catch (error) {
            console.error('Error deleting teacher:', error);
            toast.error("Error deleting teacher. Please try again.");
        }
    };

    const handleCloseDialog = () => {
        setOpenDeleteDialog(false);
    };

    const filteredTeachers = teachers.filter((teacher) =>
        teacher.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <MainCard title="Teacher Management">
            <Typography variant="body1" gutterBottom>
                Welcome to the Teacher Management page. Here you can manage teacher details and their actions.
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

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Surname</TableCell>
                            <TableCell>First Name</TableCell>
                            <TableCell>Last Name</TableCell>
                            <TableCell>Title</TableCell>
                            <TableCell>Mobile No</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Physical Address</TableCell>
                            <TableCell>Created On</TableCell>
                            <TableCell>Is Active</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredTeachers
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((teacher, index) => (
                                <TableRow key={teacher.id}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{teacher.name}</TableCell>
                                    <TableCell>{teacher.surname}</TableCell>
                                    <TableCell>{teacher.firstname}</TableCell>
                                    <TableCell>{teacher.lastname}</TableCell>
                                    <TableCell>{teacher.title}</TableCell>
                                    <TableCell>{teacher.mobileno}</TableCell>
                                    <TableCell>{teacher.email}</TableCell>
                                    <TableCell>{teacher.physicaladdress}</TableCell>
                                    <TableCell>{new Date(teacher.createdon).toLocaleDateString()}</TableCell>
                                    <TableCell>{teacher.isActive ? 'Active' : 'Inactive'}</TableCell>
                                    <TableCell>
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            component={Link}
                                            to={`/edit-teacher/${teacher.id}`}
                                            sx={{ mr: 1 }}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            color="secondary"
                                            onClick={() => handleDeleteTeacher(teacher.id)}
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
                count={filteredTeachers.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />

            <Dialog open={openDeleteDialog} onClose={handleCloseDialog}>
                <DialogTitle>Delete Teacher</DialogTitle>
                <DialogContent>
                    Are you sure you want to delete this teacher?
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancel</Button>
                    <Button onClick={handleConfirmDelete} color="secondary">Delete</Button>
                </DialogActions>
            </Dialog>
        </MainCard>
    );
}

export default Teachers;
