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
import Account from "../../../services/account";

export default function UserManagement() {
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchQuery, setSearchQuery] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    const [deleteUserId, setDeleteUserId] = useState(null);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

    const fetchUsers = async () => {
        try {
            const response = await Account.getAllUsers();
            setUsers(response.data.original.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    useEffect(() => {
        fetchUsers();
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

    const handleDeleteUser = (userId) => {
        setDeleteUserId(userId);
        setOpenDeleteDialog(true);
    };

    const handleConfirmDelete = async () => {
        try {
            // await axios.delete(`http://localhost:8080/auth/users/${deleteUserId}`);
            setUsers(users.filter(user => user.id !== deleteUserId));
            setOpenDeleteDialog(false);
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const handleCloseDialog = () => {
        setOpenDeleteDialog(false);
    };

    const filteredUsers = users.filter((user) =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <MainCard title="User Management">
            <Typography variant="body1" gutterBottom>
                Welcome to the User Management page. Here you can manage system users and their permissions.
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

            {/* Button to add new user */}
            <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/user-management/add-user"
                sx={{ mb: 2 }}
            >
                Add New User
            </Button>
            {/* Table showing users */}
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Role</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredUsers
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell>{user.name}</TableCell>
                                    <TableCell>
                                        {user.role_id === 1 ? "Sacco Management Committee" :
                                            user.role_id === 2 ? "Treasurer" :
                                                user.role_id === 3 ? "Members" :
                                                    user.role_id === 4 ? "Normal User" : "Unknown Role"}
                                    </TableCell>
                                    <TableCell>
                                        <Box
                                            sx={{
                                                backgroundColor: user.active === 1 ? 'green' : 'red',
                                                color: 'white',
                                                padding: '4px 8px',
                                                borderRadius: '4px',
                                                display: 'inline-block'
                                            }}
                                        >
                                            <Typography variant="body2">
                                                {user.active === 1 ? "Active" : "Inactive"}
                                            </Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            component={Link}
                                            to={`/user-management/edit/${user.id}`}
                                            sx={{ mr: 1 }}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            color="secondary"
                                            onClick={() => handleDeleteUser(user.id)}
                                        >
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Pagination for users */}
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={filteredUsers.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />

            {/* Delete confirmation dialog */}
            <Dialog open={openDeleteDialog} onClose={handleCloseDialog}>
                <DialogTitle>Delete User</DialogTitle>
                <DialogContent>
                    Are you sure you want to delete this user?
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancel</Button>
                    <Button onClick={handleConfirmDelete} color="secondary">Delete</Button>
                </DialogActions>
            </Dialog>
        </MainCard>
    );
}
