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
    Box
} from '@mui/material';
import PupilService from '../../../../../services/pupilservice';
import MainCard from 'components/MainCard';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import FilterComponent from './table';

function DemotePromoteTest() {
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
            console.log("reported student", response.data);
            setPupils(response.data);
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

    const handleDemoteAll = () => {
        const filteredPupils = getFilteredPupils();

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

    const getFilteredPupils = () => {
        return pupils
            .filter(pupil => (!selectedClass || pupil.current_class_id === selectedClass) &&
                (!selectedTerm || pupil.current_term_id === selectedTerm) &&
                (!selectedYear || pupil.academicyearid === selectedYear))
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    };

    const uniqueClasses = [...new Set(pupils.map(pupil => pupil.current_class_id))];
    const uniqueTerms = [...new Set(pupils.map(pupil => pupil.current_term_id))];
    const uniqueYears = [...new Set(pupils.map(pupil => pupil.academicyearid))];

    const filteredPupils = getFilteredPupils();

    const selectedCount = filteredPupils.filter(pupil => selectedPupils.has(pupil.id)).length;
    const totalInView = filteredPupils.length;
    const unselectedCount = totalInView - selectedCount;

    return (
        <MainCard title="Demote Page" style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}>
            <FilterComponent
                uniqueClasses={uniqueClasses}
                uniqueTerms={uniqueTerms}
                uniqueYears={uniqueYears}
                selectedClass={selectedClass}
                setSelectedClass={setSelectedClass}
                selectedTerm={selectedTerm}
                setSelectedTerm={setSelectedTerm}
                selectedYear={selectedYear}
                setSelectedYear={setSelectedYear}
            />

            <Typography variant="h6" style={{ textAlign: "center", color: "black" }}>
                Student Details
            </Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell padding="checkbox">
                                <Checkbox
                                    indeterminate={selectedCount > 0 && selectedCount < totalInView}
                                    checked={selectedCount === totalInView && totalInView > 0}
                                    onChange={handleDemoteAll}
                                />
                            </TableCell>
                            <TableCell>Student Name</TableCell>
                            <TableCell>Admission Number</TableCell>
                            <TableCell>Current Class</TableCell>
                            <TableCell>Current Term</TableCell>
                            <TableCell>Academic Year</TableCell>
                            <TableCell>Class to Demote</TableCell>
                            <TableCell>Term to Demote</TableCell>
                            <TableCell>Academic Year to Demote</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredPupils.map((pupil) => (
                            <TableRow key={pupil.id} selected={selectedPupils.has(pupil.id)}>
                                <TableCell padding="checkbox">
                                    <Checkbox
                                        checked={selectedPupils.has(pupil.id)}
                                        onChange={() => handleCheckboxChange(pupil.id)}
                                    />
                                </TableCell>
                                <TableCell>{pupil.full_name}</TableCell>
                                <TableCell>{pupil.admission_number}</TableCell>
                                <TableCell>{pupil.current_class_id}</TableCell>
                                <TableCell>{pupil.current_term_id}</TableCell>
                                <TableCell>{pupil.academicyearid}</TableCell>
                                <TableCell>
                                    <FormControl fullWidth>
                                        <Select
                                            value={demoteClass}
                                            onChange={(e) => setDemoteClass(e.target.value)}
                                        >
                                            <MenuItem value=""><em>None</em></MenuItem>
                                            {uniqueClasses.map((classId, index) => (
                                                <MenuItem key={index} value={classId}>{classId}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </TableCell>
                                <TableCell>
                                    <FormControl fullWidth>
                                        <Select
                                            value={demoteTerm}
                                            onChange={(e) => setDemoteTerm(e.target.value)}
                                        >
                                            <MenuItem value=""><em>None</em></MenuItem>
                                            {uniqueTerms.map((term, index) => (
                                                <MenuItem key={index} value={term}>{term}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </TableCell>
                                <TableCell>
                                    <FormControl fullWidth>
                                        <Select
                                            value={demoteYear}
                                            onChange={(e) => setDemoteYear(e.target.value)}
                                        >
                                            <MenuItem value=""><em>None</em></MenuItem>
                                            {uniqueYears.map((year, index) => (
                                                <MenuItem key={index} value={year}>{year}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                component="div"
                count={pupils.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
            <Box textAlign="center">
                <Button onClick={handleDemoteStudents} variant="contained" color="primary">
                    Demote Pupil
                </Button>
            </Box>
        </MainCard>
    );
}

export default DemotePromoteTest;
