import React, { useState, useEffect } from 'react';
import { Typography, Button, Grid, Box, TextField } from '@mui/material';
import ApiService from 'services/apiservice';
import { ToastContainer, toast } from 'react-toastify';
import DoubleGenericTable from 'pages/HOC/doubleGenericTemplate';
import { Delay } from 'pages/HOC/delay';
import { useNavigate } from 'react-router';


const BulkArearCreation = () => {
    const [services, setServices] = useState([]);
    const [students, setStudents] = useState([]);
    const [selectedServices, setSelectedServices] = useState(new Set());
    const [selectedStudents, setSelectedStudents] = useState(new Set());
    const navigate=useNavigate();

    // Pagination state for services table
    const [servicesPage, setServicesPage] = useState(0);
    const [servicesRowsPerPage, setServicesRowsPerPage] = useState(5);

    // Pagination state for students table
    const [studentsPage, setStudentsPage] = useState(0);
    const [studentsRowsPerPage, setStudentsRowsPerPage] = useState(5);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await ApiService.get('home/get_data/sch_services');
                setServices(response.data);
            } catch (error) {
                console.error('Error fetching services:', error);
            }
        };

        const fetchStudents = async () => {
            try {
                const response = await ApiService.get('home/promoted/students/sch_student_class_terms');
                setStudents(response.data);
            } catch (error) {
                console.error('Error fetching students:', error);
            }
        };

        fetchServices();
        fetchStudents();
    }, []);

    const handleServiceSelect = (id) => {
        const updatedServices = new Set(selectedServices);
        if (updatedServices.has(id)) {
            updatedServices.delete(id);
        } else {
            updatedServices.add(id);
        }
        setSelectedServices(updatedServices);
    };

    const handleStudentSelect = (id) => {
        const updatedStudents = new Set(selectedStudents);
        if (updatedStudents.has(id)) {
            updatedStudents.delete(id);
        } else {
            updatedStudents.add(id);
        }
        setSelectedStudents(updatedStudents);
    };

    const handleServiceCostChange = (id, newValue) => {
        const updatedServices = services.map(service =>
            service.id === id ? { ...service, cost: newValue } : service
        );
        setServices(updatedServices);
    };

    const calculateTotalAmount = () => {
        let total = 0;
        for (const id of selectedServices) {
            const service = services.find(service => service.id === id);
            if (service) {
                total += parseFloat(service.cost);
            }
        }
        return total;
    };

    const handleSubmit = async () => {
        if (selectedStudents.size === 0 || selectedServices.size===0 ) {
            toast.error(' Please select at least one student one service .');
            return;
        }

        const commondata = {
            createdby: 1,
            laseditedby: 1,
            branchid: "School",
            is_active: "1",
            remarks: "hello mofo",
        };
        const paymentterms=Array.from(selectedServices).map(id=>{
            const service=services.find(service=> service.id=== id);
            return service.paymenttermid;
        });
        const studentarears = Array.from(selectedStudents).map(id => {
            const student = students.find(student => student.id === id);
            return {
                studentclasspromotiontermid: student.classterm_id,
                academicyearid: student.academicyearid,
                classid: student.current_class_id,
                termid: student.current_term_id,
                studentid: student.id,
                amount: calculateTotalAmount()
            };
        });

        const submitData = {
            commondata,
            studentarears,
            paymentterms
        };
        console.log(submitData);
        try {
            const response = await ApiService.post('home/create_arear', submitData);
            console.log('Submission successful:', response.data);
            
            toast.success('Submission successful');
            await Delay(1000);
            navigate('/invoices/create-arrear');
            
        } catch (error) {
            console.error('Error submitting data:', error);
            toast.error('Error submitting data');
        }
    };

    // Column configuration for tables
    const serviceColumns = [
        
        { id: 'name', label: 'Service Name' },
        { id: 'cost', label: 'Cost' },
        { id: 'action', label: 'Action' }
    ];

    const studentColumns = [
        
        { id: 'name', label: 'Pupil' },
        { id: 'admission_no', label: 'Admission No' },
        { id: 'action', label: 'Action' }
    ];

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
                <DoubleGenericTable
                    title="Bulk Arear Creation - Services"
                    rows={services.map((service, index) => ({ ...service, selected: selectedServices.has(service.id) }))}
                    columns={serviceColumns}
                    handleSelect={handleServiceSelect}
                    handleInputChange={handleServiceCostChange}
                />
                <Box mt={2} style={{ textAlign: 'center', backgroundColor: '#f5f5f5', padding: '10px', borderRadius: '4px' }}>
                    <Typography variant="h6">Total Selected Services Amount: {calculateTotalAmount()}</Typography>
                </Box>
            </Grid>

            <Grid item xs={12} md={6}>
                <DoubleGenericTable
                    title="Select Students"
                    rows={students.map((student, index) => ({ ...student, selected: selectedStudents.has(student.id) }))}
                    page={studentsPage}
                    rowsPerPage={studentsRowsPerPage}
                    handleChangePage={(event, newPage) => setStudentsPage(newPage)}
                    handleChangeRowsPerPage={(event) => {
                        setStudentsRowsPerPage(parseInt(event.target.value, 10));
                        setStudentsPage(0);
                    }}
                    columns={studentColumns}
                    handleSelect={handleStudentSelect}
                />
                <Box mt={2} style={{ textAlign: 'center' }}>
                    <Button variant="contained" color="primary" onClick={handleSubmit}>Submit</Button>
                </Box>
            </Grid>
            <ToastContainer />
        </Grid>
    );
}

export default BulkArearCreation;
