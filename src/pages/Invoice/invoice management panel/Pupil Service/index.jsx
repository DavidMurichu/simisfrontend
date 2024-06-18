import React, { useState, useEffect } from 'react';
import { Typography, TextField, Button, Grid, MenuItem, Box } from '@mui/material';
import { toast } from 'react-toastify';
import TableTemplate from '../../../HOC/tabletemplate';
import MainCard from 'components/MainCard';
import axios from 'axios';
import { Link } from 'react-router-dom';

const columns = [
    { field: 'pupils', headerName: 'Pupils', width: 200 },
    { field: 'admissionNo', headerName: 'Admission No', width: 200 },
    { field: 'parentName', headerName: 'Parent Name', width: 200 },
    { field: 'parentMobile', headerName: 'Parent Mobile', width: 200 },
    { field: 'service', headerName: 'Service', width: 200 },
    { field: 'amount', headerName: 'Amount', width: 200 },
    { field: 'year', headerName: 'Year', width: 200 },
    { field: 'class', headerName: 'Class', width: 200 },
    { field: 'term', headerName: 'Term', width: 200 },
    { field: 'createdon', headerName: 'Createdon', width: 200 },
    { field: 'isActive', headerName: 'Is Active', width: 100 },
    {
        field: 'action',
        headerName: 'Action',
        width: 150,
        renderCell: (params) => (
            <Button
                variant="contained"
                color="secondary"
                onClick={() => handleDelete(params.row.id)}
            >
                Delete
            </Button>
        )
    }
];

const PupilServiceManagement = () => {
    const [classes, setClasses] = useState([]);
    const [academicYears, setAcademicYears] = useState([]);
    const [terms, setTerms] = useState([]);
    const [selectedClass, setSelectedClass] = useState('');
    const [selectedYear, setSelectedYear] = useState('');
    const [selectedTerm, setSelectedTerm] = useState('');
    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');
    const [tableData, setTableData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchDropdownData = async () => {
            try {
                const classResponse = await axios.get('/api/classes');
                const yearResponse = await axios.get('/api/academic-years');
                const termResponse = await axios.get('/api/terms');

                setClasses(classResponse.data);
                setAcademicYears(yearResponse.data);
                setTerms(termResponse.data);
            } catch (error) {
                toast.error("Error fetching dropdown data");
                console.error('Error fetching dropdown data:', error);
            }
        };

        fetchDropdownData();
    }, []);

    const handleSearch = async () => {
        try {
            setLoading(true);
            const response = await axios.get('/api/pupil-services', {
                params: {
                    class: selectedClass,
                    academicYear: selectedYear,
                    term: selectedTerm,
                    dateFrom,
                    dateTo
                }
            });
            setTableData(response.data);
        } catch (error) {
            toast.error("Error fetching service data");
            console.error('Error fetching service data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            // Assuming there's an endpoint to delete service records
            // const response = await axios.delete(`/api/pupil-services/${id}`);
            // if (response.status === 200) {
            //     toast.success("Deleted record successfully");
            //     handleSearch(); // Refresh data after deletion
            // } else {
            //     toast.warning("Error deleting record, please try again");
            // }
        } catch (error) {
            console.error('Error deleting record:', error);
            toast.error("Error deleting record. Please try again.");
        }
    };

    return (
        <MainCard title="PUPILS SERVICES">
            <Typography variant="body1" gutterBottom>
                Use the filters below to search for pupil services.
            </Typography>
            <Box sx={{ mb: 2 }}>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} md={3}>
                        <TextField
                            select
                            label="Select Class"
                            fullWidth
                            value={selectedClass}
                            onChange={(e) => setSelectedClass(e.target.value)}
                        >
                            {classes.map((cls) => (
                                <MenuItem key={cls.id} value={cls.id}>
                                    {cls.name}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <TextField
                            select
                            label="Academic Year"
                            fullWidth
                            value={selectedYear}
                            onChange={(e) => setSelectedYear(e.target.value)}
                        >
                            {academicYears.map((year) => (
                                <MenuItem key={year.id} value={year.id}>
                                    {year.name}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <TextField
                            select
                            label="Academic Year Term"
                            fullWidth
                            value={selectedTerm}
                            onChange={(e) => setSelectedTerm(e.target.value)}
                        >
                            {terms.map((term) => (
                                <MenuItem key={term.id} value={term.id}>
                                    {term.name}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <TextField
                            label="Date From"
                            type="date"
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                            value={dateFrom}
                            onChange={(e) => setDateFrom(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <TextField
                            label="Date To"
                            type="date"
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                            value={dateTo}
                            onChange={(e) => setDateTo(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleSearch}
                            fullWidth
                            disabled={loading}
                        >
                            Search
                        </Button>
                    </Grid>
                </Grid>
            </Box>
            <TableTemplate
                columns={columns}
                data={tableData}
                loading={loading}
                handleDelete={handleDelete}
            />
        </MainCard>
    );
};

export default PupilServiceManagement;
