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
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CircularProgress from '@mui/material/CircularProgress';
import MainCard from 'components/MainCard';
import { Link } from 'react-router-dom';
import Account from "../../../../services/account";

function AuthBranches() {
    const [branches, setBranches] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [loading, setLoading] = useState(true);

    const fetchBranches = async () => {
        try {
            const response = await Account.getAllBranches();
            setBranches(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching branches:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBranches();
    }, []);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <MainCard title="Branch Management">
            <Typography variant="body1" gutterBottom>
                Welcome to the Branch Management page. Here you can manage system branches.
            </Typography>

            {/* Button to add new branch */}
            <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/user-management/add-role"
                sx={{ mb: 2 }}
            >
                Add New Branch
            </Button>

            {/* Table showing branches */}
            {loading ? (
                <CircularProgress />
            ) : (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Branch Name</TableCell>
                                <TableCell>Location</TableCell>
                                <TableCell>Remarks</TableCell>
                                <TableCell>Created By</TableCell>
                                <TableCell>Last Edited By</TableCell>
                                <TableCell>Last Edited On</TableCell>
                                <TableCell>IP Address</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {branches
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((branch) => (
                                    <TableRow key={branch.id}>
                                        <TableCell>{branch.branch_name}</TableCell>
                                        <TableCell>{branch.location}</TableCell>
                                        <TableCell>{branch.remarks}</TableCell>
                                        <TableCell>{branch.createdby}</TableCell>
                                        <TableCell>{branch.lasteditedby}</TableCell>
                                        <TableCell>{branch.updated_at}</TableCell>
                                        <TableCell>{branch.ipaddress}</TableCell>
                                        <TableCell>
                                            <Box
                                                sx={{
                                                    backgroundColor: branch.is_active ? 'green' : 'red',
                                                    color: 'white',
                                                    padding: '4px 8px',
                                                    borderRadius: '4px',
                                                    display: 'inline-block'
                                                }}
                                            >
                                                <Typography variant="body2">
                                                    {branch.is_active ? "Active" : "Inactive"}
                                                </Typography>
                                            </Box>
                                        </TableCell>
                                        <TableCell>
                                            <Button
                                                variant="outlined"
                                                color="primary"
                                                component={Link}
                                                to={`/branch-management/edit/${branch.id}`}
                                                sx={{ mr: 1 }}
                                            >
                                                Edit
                                            </Button>
                                            <Button
                                                variant="outlined"
                                                color="secondary"
                                                // onClick={() => handleDeleteBranch(branch.id)} // Implement handleDeleteBranch function if needed
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

            {/* Pagination for branches */}
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={branches.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />

            {/* Delete confirmation dialog */}
            {/* Implement the dialog for deleting branches if needed */}
        </MainCard>
    );
}

export default AuthBranches;
