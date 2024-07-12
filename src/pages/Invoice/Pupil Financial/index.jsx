import React, { useState, useEffect } from 'react';
import { Typography, TextField, Button, Grid, MenuItem, Box, Tabs, Tab } from '@mui/material';
import { toast } from 'react-toastify';
import TableTemplate from '../../HOC/tabletemplate';
import MainCard from 'components/MainCard';
import axios from 'axios';
import DoubleGenericTable from 'pages/HOC/doubleGenericTemplate';

const columns = [
    { field: 'pupils', headerName: 'Pupils', width: 200 },
    { field: 'admissionNo', headerName: 'Admission No', width: 200 },
    { field: 'invoiceDate', headerName: 'Invoice Date', width: 200 },
    { field: 'invoiceNo', headerName: 'Invoice No', width: 200 },
    { field: 'amount', headerName: 'Amount', width: 200 }
];

const bulkReversalColumns = [
    ...columns,
    {
        field: 'action',
        headerName: 'Action',
        width: 150,
        renderCell: (params) => (
            <Button
                variant="contained"
                color="secondary"
                onClick={() => handleReverse(params.row.id)}
            >
                Reverse
            </Button>
        )
    }
];

const PupilFinancial = () => {
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
    const [tabValue, setTabValue] = useState(0);

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
            const response = await axios.get('/api/pupil-financials', {
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
            toast.error("Error fetching financial data");
            console.error('Error fetching financial data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSelect=()=>{

    }
    

    const handleReverse = async (id) => {
        try {
            // Assuming there's an endpoint to reverse financial records
            // const response = await axios.post(`/api/pupil-financials/reverse/${id}`);
            // if (response.status === 200) {
            //     toast.success("Reversed record successfully");
            //     handleSearch(); // Refresh data after reversal
            // } else {
            //     toast.warning("Error reversing record, please try again");
            // }
        } catch (error) {
            console.error('Error reversing record:', error);
            toast.error("Error reversing record. Please try again.");
        }
    };

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const endpoint = 'home/get_data/member_payable_arears';
    const handleEdit=()=>{

    }
    const handleDelete=()=>{
        
    }
    const buttons = [
        { label: 'Edit', color: 'primary', handleFunction: handleEdit },
        { label: 'Delete', color: 'error', handleFunction: handleDelete },
        { label: 'Reverse', color: 'secondary', handleFunction: handleReverse },
    ];
   
    const columns = [
        {
            field: 'studentid',
            headerName: 'Pupil',
            foreign: 'student', 
            foreignField: 'name'
        },
        { field: 'amount', headerName: 'Amount' },
        { field: 'created_at', headerName: 'Created On' },
        { field: 'is_active', headerName: 'Is Active' }
    ];
    return (
        <MainCard title="Pupil Financial" style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}>
            <Typography variant="body1" gutterBottom>
                Use the filters below to search for pupil financial records.
            </Typography>
            
            <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/school-fee-invoice"
                sx={{ mr: 1 }}
            >
               Reverse Invoicesu
            </Button>
            {tabValue === 0 && (
                <TableTemplate
                buttons={buttons}
                columns={columns}
                endpoint={endpoint}
            />
            )}

            {tabValue === 1 && (
                    <TableTemplate
                    checkboxes={[
                        {
                            handleSelect: handleSelect,
                        }
                    ]}
                    buttons={buttons}
                    columns={columns}
                    endpoint={endpoint}
                />
            
            )}
          
        </MainCard>
    );
};

export default PupilFinancial;
