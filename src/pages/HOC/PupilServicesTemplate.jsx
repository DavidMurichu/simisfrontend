import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Collapse,
  Box,
  Typography,
  TextField,
  Checkbox,
  TablePagination,
  IconButton,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import usePagination from './customPagination';
import { Navigate } from 'react-router';

const CombinedTable = ({ title, students, setStudents, selectedStudents, onSelectStudent, voteHeadAmount, isCombo=false }) => {
  const [expandedId, setExpandedId] = useState(null);
  const [hoveredId, setHoveredId] = useState(null);

  const { page, rowsPerPage, handleChangePage, handleChangeRowsPerPage } = usePagination();

  useEffect(() => {
    const updatedStudents = students.map(student => ({
      ...student,
      totalAmount: getTotalAmount(student.services)
    }));
    setStudents(updatedStudents);
  }, [students]);

  const handleExpandClick = (id) => {
    if (expandedId === id) {
      setExpandedId(null);
    } else {
      setExpandedId(id);
    }
  };

  const handleMouseEnter = (id) => {
    setHoveredId(id);
  };

  const handleMouseLeave = () => {
    setHoveredId(null);
  };

  const handleAmountChange = (studentId, serviceIndex, newAmount) => {
    const updatedStudents = students.map((student) => {
      if (student.id === studentId) {
        const updatedServices = student.services.map((service, index) => {
          if (index === serviceIndex) {
            return { ...service, amount: newAmount };
          }
          return service;
        });
        const totalAmount = getTotalAmount(updatedServices);
        return { ...student, services: updatedServices, totalAmount: totalAmount };
      }
      return student;
    });
    setStudents(updatedStudents); 
  };

  const getTotalAmount = (services) => {
    const serviceTotal = services.reduce((total, service) => total + parseFloat(service.amount), 0);
    return serviceTotal + voteHeadAmount;
  };

  const renderServicesTable = (services, studentId) => (
    <Box
      sx={{
        width: '50%',
        border: '1px solid #ddd',
        borderRadius: '8px',
        overflow: 'hidden',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        backgroundColor: '#fff'
      }}
    >
      <Table size="small" aria-label="services table">
        <TableHead>
          <TableRow>
            <TableCell align="center" sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>Service</TableCell>
            <TableCell align="center" sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {services.map((service, index) => (
            <TableRow key={index}>
              <TableCell align="center">{service.name}</TableCell>
              <TableCell align="center">
                <TextField
                  type="number"
                  value={service.amount}
                  onChange={(e) => handleAmountChange(studentId, index, e.target.value)}
                  sx={{ width: 'fit-content', maxWidth:'400px' }}
                  inputProps={{
                    style: {
                      textAlign: 'center'
                    }
                  }}
                />
              </TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell colSpan={2} align="center">
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mt: 2 }}>
                Total: {getTotalAmount(services)}
              </Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Box>
  );

   // Check if rows is not defined or not an array
   if (!Array.isArray(students) || students.length === 0) {
    return (
      <Paper style={{ height: 'fit-content', overflowY: 'auto', padding: '10px' }}>
        <Typography variant="h5">{title}</Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>No data available</TableCell>
              </TableRow>
            </TableHead>
          </Table>
        </TableContainer>
      </Paper>
    );
  }

  return (
    <Paper style={{ height: 'fit-content', overflowY: 'auto', padding: '10px' }}>
      <Typography variant="h5">{title}</Typography>
     {
      !isCombo?(
        <IconButton onClick={() => Navigate(-1)} color="primary">
        <ArrowBackIcon />
</IconButton> 
      ):null
     }
           
                
                
      <TableContainer>
        <Table className="custom-table">
          <TableHead>
            <TableRow>
              <TableCell>Select</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Admission No</TableCell>
              <TableCell>Class</TableCell>
              <TableCell>Term</TableCell>
              <TableCell>Academic Year</TableCell>
              <TableCell>Total Amount</TableCell>
              <TableCell>Services</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((student, index) => (
              <React.Fragment key={student.id}>
                <TableRow
                  onMouseEnter={() => handleMouseEnter(student.id)}
                  onMouseLeave={handleMouseLeave}
                  className={hoveredId === student.id ? 'table-row-hover' : ''}
                >
                  <TableCell>
                    <Checkbox
                      checked={selectedStudents.has(student.id)}
                      onChange={() => onSelectStudent(student.id)}
                    />
                  </TableCell>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{student.admission_no}</TableCell>
                  <TableCell>{student.current_class_id}</TableCell>
                  <TableCell>{student.current_term_id}</TableCell>
                  <TableCell>{student.academicyearid}</TableCell>
                  <TableCell>{student.totalAmount}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      onClick={() => handleExpandClick(student.id)}
                    >
                      {expandedId === student.id ? 'Hide Services' : 'Show Services'}
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse
                      in={expandedId === student.id}
                      timeout="auto"
                      unmountOnExit
                    >
                      <Box margin={1}>
                        <Typography variant="h6" gutterBottom component="div">
                          Services Details
                        </Typography>
                        {renderServicesTable(student.services, student.id)}
                      </Box>
                    </Collapse>
                  </TableCell>
                </TableRow>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={students.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default CombinedTable;