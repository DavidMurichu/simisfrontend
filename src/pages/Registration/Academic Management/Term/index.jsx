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
import TermService from "../../../../services/termservice";

function Terms() {
    const [terms, setTerms] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchQuery, setSearchQuery] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    const [deleteTermId, setDeleteTermId] = useState(null);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

    const fetchTerms = async () => {
        try {
            const response = await TermService.getAllTerms();
            setTerms(response.data.original.data);
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

    const handleDeleteTerm = (termId) => {
        setDeleteTermId(termId);
        setOpenDeleteDialog(true);
    };

    const handleConfirmDelete = async () => {
        try {
            // await axios.delete(`http://localhost:8080/terms/${deleteTermId}`);
            setTerms(terms.filter(term => term.id !== deleteTermId));
            setOpenDeleteDialog(false);
        } catch (error) {
            console.error('Error deleting term:', error);
        }
    };

    const handleCloseDialog = () => {
        setOpenDeleteDialog(false);
    };

    const filteredTerms = terms.filter((term) =>
        term.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <MainCard title="Term Management">
            <Typography variant="body1" gutterBottom>
                Manage terms here.
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

            {/* Button to add new term */}
            <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/term-management/add-term"
                sx={{ mb: 2 }}
            >
                Add New Term
            </Button>
            {/* Table showing terms */}
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Created On</TableCell>
                            <TableCell>Is Active</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredTerms
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((term) => (
                                <TableRow key={term.id}>
                                    <TableCell>{term.name}</TableCell>
                                    <TableCell>{term.description}</TableCell>
                                    <TableCell>{term.createdOn}</TableCell>
                                    <TableCell>
                                        <Box
                                            sx={{
                                                backgroundColor: term.isActive ? 'green' : 'red',
                                                color: 'white',
                                                padding: '4px 8px',
                                                borderRadius: '4px',
                                                display: 'inline-block'
                                            }}
                                        >
                                            <Typography variant="body2">
                                                {term.isActive ? "Active" : "Inactive"}
                                            </Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            component={Link}
                                            to={`/term-management/edit/${term.id}`}
                                            sx={{ mr: 1 }}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            color="secondary"
                                            onClick={() => handleDeleteTerm(term.id)}
                                        >
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Pagination for terms */}
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={filteredTerms.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />

            {/* Delete confirmation dialog */}
            <Dialog open={openDeleteDialog} onClose={handleCloseDialog}>
                <DialogTitle>Delete Term</DialogTitle>
                <DialogContent>
                    Are you sure you want to delete this term?
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancel</Button>
                    <Button onClick={handleConfirmDelete} color="secondary">Delete</Button>
                </DialogActions>
            </Dialog>
        </MainCard>
    );
}

export default Terms;
