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
import CircularProgress from '@mui/material/CircularProgress';
import MainCard from 'components/MainCard';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Link } from 'react-router-dom';
import AcademicYearService from '../../../../services/calendarService';
import Term from "./Term";
import Academicyear from "./Years/academicyear";
import Calendaryear from "./Years/calendar/calendaryear";
import Academicyearterm from "./Years/term/addacademicyearterm";
import AcademicTermYear from "./Years/term/academictermyear";

export default function AcademicYears() {
    const [value, setValue] = useState(0);
    const [academicYears, setAcademicYears] = useState([]);
    const [terms, setTerms] = useState([]);
    const [events, setEvents] = useState([]);
    const [calendarYears, setCalendarYears] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchQuery, setSearchQuery] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [loading, setLoading] = useState(true);

    const fetchAcademicYears = async () => {
        try {
            const response = await AcademicYearService.getAllAcademicYears();
            setAcademicYears(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching academic years:', error);
            setLoading(false);
        }
    };
    const fetchEvents = async () => {
        try {
            const response = await AcademicYearService.getAllEvents();
            setEvents(response.data);
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    };

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

    const handleDelete = (id) => {
        setDeleteId(id);
        setOpenDeleteDialog(true);
    };

    const handleConfirmDelete = async () => {
        try {
            if (value === 0) {
                setAcademicYears(academicYears.filter(year => year.id !== deleteId));
            } else if (value === 1) {
                setTerms(terms.filter(term => term.id !== deleteId));
            } else if (value === 2) {
                setEvents(events.filter(event => event.id !== deleteId));
            } else {
                setCalendarYears(calendarYears.filter(year => year.id !== deleteId));
            }
            setOpenDeleteDialog(false);
        } catch (error) {
            console.error('Error deleting record:', error);
        }
    };

    const handleCloseDialog = () => {
        setOpenDeleteDialog(false);
    };

    const filteredAcademicYears = academicYears.filter((year) =>
        year.name && year.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const filteredTerms = terms.filter((term) =>
        term.name && term.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const filteredEvents = events.filter((event) =>
        event.eventName && event.eventName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const filteredCalendarYears = calendarYears.filter((year) =>
        year.year && year.year.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleChangeTab = (event, newValue) => {
        setValue(newValue);
        setSearchQuery('');
    };

    return (
        <MainCard title="Academic Year Management">
            <Typography variant="body1" gutterBottom>
                Welcome to the Academic Year Management page. Here you can manage academic years, terms, events, and
                calendar years.
            </Typography>

            <Box display="flex">
                <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    value={value}
                    onChange={handleChangeTab}
                    sx={{borderRight: 1, borderColor: 'divider'}}
                >
                    <Tab label="Academic Years"/>
                    <Tab label="Terms"/>
                    <Tab label="Calendar Years"/>
                    <Tab label="Academic Year Term"/>
                </Tabs>

                <Box flex={1} p={3}>
                    {value === 0 && (
                        <Box>
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

                            <Button
                                variant="contained"
                                color="primary"
                                component={Link}
                                to="/academic-years/add-academic-year"
                                sx={{mb: 2}}
                            >
                                Add New Academic Year
                            </Button>
                            {/* academic calendar display table*/}
                            <Academicyear/>


                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25]}
                                component="div"
                                count={filteredAcademicYears.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                            <Dialog open={openDeleteDialog} onClose={handleCloseDialog}>
                                <DialogTitle>Delete Academic Year</DialogTitle>
                                <DialogContent>
                                    Are you sure you want to delete this academic year?
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleCloseDialog}>Cancel</Button>
                                    <Button onClick={handleConfirmDelete} color="secondary">Delete</Button>
                                </DialogActions>
                            </Dialog>
                        </Box>
                    )}

                    {value === 1 && (
                        <Box>
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

                            <Button
                                variant="contained"
                                color="primary"
                                component={Link}
                                to="/academic-years/add-term"
                                sx={{mb: 2}}
                            >
                                Add New Term
                            </Button>
                                {/* term table */}
                                <Term/>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25]}
                                component="div"
                                count={filteredTerms.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
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
                        </Box>
                    )}

                    {value === 2 && (
                        <Box>
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

                            <Button
                                variant="contained"
                                color="primary"
                                component={Link}
                                to="/academic-years/add-event"
                                sx={{mb: 2}}
                            >
                                Add New Event
                            </Button>

                            {loading ? (
                                <CircularProgress/>
                            ) : (
                                <TableContainer component={Paper}>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Event Name</TableCell>
                                                <TableCell>Start Date</TableCell>
                                                <TableCell>End Date</TableCell>
                                                <TableCell>Description</TableCell>
                                                <TableCell>Status</TableCell>
                                                <TableCell>Actions</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {filteredEvents
                                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                .map((event) => (
                                                    <TableRow key={event.id}>
                                                        <TableCell>{event.eventName}</TableCell>
                                                        <TableCell>{event.startDate}</TableCell>
                                                        <TableCell>{event.endDate}</TableCell>
                                                        <TableCell>{event.description}</TableCell>
                                                        <TableCell>
                                                            <Box
                                                                sx={{
                                                                    backgroundColor: event.isActive === '1' ? 'green' : 'red',
                                                                    color: 'white',
                                                                    padding: '4px 8px',
                                                                    borderRadius: '4px',
                                                                    display: 'inline-block'
                                                                }}
                                                            >
                                                                <Typography variant="body2">
                                                                    {event.isActive === '1' ? "Active" : "Inactive"}
                                                                </Typography>
                                                            </Box>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Button
                                                                variant="outlined"
                                                                color="primary"
                                                                component={Link}
                                                                to={`/academic-years/edit-event/${event.id}`}
                                                                sx={{mr: 1}}
                                                            >
                                                                Edit
                                                            </Button>
                                                            <Button
                                                                variant="outlined"
                                                                color="secondary"
                                                                onClick={() => handleDelete(event.id)}
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

                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25]}
                                component="div"
                                count={filteredEvents.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                            <Dialog open={openDeleteDialog} onClose={handleCloseDialog}>
                                <DialogTitle>Delete Event</DialogTitle>
                                <DialogContent>
                                    Are you sure you want to delete this event?
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleCloseDialog}>Cancel</Button>
                                    <Button onClick={handleConfirmDelete} color="secondary">Delete</Button>
                                </DialogActions>
                            </Dialog>
                        </Box>
                    )}
                    {value === 3 && (
                        <Box>
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

                            <Button
                                variant="contained"
                                color="primary"
                                component={Link}
                                to="/academic-years/add-academic-year-term"
                                sx={{mb: 2}}
                            >
                                Add Academic Year Term
                            </Button>
                            <AcademicTermYear/>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25]}
                                component="div"
                                count={filteredCalendarYears.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                            <Dialog open={openDeleteDialog} onClose={handleCloseDialog}>
                                <DialogTitle>Delete Calendar Year</DialogTitle>
                                <DialogContent>
                                    Are you sure you want to delete this calendar year?
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleCloseDialog}>Cancel</Button>
                                    <Button onClick={handleConfirmDelete} color="secondary">Delete</Button>
                                </DialogActions>
                            </Dialog>
                        </Box>
                    )}
                </Box>
            </Box>
        </MainCard>
    );
}