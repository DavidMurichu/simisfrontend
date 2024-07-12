import React, { useState } from 'react';
import {
  Typography,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Checkbox,
  TablePagination,
  TextField
} from '@mui/material';
import usePagination from './customPagination';

const DoubleGenericTable = ({
  title,
  rows = [],
  columns,
  handleSelect,
  handleInputChange
}) => {
  const {
    page,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage
  } = usePagination();

  // Check if rows is not defined or not an array
  if (!Array.isArray(rows) || rows.length === 0) {
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
    <Paper style={{ height: '90%', overflowY: 'auto', padding: '10px' }}>
      <Typography variant="h5">{title}</Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              {columns.map(column => (
                <TableCell key={column.id}>{column.label}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, rowIndex) => (
                <TableRow key={row.id}>
                  <TableCell>{page * rowsPerPage + rowIndex + 1}</TableCell> {/* Displaying row index */}
                  {columns.map(column => (
                    <TableCell key={column.id}>
                      {column.id === 'action' ? (
                        <Checkbox
                          checked={row.selected}
                          onChange={() => handleSelect(row.id)}
                        />
                      ) : column.id === 'cost' || column.id === 'amount' ? (
                        <TextField
                          type="number"
                          value={row[column.id]}
                          onChange={e =>
                            handleInputChange(row.id, e.target.value, column.id)
                          }
                        />
                      ) : (
                        row[column.id]
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default DoubleGenericTable;
