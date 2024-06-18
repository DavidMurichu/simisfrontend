import React, { useState, useEffect } from 'react';
import { Typography, Button, TableContainer, Paper, Table, TableHead, TableBody, TableRow, TableCell, TablePagination, Checkbox, Select, MenuItem, FormControl, InputLabel, Grid, Box, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PupilService from '../../../../../services/pupilservice';
import MainCard from 'components/MainCard';
import { Link, useNavigate } from 'react-router-dom';
import {toast, ToastContainer} from "react-toastify";
import CalendarService from "../../../../../services/calendarService";

function PromotionTerm() {
    const navigate = useNavigate();
    const [pupils, setPupils] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [selectedClass, setSelectedClass] = useState('');
    const [selectedGender, setSelectedGender] = useState('');
    const [selectedYear, setSelectedYear] = useState('');
    const [selectedPupils, setSelectedPupils] = useState(new Set());
    const [newTerm, setNewTerm] = useState('');
    const [newYear, setNewYear] = useState('');
    const [termOptions, setTermOptions] = useState([]);
    const [yearOptions, setYearOptions] = useState([]);

    useEffect(() => {
        fetchAllPupils();
        fetchTermAndYearOptions();
    }, []);

    const fetchAllPupils = async () => {
        try {
            const response = await PupilService.getPromotedForReporting();
            console.log("pupils", response.data)
            setPupils(response.data);
        } catch (err) {
            handleFetchError(err);
        }
    };

    const fetchTermAndYearOptions = async () => {
        try {
            const termsResponse = await CalendarService.getAllTerms();
            const yearsResponse = await CalendarService.getAllAcademicYearTerms();
            console.log("term response", termsResponse)
            console.log("year response", yearsResponse)
            setTermOptions(termsResponse.data);
            setYearOptions(yearsResponse.data);
        } catch (err) {
            handleFetchError(err);
        }
    };

    const handleFetchError = (err) => {
        if (err.data) {
            const errorMessage = err.data[0].message;
            console.log("Error from response", err.data, errorMessage);
            toast.warning("Try again: " + errorMessage);
        } else if (err.message) {
            toast.error(err.message);
        } else {
            toast.error("An unexpected error occurred. Please try again.");
        }
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handlePromoteStudents = async () => {
        const selectedPupilData = Array.from(selectedPupils).map(id => {
            const pupil = pupils.find(p => p.id === id);
            return {
                studentclasspromotionid: pupil.promotion_id,
                term: newTerm,
                classterm: newYear,
                reportingdate: new Date().toISOString(),
                createdby: sessionStorage.getItem("id"),
                lasteditedby: sessionStorage.getItem("id"),
                is_active: true
            };
        });

        try {
            const response = await PupilService.reportPupil(selectedPupilData);
            if (response.status === 201) {
                toast.success("Successfully promoted students");
                navigate("/pupil-class-reporting");
            }
        } catch (err) {
            console.error("Error promoting students:", err);
            toast.error("An unexpected error occurred while promoting students. Please try again.");
        }
    };

    const handlePromoteAll = () => {
        const filteredPupils = pupils
            .filter(pupil => (!selectedClass || pupil.class_name === selectedClass) &&
                (!selectedYear || pupil.academicyear === selectedYear))
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

        const allSelected = filteredPupils.every(pupil => selectedPupils.has(pupil.id));

        if (allSelected) {
            const deselectedIds = new Set([...selectedPupils].filter(id => !filteredPupils.some(pupil => pupil.id === id)));
            setSelectedPupils(deselectedIds);
        } else {
            const selectedIds = new Set([...selectedPupils, ...filteredPupils.map(pupil => pupil.id)]);
            setSelectedPupils(selectedIds);
        }
    };

    const handleCheckboxChange = (id) => {
        setSelectedPupils((prevSelected) => {
            const updatedSelected = new Set(prevSelected);
            if (updatedSelected.has(id)) {
                updatedSelected.delete(id);
            } else {
                updatedSelected.add(id);
            }
            return updatedSelected;
        });
    };

    const uniqueClasses = [...new Set(pupils.map(pupil => pupil.class_name))];
    const uniqueYears = [...new Set(pupils.map(pupil => pupil.academicyear))];

    const filteredPupils = pupils
        .filter(pupil => (!selectedClass || pupil.class_name === selectedClass) &&
            (!selectedYear || pupil.academicyear === selectedYear))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    const selectedCount = filteredPupils.filter(pupil => selectedPupils.has(pupil.id)).length;
    const totalInView = filteredPupils.length;
    const unselectedCount = totalInView - selectedCount;

    return (
        <MainCard title="Student Reporting page " style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}>
            <ToastContainer/>
            <Box sx={{ mb: 2 }}>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="filter-panel-content"
                        id="filter-panel-header"
                    >
                        <Typography variant="h6">Filter Students</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={4}>
                                <FormControl fullWidth>
                                    <InputLabel>Class</InputLabel>
                                    <Select
                                        value={selectedClass}
                                        onChange={(e) => setSelectedClass(e.target.value)}
                                        label="Class"
                                    >
                                        <MenuItem value="">All Classes</MenuItem>
                                        {uniqueClasses.map((classId, index) => (
                                            <MenuItem key={index} value={classId}>{classId}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <FormControl fullWidth>
                                    <InputLabel>Academic Year</InputLabel>
                                    <Select
                                        value={selectedYear}
                                        onChange={(e) => setSelectedYear(e.target.value)}
                                        label="Academic Year"
                                    >
                                        <MenuItem value="">All Years</MenuItem>
                                        {uniqueYears.map((year, index) => (
                                            <MenuItem key={index} value={year}>{year}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </AccordionDetails>
                </Accordion>
            </Box>

            <Typography variant="h6" sx={{ mt: 2 }}>Select Promotion Details</Typography>
            <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                        <InputLabel>New Term</InputLabel>
                        <Select
                            value={newTerm}
                            onChange={(e) => setNewTerm(e.target.value)}
                            label="New Term"
                        >
                            {termOptions.map((term, index) => (
                                <MenuItem key={term.id} value={term.name}>{term.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                        <InputLabel>New Academic Year term</InputLabel>
                        <Select
                            value={newYear}
                            onChange={(e) => setNewYear(e.target.value)}
                            label="New Academic Year term"
                        >
                            {yearOptions.map((year, index) => (
                                <MenuItem key={year.id} value={year.name}>{year.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>


            <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle1" display="inline" mr={3}>
                    Total Students in View: {totalInView}
                </Typography>
                <Typography variant="subtitle1" display="inline" mr={3}>
                    Selected to Promote: {selectedCount}
                </Typography>
                <Typography variant="subtitle1" display="inline">
                    Not Selected to Promote: {unselectedCount}
                </Typography>
            </Box>

            <TableContainer component={Paper} sx={{ mt: 2 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <Checkbox
                                    indeterminate={selectedPupils.size > 0 && selectedPupils.size < pupils.length}
                                    checked={pupils.length > 0 && selectedPupils.size === pupils.length}
                                    onChange={handlePromoteAll}
                                />
                            </TableCell>
                            <TableCell>Admission No</TableCell>
                            <TableCell>Student name</TableCell>
                            <TableCell>Class</TableCell>
                            <TableCell>Academic Year</TableCell>
                            <TableCell>Details</TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredPupils.map((pupil) => (
                            <TableRow key={pupil.id}>
                                <TableCell>
                                    <Checkbox
                                        checked={selectedPupils.has(pupil.id)}
                                        onChange={() => handleCheckboxChange(pupil.id)}
                                    />
                                </TableCell>
                                <TableCell>{pupil.admission_no}</TableCell>
                                <TableCell>{pupil.name}</TableCell>
                                <TableCell>{pupil.current_class_id}</TableCell>
                                <TableCell>{pupil.academicyearid}</TableCell>
                                <TableCell>
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        component={Link}
                                        to={`/registration/view-pupil/${pupil.id}`}
                                        sx={{ mr: 1 }}
                                    >
                                        View Details
                                    </Button>
                                </TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={pupils.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />

            <Button
                variant="contained"
                color="primary"
                onClick={handlePromoteStudents}
                sx={{ mt: 2, mr: 2 }}
            >
                Report Students
            </Button>

            <Button variant="contained" color="secondary" component={Link} to="/pupil-class-reporting" sx={{ mt: 2 }}>
                Cancel
            </Button>
        </MainCard>
    );
}

export default PromotionTerm;
