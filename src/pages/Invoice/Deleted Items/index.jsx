import React, { useState, useEffect } from 'react';
import { Typography, TextField, Button, Grid } from '@mui/material';
import axios from 'axios';
import { toast } from 'react-toastify';
import TableTemplate from '../../HOC/tabletemplate'; // Adjust the path as needed
import MainCard from 'components/MainCard'; // Adjust the path as needed
import FetchData from 'services/fetch';

const DeletedItems = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [tableData, setTableData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        handleSearch(); // Load data initially
    }, []);

    const handleSearch = async () => {
        try {
            await FetchData('home/get_data/deleted_member_payerables', setTableData)
            // Example API endpoint, adjust as per your backend setup
            

            setTableData(response.data);
        } catch (error) {
            toast.error("Error fetching deleted payables data");
            console.error('Error fetching deleted payables data:', error);
        } finally {
            setLoading(false);
        }
    };

    const deletedPayablesColumns = [
        { field: 'paymentTermId', headerName: 'Payment Term ID', width: 150 },
        { field: 'memberId', headerName: 'Member ID', width: 150 },
        { field: 'studentClassPromotionTermId', headerName: 'Student Class Promotion Term ID', width: 250 },
        { field: 'documentNo', headerName: 'Document No', width: 150 },
        { field: 'invoicedOn', headerName: 'Invoiced On', width: 150 },
        { field: 'amount', headerName: 'Amount', width: 150 },
        { field: 'remarks', headerName: 'Remarks', width: 200 },
        { field: 'createdOn', headerName: 'Created On', width: 150 },
        { field: 'isActive', headerName: 'Is Active', width: 150 }
    ];

    return (
        <MainCard title="DELETED PAYABLES" style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}>
            <Typography variant="body1" gutterBottom>
                Search for deleted payables records.
            </Typography>
            <TableTemplate
                columns={deletedPayablesColumns}
                data={tableData}
                loading={loading}
                // handleDelete={handleDelete} // Implement delete functionality if required
                style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}
            />
        </MainCard>
    );
};

export default DeletedItems;

