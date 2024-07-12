import React from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Checkbox, Button
} from '@mui/material';
import usePagination from './customPagination';

function CustomTable({ data, columns, selectedItems, onSelectAll, onSelectItem, actionButtonLabel, actionButtonLink, actionButtonVariant, actionButtonColor }) {
  const { page, rowsPerPage, handleChangePage, handleChangeRowsPerPage } = usePagination();

  // Check if data is not defined or not an array
  if (!Array.isArray(data) || data.length === 0) {
    return (
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
    );
  }

  const isSelectAll = selectedItems.size > 0 && selectedItems.size === data.length;

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox">
              <Checkbox
                indeterminate={selectedItems.size > 0 && selectedItems.size < data.length}
                checked={isSelectAll}
                onChange={() => onSelectAll(!isSelectAll)}
              />
            </TableCell>
            {columns.map((column) => (
              <TableCell key={column.field}>{column.label}</TableCell>
            ))}
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
            <TableRow key={row.id}>
              <TableCell padding="checkbox">
                <Checkbox
                  checked={selectedItems.has(row.id)}
                  onChange={() => onSelectItem(row.id)}
                />
              </TableCell>
              {columns.map((column) => (
                <TableCell key={column.field}>{row[column.field]}</TableCell>
              ))}
              <TableCell>
                <Button
                  variant={actionButtonVariant}
                  color={actionButtonColor}
                  href={`${actionButtonLink}/${row.id}`}
                >
                  {actionButtonLabel}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        count={data.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
}

export default CustomTable;
