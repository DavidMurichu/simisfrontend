import React from 'react';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TablePagination from '@mui/material/TablePagination';
import MainCard from 'components/MainCard';
import Account from "../../../services/account";

// // Mock data for audit logs
// const auditLogs = [
//     { id: 1, action: 'User login', user: 'John Doe', timestamp: '2024-05-20 09:30:00' },
//     { id: 2, action: 'User logout', user: 'Jane Smith', timestamp: '2024-05-20 10:00:00' },
//     // Add more mock audit log entries as needed
// ];

export default function AuditLogs() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [auditLogs, setAuditLogs] = React.useState([]);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

   const handleFetchAudits = async ()=>{
       try {
              const response = await Account.getAllAudits();
           console.log("audits: " +response.data)
              if (response.status === 200){
                  setAuditLogs(response.data)
              }
       }catch (err){
           console.log("Error fetching the audits");
       }
    }
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };


    return (
        <MainCard title="Audit Logs">
            <Typography variant="body1" gutterBottom>
                View audit logs of system activities.
            </Typography>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Action</TableCell>
                            <TableCell>User</TableCell>
                            <TableCell>Timestamp</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {auditLogs.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((log) => (
                            <TableRow key={log.id}>
                                <TableCell>{log.id}</TableCell>
                                <TableCell>{log.action}</TableCell>
                                <TableCell>{log.user}</TableCell>
                                <TableCell>{log.timestamp}</TableCell>
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
        </MainCard>
    );
}
