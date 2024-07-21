import React, { useState, useEffect } from 'react';
import {
  Typography,
  Button,
  TableContainer,
  Paper,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Slide
} from '@mui/material';
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';

import { ToastContainer, toast } from 'react-toastify';
import { Navigate, useNavigate } from 'react-router';
import ApiService from 'services/apiservice';
import DoubleGenericTable from 'pages/HOC/doubleGenericTemplate';
import CombinedTable from 'pages/HOC/PupilServicesTemplate';
import { Delay } from 'pages/HOC/delay';
import FilterTemplate from 'pages/HOC/filter/FilterTemplate';
import FetchData from 'services/fetch';
import { isEmpty } from 'lodash';
import MainCard from 'components/MainCard';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


const StudentInvoice = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState(new Set());
  const [voteheads, setVoteheads] = useState([]);
  const [vodata, setVote] = useState([]);
  const [selectedVoteheads, setSelectedVoteheads] = useState(new Set());
  const [voteHeadAmount, setVoteHeadAmount] = useState(0);

  // Pagination state for students table
  const [studentsPage, setStudentsPage] = useState(0);
  const [studentsRowsPerPage, setStudentsRowsPerPage] = useState(5);
  const navigate = useNavigate();

  // Pagination state for voteheads table
  const [voteheadsPage, setVoteheadsPage] = useState(0);
  const [voteheadsRowsPerPage, setVoteheadsRowsPerPage] = useState(5);

  // State to control visibility of vote heads table
  const [showVoteheads, setShowVoteheads] = useState(false);

  const handleStudentSelect = (id) => {
    const updatedStudents = new Set(selectedStudents);
    if (updatedStudents.has(id)) {
      updatedStudents.delete(id);
    } else {
      updatedStudents.add(id);
    }
    setSelectedStudents(updatedStudents);
  };

  const handleVoteheadSelect = (id) => {
    const updatedVoteheads = new Set(selectedVoteheads);
    if (updatedVoteheads.has(id)) {
      updatedVoteheads.delete(id);
    } else {
      updatedVoteheads.add(id);
    }
    setSelectedVoteheads(updatedVoteheads);
  };

  useEffect(() => {
    setVoteHeadAmount(calculateTotalAmount());
  }, [selectedVoteheads]);

  const handleSubmit = async () => {
    if(isEmpty(selectedStudents)){
      toast.error('you need to select at least one student');
      return
    }
   
    try {
      const submitVoteHeads = Array.from(selectedVoteheads).map(id => {
        const v_data = voteheads.find(votehead => votehead.id === id);
        return {
          voteheadid: v_data.id,
          amount: v_data.amount
        };
      });


      const payload = Array.from(selectedStudents).map(id => {
        const student = students.find(student => student.id === id);

        // Map student services to match the desired format
        const services = student.services.map(service => ({
          serviceid: service.studentserviceid,
          amount: parseFloat(service.amount),
          balance: service.amount 
        }));

        // Map voteheads to match the desired format
        const s_voteheads = submitVoteHeads.map(votehead => ({
          voteheadid: votehead.voteheadid,
          amount: parseFloat(votehead.amount)
        }));

        return {
          studentid: id,
          services: services,
          voteheads: s_voteheads,
          invoiceData: {
            classid: student.current_class_id,
            termid: student.current_term_id,
            academicyearid: student.academicyearid,
            amount: student.totalAmount,
            balance: student.totalAmount,
            studentclasstermsid: student.class_term,
            is_reversed: "0",
            is_active: "1"
          }
        };
      });

      const finalPayload = {
        commondata: {
          createdby: 1
        },
        studentinvoices: payload
      };

      console.log(finalPayload);

      // Make API call to create invoices
      const response = await ApiService.post('home/create_invoice', finalPayload, true);

      // Handle success
      if (response.status === 200) {
        toast.success('Invoices generated successfully');
        await Delay(1000);
      navigate('/invoices/school-fee-management');
      } else {
        toast.error('Failed to generate invoices');
      }
      
    } catch (error) {
      // Handle errors
      if(error.response.data.error){
      console.error('Error submitting invoices:', error);

        toast.warning(error.response.data.error);
      }else{
        console.log('Error submitting invoices:', error)
        toast.error('Error Creating invoice');
      }
     
    }
  };

  const calculateTotalAmount = () => {
    let total = 0;
    for (const id of selectedVoteheads) {
      const votehead = voteheads.find(votehead => votehead.id === id);
      if (votehead) {
        total += parseFloat(votehead.amount);
      }
    }
    return total;
  };

  const toggleVoteheads = () => {
    setShowVoteheads(prev => !prev); // Toggle showVoteheads state
  };

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [selectedClass, setSelectedClass] = useState('');
    const [selectedTerm, setSelectedTerm] = useState('');
    const [selectedYear, setSelectedYear] = useState('');
    const [selectedPupils, setSelectedPupils] = useState(new Set());
    const [classes, setClases]=useState([]);
    const [academicyears, setAcademicyears]=useState([]);
    const [terms, setTerms]=useState([]);
    

    const data=async()=>{
      await FetchData('home/get_data/sch_classes', setClases);
      await FetchData('home/get_data/sch_terms', setTerms);
      await FetchData('home/get_data/sch_academic_years', setAcademicyears);
   
    }
    useEffect(()=>{
      data();
    }, []);
    const uniqueClasses = [...new Set(classes.map(cls => cls.name))];
    const uniqueTerms = [...new Set(terms.map(term => term.name))];
    const uniqueYears = [...new Set(academicyears.map(academicyear => academicyear.name))];
    const filteredPupils = students
        .filter(pupil => (!selectedClass || pupil.current_class_id === selectedClass) &&
            (!selectedTerm || pupil.current_term_id === selectedTerm) &&
            (!selectedYear || pupil.academicyearid === selectedYear))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    const selectedCount = filteredPupils.filter(pupil => selectedPupils.has(pupil.id)).length;
    const totalInView = filteredPupils.length;
    const unselectedCount = totalInView - selectedCount;

    const handleSearch= async()=>{
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
      const payload={
        classid:selectedClass,
        termid:selectedTerm,
        academicyearid:selectedYear
      }
      const response=await ApiService.post('home/get_invoice_data', payload, true);
      if(response.data.success){
      console.log('data', response.data);

        setVoteheads(response.data.vote_heads);
        setStudents(response.data.students);
      }
     
    }


  return (
    <MainCard>
    
                
                  
      <Typography variant="h6">Filter Students</Typography>
                  
               
                <Typography >
                    <Box
        sx={{
          right: 0,
          zIndex: 1000,
        }}
      >
        <Button variant="contained" type="submit" color="primary"
         onClick={handleSearch}
         >
          Search
        </Button>
      </Box>
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
                    </Grid>
    <Grid container spacing={2}>
      {/* Generate Invoice Button */}
      <Box
        sx={{
          position: 'fixed',
          bottom: 100,
          right: 10,
          zIndex: 1000,
        }}
      >
        <Button variant="contained" type="submit" color="primary" onClick={handleSubmit}>
          Generate Invoice
        </Button>
      </Box>
      

      <Box
        sx={{
          position: 'fixed',
          top: 70,
          right: showVoteheads ? 440 : 10,
          zIndex: 1000,
        }}
      >
        <Button variant="contained" color="primary" onClick={toggleVoteheads}>
          {showVoteheads ? 'Hide' : 'Show'} Vote Heads
        </Button>
      </Box>
     
      

           


            

            {/* <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle1" display="inline" mr={3}>
                    Total Students in View: {totalInView}
                </Typography>
                <Typography variant="subtitle1" display="inline" mr={3}>
                    Selected to Demote: {selectedCount}
                </Typography>
                <Typography variant="subtitle1" display="inline">
                    Not Selected to Demote: {unselectedCount}
                </Typography>
            </Box> */}

      <Grid item xs={12}>
      <IconButton onClick={() => navigate('/invoices/school-fee-management')} color="primary">
        <ArrowBackIcon />
      </IconButton> 
        <Paper elevation={3}>
          <Typography variant="h6" align="center" gutterBottom>
            Students Table
          </Typography>
          <CombinedTable
            title={''}
            isCombo={true}
            students={students}
            voteHeadAmount={voteHeadAmount}
            setStudents={setStudents}
            selectedStudents={selectedStudents}
            onSelectStudent={handleStudentSelect}
          />
        </Paper>
      </Grid>

      <Slide 
       direction="left"
       in={showVoteheads}
        > 
        <Grid 
        item xs={6} sx={{ position: 'absolute', top: 50, right: 0, zIndex: 999999999 }}
        >
          <Paper elevation={3}>
            <Typography variant="h6" align="center" gutterBottom>
              Vote Heads Table
            </Typography>
            <DoubleGenericTable
              title=""
              rows={voteheads}
              page={voteheadsPage}
              rowsPerPage={voteheadsRowsPerPage}
              handleChangePage={(event, newPage) => setVoteheadsPage(newPage)}
              handleChangeRowsPerPage={(event) => {
                setVoteheadsRowsPerPage(parseInt(event.target.value, 10));
                setVoteheadsPage(0);
              }}
              columns={[
                { id: 'voteheadid', label: 'Vote Head' },
                { id: 'amount', label: 'Amount' },
                { id: 'action', label: 'Select', numeric: false }
              ]}
              handleSelect={handleVoteheadSelect}
              handleInputChange={() => { }}
            />
          </Paper>
        </Grid>
      </Slide> 

      <ToastContainer  />
    </Grid>
    </MainCard>
    
  );
};

export default StudentInvoice;
