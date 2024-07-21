import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TablePagination from '@mui/material/TablePagination';
import Checkbox from '@mui/material/Checkbox'; // Import Checkbox from MUI
import BaseLink from "../../services/baselink";
import ApiService from "../../services/apiservice";
import { ToastContainer } from 'react-toastify';

const TableTemplate = ({ columns, endpoint, buttons = [], checkboxes = [], refresh, endpointdata, addToast=true }) => {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectAll, setSelectAll] = useState(false); // State to manage Select All checkbox
    const BASE_URL = BaseLink.getBaseLink();
    useEffect(() => {
        if (endpointdata) {
            setData(endpointdata);
        } else {
            const fetchData = async () => {
                try {
                    const response = await ApiService.get(endpoint, {}, true);
                    const result = response.data;
                    setData(Array.isArray(result) ? result.map(item => ({ ...item, selected: false })) : []);
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            };
            fetchData();
        }
    }, [endpoint, refresh, endpointdata]);

    
    
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const getStatusColor = (isActive) => {
        return isActive ? 'green' : 'red';
    };

    const renderForeignKeyField = (row, foreignHolder, renderField) => {
        if (row[foreignHolder] && row[foreignHolder][renderField]) {
            return row[foreignHolder][renderField];
        }
        return 'N/A';
    };

    const handleSelectAll = (event) => {
        const checked = event.target.checked;
        setSelectAll(checked);
        const updatedData = data.map(row => ({ ...row, selected: checked }));
        setData(updatedData);
    };

    const handleSingleSelect = (id, checked) => {
        const updatedData = data.map(row => {
            if (row.id === id) {
                return { ...row, selected: checked };
            }
            return row;
        });
        setData(updatedData);
    };

    const renderBooleanField = (value) => {
        const boolValue = value === "1" || value === 1;
        return (
            <Typography variant="body1" style={{ color: getStatusColor(boolValue) }}>
                {boolValue ? 'Yes' : 'No'}
            </Typography>
        );
    };

    return (
        <div>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            {checkboxes.length > 0 && (
                                <TableCell>
                                    <Checkbox
                                        checked={selectAll}
                                        onChange={handleSelectAll}
                                    />
                                </TableCell>
                            )}
                            {columns.map((column) => (
                                <TableCell key={column.field}>{column.headerName}</TableCell>
                            ))}
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data
                            .filter((row) =>
                                columns.some((column) =>
                                    row[column.field] && row[column.field].toString().toLowerCase().includes(searchQuery.toLowerCase())
                                )
                            )
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => (
                                <TableRow key={row.id}>
                                    {checkboxes.length > 0 && (
                                        <TableCell>
                                            <Checkbox
                                                checked={row.selected}
                                                onChange={(e) => handleSingleSelect(row.id, e.target.checked)}
                                            />
                                        </TableCell>
                                    )}
                                    {columns.map((column) => (
                                        <TableCell key={column.field}>
                                            {column.foreign ? (
                                                <Typography variant="body1">
                                                    {renderForeignKeyField(row, column.foreign, column.foreignField)}
                                                </Typography>
                                            ) : column.field === 'is_active' || column.type === 'boolean' ? (
                                                renderBooleanField(row[column.field])
                                            ) : (
                                                row[column.field]
                                            )}
                                        </TableCell>
                                    ))}
                                    <TableCell>
                                        {buttons.map((button, index) => (
                                            <Button
                                                key={index}
                                                variant="outlined"
                                                color={button.color || 'primary'}
                                                onClick={() => button.handleFunction(row.id)}
                                                sx={{ mr: 1 }}
                                            >
                                                {button.label}
                                            </Button>
                                        ))}
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
            {addToast?(
                <ToastContainer />
            ):null}
            
        </div>
    );
};

export default TableTemplate;