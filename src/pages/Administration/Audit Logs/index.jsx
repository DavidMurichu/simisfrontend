import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TablePagination from '@mui/material/TablePagination';
import CircularProgress from '@mui/material/CircularProgress';
import MainCard from 'components/MainCard';
import Account from "../../../services/account";

export default function AuditLogs() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [auditLogs, setAuditLogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAuditLogs();
    }, []);

    const fetchAuditLogs = async () => {
        try {
            const response = await Account.getAllAudits();
            if (response.status === 200) {
                setAuditLogs(response.data);
                setLoading(false);
            }
        } catch (error) {
            console.error('Error fetching audit logs:', error);
            setLoading(false);
        }
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <MainCard title="Audit Logs">
            <Typography variant="body1" gutterBottom>
                View audit logs of system activities.
            </Typography>

            {loading ? (
                <CircularProgress />
            ) : (
                <React.Fragment>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>User Name</TableCell>
                                    <TableCell>Action</TableCell>
                                    <TableCell>Ip Address</TableCell>
                                    <TableCell>Creation Time</TableCell>
                                    <TableCell>Updated</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {auditLogs
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((log) => (
                                        <TableRow key={log.id}>
                                            <TableCell>{log.user_name}</TableCell>
                                            <TableCell>{log.activity_type}</TableCell>
                                            <TableCell>{log.ipaddress}</TableCell>
                                            <TableCell>{log.created_at}</TableCell>
                                            <TableCell>{log.updated_at}</TableCell>
                                        </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={auditLogs.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </React.Fragment>
            )}
        </MainCard>
    );
}
