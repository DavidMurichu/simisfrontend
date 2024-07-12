import React, { useState, useEffect } from 'react';
import {
  Grid,
  Box,
  Typography,
  Button,
  Paper,
  Slide
} from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import ApiService from 'services/apiservice';

import DoubleGenericTable from 'pages/HOC/doubleGenericTemplate';
import CombinedTable from 'pages/HOC/PupilServicesTemplate'; // Adjust path as per your structure
import { Delay } from 'pages/HOC/delay';
import { useNavigate } from 'react-router';
import FilterTemplate from 'pages/HOC/filter/FilterTemplate'; // Keeping only the FilterTemplate

const CreatInvoice = () => {

  const [students, setStudents] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState(new Set());
  const [voteheads, setVoteheads] = useState([]);
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

  const fetch= async ()=>{
  
    
  }

  return(
    <Grid>
    <Grid item xs={12}>
        <Typography variant="body1" gutterBottom>
          Use the filters below to search for service invoices.
        </Typography>
        <FilterTemplate
          filters={[]} 
          filterValues={{}}
          handleFilterChange={() => {}} 
          handleSearch={() => {}} 
          loading={false} 
        />
        <Paper elevation={3}>
          <Typography variant="h6" align="center" gutterBottom>
            Students Table
          </Typography>
          <CombinedTable
            title={''}
            students={students}
            voteHeadAmount={voteHeadAmount}
            setStudents={setStudents}
            // selectedStudents={selectedStudents}
            // onSelectStudent={handleStudentSelect}
          />
        </Paper>
      </Grid>

      <Slide direction="left" in={showVoteheads}>
        <Grid item xs={6} sx={{ position: 'absolute', top: 50, right: 0, zIndex: 999999999 }}>
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

      <ToastContainer />
    </Grid>
  )


}

expo