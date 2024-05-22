import React from 'react';
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

// Mock data for income records
const incomeRecords = [
    { id: 1, date: '2024-05-01', source: 'Sales', amount: 1000, notes: 'Product sales revenue' },
    { id: 2, date: '2024-05-05', source: 'Service Fees', amount: 500, notes: 'Consulting services' },
    // Add more mock income records as needed
];

export default function IncomeManagement() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <MainCard title="Income Management">
            <Typography variant="body1" gutterBottom>
                Manage income records and transactions.
            </Typography>

            {/* Placeholder buttons for additional features */}
            <Button variant="contained" color="primary" sx={{ mr: 2 }}>
                <Link to="/add-income">Add New Income</Link>
            </Button>
            <Button variant="outlined" color="primary" sx={{ mr: 2 }}>
                <Link to="/generate-reports">Generate Reports</Link>
            </Button>
            <Button variant="outlined" color="primary" sx={{ mb: 2 }}>
                <Link to="/export-data">Export Data</Link>
            </Button>

            {/* Table showing income records */}
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Source</TableCell>
                            <TableCell>Amount</TableCell>
                            <TableCell>Notes</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {incomeRecords.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((record) => (
                            <TableRow key={record.id}>
                                <TableCell>{record.id}</TableCell>
                                <TableCell>{record.date}</TableCell>
                                <TableCell>{record.source}</TableCell>
                                <TableCell>{record.amount}</TableCell>
                                <TableCell>{record.notes}</TableCell>
                                <TableCell>
                                    <Button variant="outlined" color="primary" sx={{ mr: 1 }}>
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

            {/* Pagination for income records */}
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={incomeRecords.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </MainCard>
    );
}
