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
import SubjectsService from "../../../../services/SubjectService";

function Subjects() {
    const [subjects, setSubjects] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchQuery, setSearchQuery] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    const [deleteSubjectId, setDeleteSubjectId] = useState(null);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

    const fetchSubjects = async () => {
        try {
            const response = await SubjectsService.getAllSubjects();
            setSubjects(response.data.original.data);
        } catch (error) {
            console.error('Error fetching subjects:', error);
        }
    };

    useEffect(() => {
        fetchSubjects();
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

    const handleDeleteSubject = (subjectId) => {
        setDeleteSubjectId(subjectId);
        setOpenDeleteDialog(true);
    };

    const handleConfirmDelete = async () => {
        try {
            // await SubjectsService.deleteSubject(deleteSubjectId);
            setSubjects(subjects.filter(subject => subject.id !== deleteSubjectId));
            setOpenDeleteDialog(false);
        } catch (error) {
            console.error('Error deleting subject:', error);
        }
    };

    const handleCloseDialog = () => {
        setOpenDeleteDialog(false);
    };

    const filteredSubjects = subjects.filter((subject) =>
        subject.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <MainCard title="Subject Management">
            <Typography variant="body1" gutterBottom>
                Welcome to the Subject Management page. Here you can manage subjects and their details.
            </Typography>

            {/* Search and filter controls */}
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

            {/* Button to add new subject */}
            <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/subject-management/add-subject"
                sx={{ mb: 2 }}
            >
                Add New Subject
            </Button>
            {/* Table showing subjects */}
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Subject Code</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Created On</TableCell>
                            <TableCell>Is Active</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredSubjects
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((subject) => (
                                <TableRow key={subject.id}>
                                    <TableCell>{subject.name}</TableCell>
                                    <TableCell>{subject.subjectCode}</TableCell>
                                    <TableCell>{subject.description}</TableCell>
                                    <TableCell>{new Date(subject.createdOn).toLocaleDateString()}</TableCell>
                                    <TableCell>
                                        <Box
                                            sx={{
                                                backgroundColor: subject.isActive ? 'green' : 'red',
                                                color: 'white',
                                                padding: '4px 8px',
                                                borderRadius: '4px',
                                                display: 'inline-block'
                                            }}
                                        >
                                            <Typography variant="body2">
                                                {subject.isActive ? "Active" : "Inactive"}
                                            </Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            component={Link}
                                            to={`/subject-management/edit/${subject.id}`}
                                            sx={{ mr: 1 }}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            color="secondary"
                                            onClick={() => handleDeleteSubject(subject.id)}
                                        >
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Pagination for subjects */}
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={filteredSubjects.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />

            {/* Delete confirmation dialog */}
            <Dialog open={openDeleteDialog} onClose={handleCloseDialog}>
                <DialogTitle>Delete Subject</DialogTitle>
                <DialogContent>
                    Are you sure you want to delete this subject?
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancel</Button>
                    <Button onClick={handleConfirmDelete} color="secondary">Delete</Button>
                </DialogActions>
            </Dialog>
        </MainCard>
    );
}

export default Subjects;
