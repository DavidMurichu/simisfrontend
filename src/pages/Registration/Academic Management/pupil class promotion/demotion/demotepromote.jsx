import React, { useState, useEffect } from 'react';
import {
    Typography,
    Button,
    TableContainer,
    Paper,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    TablePagination,
    Checkbox,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Grid,
    Box,
    Accordion,
    AccordionSummary,
    AccordionDetails
} from '@mui/material';
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import PupilService from '../../../../../services/pupilservice';
import MainCard from 'components/MainCard';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

function DemotePromote() {
    const navigate = useNavigate();
    const [pupils, setPupils] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [selectedClass, setSelectedClass] = useState('');
    const [selectedTerm, setSelectedTerm] = useState('');
    const [selectedYear, setSelectedYear] = useState('');
    const [selectedPupils, setSelectedPupils] = useState(new Set());
    const [demoteClass, setDemoteClass] = useState('');
    const [demoteTerm, setDemoteTerm] = useState('');
    const [demoteYear, setDemoteYear] = useState('');

    useEffect(() => {
        fetchAllPupils();
    }, []);

    const fetchAllPupils = async () => {
        try {
            const response = await PupilService.getReportedStudent();
            console.log("reported student",response.data);
            setPupils(response.data);
        } catch (err) {
            if (err.data) {
                const errorMessage = err.data[0].message;
                console.log("Error from response", err.data, errorMessage);
                toast.warning("Try again: " + errorMessage);
            } else if (err.message) {
                toast.error(err.message);
            } else {
                toast.error("An unexpected error occurred. Please try again.");
            }
        }
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleDemoteStudents = async () => {
        if (selectedPupils.size !== 1) {
            console.error('Please select exactly one pupil to demote.');
            return;
        }

        const id = Array.from(selectedPupils)[0];
        const pupil = pupils.find(p => p.id === id);

        if (!pupil) {
            console.error('Pupil not found.');
            return;
        }

        const demotedPupilData = {
            studentclasstermid: pupil.id,
            datedemoted: new Date().toLocaleDateString('en-GB'),
            current_class_id: demoteClass,
            current_term_id: demoteTerm,
            academicyear: demoteYear,
            demotedby: sessionStorage.getItem("id"),
            createdby: parseInt(sessionStorage.getItem("id"), 10),
            lasteditedby: parseInt(sessionStorage.getItem("id"), 10),
            is_active: '1'
        };

        console.log(demotedPupilData);

        try {
            console.log("demoted pupil object", demotedPupilData);
            const response = await PupilService.demotePupil(demotedPupilData);
            if (response.status === 201) {
                toast.success('Pupil demoted successfully');
                navigate("/pupil-class-demotion")
            } else {
                toast.error('Failed to demote pupil');
            }
        } catch (error) {
            console.error('Error demoting pupil:', error);
            toast.error('Failed to demote pupil');
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

    const handleDemoteAll = () => {
        const filteredPupils = pupils
            .filter(pupil => (!selectedClass || pupil.current_class_id === selectedClass) &&
                (!selectedTerm || pupil.current_term_id === selectedTerm) &&
                (!selectedYear || pupil.academicyearid === selectedYear))
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

    const uniqueClasses = [...new Set(pupils.map(pupil => pupil.current_class_id))];
    const uniqueTerms = [...new Set(pupils.map(pupil => pupil.current_term_id))];
    const uniqueYears = [...new Set(pupils.map(pupil => pupil.academicyearid))];

    const filteredPupils = pupils
        .filter(pupil => (!selectedClass || pupil.current_class_id === selectedClass) &&
            (!selectedTerm || pupil.current_term_id === selectedTerm) &&
            (!selectedYear || pupil.academicyearid === selectedYear))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    const selectedCount = filteredPupils.filter(pupil => selectedPupils.has(pupil.id)).length;
    const totalInView = filteredPupils.length;
    const unselectedCount = totalInView - selectedCount;

    return (
        <MainCard title="Demote Page" style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}>
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
                                <InputLabel>Term</InputLabel>
                                <Select
                                    value={selectedTerm}
                                    onChange={(e) => setSelectedTerm(e.target.value)}
                                    label="Term"
                                >
                                    <MenuItem value="">All Terms</MenuItem>
                                    {uniqueTerms.map((term, index) => (
                                        <MenuItem key={index} value={term}>{term}</MenuItem>
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

            <Typography variant="h6" sx={{ mt: 2 }}>Select Demotion Details</Typography>
            <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} sm={4}>
                    <FormControl fullWidth>
                        <InputLabel>New Class</InputLabel>
                        <Select
                            value={demoteClass}
                            onChange={(e) => setDemoteClass(e.target.value)}
                            label="New Class"
                        >
                            {uniqueClasses.map((classId, index) => (
                                <MenuItem key={index} value={classId}>{classId}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <FormControl fullWidth>
                        <InputLabel>New Term</InputLabel>
                        <Select
                            value={demoteTerm}
                            onChange={(e) => setDemoteTerm(e.target.value)}
                            label="New Term"
                        >
                            {uniqueTerms.map((term, index   ) => (
                                <MenuItem key={index} value={term}>{term}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <FormControl fullWidth>
                        <InputLabel>New Academic Year</InputLabel>
                        <Select
                            value={demoteYear}
                            onChange={(e) => setDemoteYear(e.target.value)}
                            label="New Academic Year"
                        >
                            {uniqueYears.map((year, index) => (
                                <MenuItem key={index} value={year}>{year}</MenuItem>
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
                    Selected to Demote: {selectedCount}
                </Typography>
                <Typography variant="subtitle1" display="inline">
                    Not Selected to Demote: {unselectedCount}
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
                                    onChange={handleDemoteAll}
                                />
                            </TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Admission/Reg No</TableCell>
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
                                <TableCell>{pupil.name}</TableCell>
                                <TableCell>{pupil.admission_no}</TableCell>
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
                onClick={handleDemoteStudents}
                sx={{ mt: 2, mr: 2 }}
            >
                Demote Students
            </Button>

            <Button variant="contained" color="secondary" component={Link} to="/pupil-class-demotion" sx={{ mt: 2 }}>
                Cancel
            </Button>
        </MainCard>
    );
}

export default DemotePromote;
