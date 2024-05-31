import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {Link} from "react-router-dom";
import TableContainer from "@mui/material/TableContainer";
import React, {useEffect, useState} from "react";
import AcademicYearService from "../../../../../../services/calendarService";

function CalendarYear() {
    const [calendarYears, setCalendarYears] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchQuery, setSearchQuery] = useState('');

    const filteredCalendarYears = calendarYears.filter((year) =>
        year.year && year.year.toLowerCase().includes(searchQuery.toLowerCase())
    );
    useEffect(() => {
        const fetchCalendarYears = async () => {
            try {
                const response = await AcademicYearService.getAllCalendarYears();
                setCalendarYears(response.data);
            } catch (error) {
                console.error('Error fetching calendar years:', error);
            }
        };
        fetchCalendarYears();
    },[])
    return (
        <div>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Year</TableCell>
                            <TableCell>Created On</TableCell>
                            <TableCell>Is Active</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredCalendarYears
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((year) => (
                                <TableRow key={year.id}>
                                    <TableCell>{year.year}</TableCell>
                                    <TableCell>{year.createdon}</TableCell>
                                    <TableCell>
                                        <Box
                                            sx={{
                                                backgroundColor: year.is_active === '1' ? 'green' : 'red',
                                                color: 'white',
                                                padding: '4px 8px',
                                                borderRadius: '4px',
                                                display: 'inline-block'
                                            }}
                                        >
                                            <Typography variant="body2">
                                                {year.is_active === '1' ? "Active" : "Inactive"}
                                            </Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            component={Link}
                                            to={`/academic-years/edit-calendar-year/${year.id}`}
                                            sx={{mr: 1}}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            color="secondary"
                                            onClick={() => handleDelete(year.id)}
                                        >
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}
export default CalendarYear