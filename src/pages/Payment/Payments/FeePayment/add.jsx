import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import ApiService from 'services/apiservice';
import FetchData from 'services/fetch';
import { Delay } from 'pages/HOC/delay';

import {
    Typography,
    Button,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Grid,
    Box,
    Paper
} from '@mui/material';
import TableTemplate from 'pages/HOC/tabletemplate';
import MakePaymentManager from './makePayment';

const AddFeePayment = () => {
    const [refresh, setRefresh] = useState(false);
    const [process, setProcess] = useState(null);
    const [students, setStudents] = useState([]);
    const navigate = useNavigate();

    const [selectedClass, setSelectedClass] = useState('');
    const [selectedTerm, setSelectedTerm] = useState('');
    const [selectedYear, setSelectedYear] = useState('');
    const [classes, setClasses] = useState([]);
    const [academicyears, setAcademicYears] = useState([]);
    const [terms, setTerms] = useState([]);

    const data = async () => {
        await FetchData('home/get_data/sch_classes', setClasses);
        await FetchData('home/get_data/sch_terms', setTerms);
        await FetchData('home/get_data/sch_academic_years', setAcademicYears);
    };

    useEffect(() => {
        data();
    }, []);

    const uniqueClasses = [...new Set(classes.map(cls => cls.name))];
    const uniqueTerms = [...new Set(terms.map(term => term.name))];
    const uniqueYears = [...new Set(academicyears.map(academicyear => academicyear.name))];

    const handleSearch = async () => {
        
        if (!selectedClass || !selectedTerm || !selectedYear) {
            // Determine which fields are missing
            const missingFields = [];
            if (!selectedClass) missingFields.push('student class');
            if (!selectedTerm) missingFields.push('term');
            if (!selectedYear) missingFields.push('academic year');

            // Generate error message based on missing fields
            toast.error(`You need to select ${missingFields.join(' and ')}`);
            return;
        }
        setProcess(null);
        const payload = {
            classid: selectedClass,
            termid: selectedTerm,
            academicyearid: selectedYear
        };

        const response = await ApiService.post('home/get_payment_data', payload, true);
        console.log('payload', response)
        
        if (response.data.success) {
            console.log('data', response);
            const payloadData = response.data.students;
        
            if (payloadData.length === 0) {
                toast.error('No Invoiced Student Found');
                return;
            }
        
            setStudents(payloadData);
            toast.success('success');
        }
        
    };

    const handlePayment = (id) => {
        const student = students.find(student => student.id === id);
        setProcess(student);
        console.log('student', student);
    }

    const buttons = [
        { label: 'Make Payment', color: 'primary', handleFunction: handlePayment },
    ];

    const columns = [
        { field: 'name', headerName: 'Name' },
        { field: 'admission_no', headerName: 'Admission Number' },
        { field: 'current_class_id', headerName: 'Class' },
        { field: 'current_term_id', headerName: 'Term' },
        { field: 'genderid', headerName: 'Gender' },
    ];

    return (
        <>
         
            <Typography variant="h6" gutterBottom>
                Add Fee Payment
            </Typography>
            <Typography variant="body1" gutterBottom>
                Use the form below to filter students based on their class, term, and academic year. After selecting the appropriate criteria, click the "Search" button to retrieve a list of students. You can then proceed to make fee payments for individual students.
            </Typography>
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
                <Grid item xs={12} sm={4}>
                    <FormControl fullWidth>
                        
                    <Box >
                <Button variant="contained" type="submit" color="primary" onClick={handleSearch}>
                    Search
                </Button>
            </Box>
                    </FormControl>
                </Grid>
            </Grid>
            {process ?<>
                <MakePaymentManager student={process} />
            </>
                 : (
            students.length > 0 ? (
                <TableTemplate
                    addToast={false}
                    endpointdata={students}
                    buttons={buttons}
                    refresh={refresh}
                    columns={columns}
                />
            ) : (
                <Paper sx={{ p: 2, mt: 2 }}>
                    <Typography variant="body1" align="center" color="textSecondary">
                        No students found. Please refine your search criteria.
                    </Typography>
                </Paper>
            ))}
            <ToastContainer />
        </>
    );
};

export default AddFeePayment;
