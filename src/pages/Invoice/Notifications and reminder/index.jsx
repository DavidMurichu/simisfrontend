import React, { useState, useEffect } from 'react';
import { Typography, TextField, Button, Grid, MenuItem, Box, Checkbox, FormControlLabel } from '@mui/material';
import { toast } from 'react-toastify';
import TableTemplate from '../../HOC/tabletemplate';
import MainCard from 'components/MainCard';
import axios from 'axios';

const columns = [
    { field: 'checkbox', headerName: '', width: 50, renderCell: (params) => <Checkbox /> },
    { field: 'pupils', headerName: 'Pupils', width: 200 },
    { field: 'admissionNo', headerName: 'Admission No', width: 200 },
    { field: 'class', headerName: 'Class', width: 200 },
    { field: 'mobileNo', headerName: 'Mobile No', width: 200 },
    { field: 'arrears', headerName: 'Arrears', width: 200 },
    { field: 'amountPaid', headerName: 'Amount Paid', width: 200 },
    { field: 'balanceDue', headerName: 'Balance Due', width: 200 },
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

const NotificationsAndReminder = () => {
    const [pupils, setPupils] = useState([]);
    const [classes, setClasses] = useState([]);
    const [selectedPupil, setSelectedPupil] = useState('');
    const [selectedClass, setSelectedClass] = useState('');
    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');
    const [allWithArrears, setAllWithArrears] = useState(false);
    const [tableData, setTableData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filterApplied, setFilterApplied] = useState(false);

    useEffect(() => {
        const fetchDropdownData = async () => {
            try {
                const pupilResponse = await axios.get('/api/pupils');
                const classResponse = await axios.get('/api/classes');

                setPupils(pupilResponse.data);
                setClasses(classResponse.data);
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
            const response = await axios.get('/api/pupils-arrears', {
                params: {
                    pupil: selectedPupil,
                    class: selectedClass,
                    dateFrom,
                    dateTo,
                    allWithArrears
                }
            });
            setTableData(response.data);
            setFilterApplied(true);
        } catch (error) {
            toast.error("Error fetching arrears data");
            console.error('Error fetching arrears data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            // Assuming there's an endpoint to delete arrears records
            // const response = await axios.delete(`/api/pupils-arrears/${id}`);
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

    const handleCheckboxChange = (event) => {
        setAllWithArrears(event.target.checked);
    };

    return (
        <MainCard title="Pupil Arrears Balances" style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}>
            <Typography variant="body1" gutterBottom>
                Use the filters below to search for pupil arrears balances.
            </Typography>
            <Box sx={{ mb: 2 }}>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} md={3}>
                        <TextField
                            select
                            label="Select Pupil"
                            fullWidth
                            value={selectedPupil}
                            onChange={(e) => setSelectedPupil(e.target.value)}
                        >
                            {pupils.map((pupil) => (
                                <MenuItem key={pupil.id} value={pupil.id}>
                                    {pupil.name}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
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
                        <FormControlLabel
                            control={<Checkbox checked={allWithArrears} onChange={handleCheckboxChange} />}
                            label="All With Arrears"
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
                            Apply Filter
                        </Button>
                    </Grid>
                </Grid>
            </Box>
            {!filterApplied ? (
                <Typography variant="h6" align="center" sx={{ mt: 4 }}>
                    Apply filter to continue
                </Typography>
            ) : (
                <TableTemplate
                    columns={columns}
                    data={tableData}
                    loading={loading}
                    handleDelete={handleDelete}
                />
            )}
        </MainCard>
    );
};

export default NotificationsAndReminder;
