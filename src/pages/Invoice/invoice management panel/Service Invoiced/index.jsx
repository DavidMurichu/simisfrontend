import React, { useState, useEffect } from 'react';
import { Typography } from '@mui/material';
import MainCard from 'components/MainCard';
import TableTemplate from '../../../HOC/tabletemplate';
import FilterTemplate from 'pages/HOC/filter/FilterTemplate';
import ApiService from "../../../../services/apiservice";
import useGenericFilter from 'pages/HOC/filter/filter';


const StudentInvoiced = () => {
    const initialFilterValues = {
        selectedClass: '',
        selectedYear: '',
        selectedTerm: '',
        dateFrom: '',
        dateTo: '',
    };

    // Define endpoints for fetching dropdown data
    const dropdownEndpoints = {
        classes: 'home/get_data/sch_classes',
        academicYears: 'home/get_data/sch_academic_years',
        terms: 'home/get_data/sch_terms',
    };

    const { filters, setFilter, resetFilters, data: tableData, loading, dropdownData } = useGenericFilter(initialFilterValues, dropdownEndpoints);

    const handleEdit = () => {
        // Implement edit functionality
    };

    const handleDelete = () => {
        // Implement delete functionality
    };

    const handleSearch = async () => {
        try {
            const response = await ApiService.get('/api/student-invoiced', {
                params: {
                    class: filters.selectedClass,
                    academicYear: filters.selectedYear,
                    term: filters.selectedTerm,
                    dateFrom: filters.dateFrom,
                    dateTo: filters.dateTo,
                }
            });

            console.log(response.data); // Handle response as needed
        } catch (error) {
            console.error('Error fetching invoiced data:', error);
        }
    };

    const filtersColumns = [
        { label: 'Select Class', field: 'selectedClass', type: 'select', options: dropdownData.classes },
        { label: 'Academic Year', field: 'selectedYear', type: 'select', options: dropdownData.academicYears },
        { label: 'Academic Year Term', field: 'selectedTerm', type: 'select', options: dropdownData.terms },
        { label: 'Date From', field: 'dateFrom', type: 'date' },
        { label: 'Date To', field: 'dateTo', type: 'date' },
    ];


const columns = [
    { field: 'studentserviceid', headerName: 'Pupils Service', width: 200 },
    { field: 'invoiceid', headerName: 'Invoice Id', width: 200 },
    { field: 'amount', headerName: 'Amount', width: 200 },
    { field: 'created_at', headerName: 'Createdon', width: 200 },
    { field: 'is_active', headerName: 'Is Active', width: 100 },
];

const buttons = [
    { label: 'Edit', color: 'primary', handleFunction: handleEdit },
    { label: 'Delete', color: 'secondary', handleFunction: handleDelete },
];

    return (
        <MainCard title="Services INVOICED">
            <Typography variant="body1" gutterBottom>
                Use the filters below to search for service invoices.
            </Typography>
            <FilterTemplate
                filters={filtersColumns}
                filterValues={filters}
                handleFilterChange={setFilter}
                handleSearch={handleSearch} // Pass handleSearch function to FilterTemplate
                loading={loading}
            />
            <TableTemplate
                buttons={buttons}
                endpoint={'home/get_data/sch_student_service_invoices'}
                columns={columns}
                data={tableData}
                loading={loading}
                handleDelete={handleDelete}
            />
        </MainCard>
    );
};

export default StudentInvoiced;
