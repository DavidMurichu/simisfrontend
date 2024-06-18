import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import MainCard from 'components/MainCard';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

const GeneralJournalReport = () => {
    return (
        <Grid item xs={12} md={7} lg={8}>
            <MainCard sx={{ mt: 2 }}>
                <Box sx={{ p: 2 }}>
                    <Typography variant="h5" sx={{ mb: 2 }}>General Journal Reports</Typography>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>#</TableCell>
                                    <TableCell>Account</TableCell>
                                    <TableCell>Debit</TableCell>
                                    <TableCell>Credit</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell>1</TableCell>
                                    <TableCell>ASSETS</TableCell>
                                    <TableCell>1,182,977.00</TableCell>
                                    <TableCell>477,746.00</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>2</TableCell>
                                    <TableCell>LIABILITIES</TableCell>
                                    <TableCell>11,138.56</TableCell>
                                    <TableCell>0.00</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>3</TableCell>
                                    <TableCell>EXPENSES</TableCell>
                                    <TableCell>50,200.00</TableCell>
                                    <TableCell>0.00</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>4</TableCell>
                                    <TableCell>REVENUES</TableCell>
                                    <TableCell>172,296.00</TableCell>
                                    <TableCell>582,542.00</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell></TableCell>
                                    <TableCell>Total</TableCell>
                                    <TableCell>1,416,611.56</TableCell>
                                    <TableCell>1,060,288.00</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </MainCard>
        </Grid>
    );
};

const UpcomingEvents = () => {
    return (
        <Grid item xs={12} md={5} lg={4}>
            <MainCard sx={{ mt: 2 }}>
                <Box sx={{ p: 2 }}>
                    <Typography variant="h5" sx={{ mb: 2 }}>Upcoming Events</Typography>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Event</TableCell>
                                    <TableCell>Description</TableCell>
                                    <TableCell>Start Date</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell>Fun Day</TableCell>
                                    <TableCell>Pupils Fun day</TableCell>
                                    <TableCell>2022-03-06</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>School Closing day</TableCell>
                                    <TableCell>School Closing day</TableCell>
                                    <TableCell>2022-03-06</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </MainCard>
        </Grid>
    );
};

export { GeneralJournalReport, UpcomingEvents };
