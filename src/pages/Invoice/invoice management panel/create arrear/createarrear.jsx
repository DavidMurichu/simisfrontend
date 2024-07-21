import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TableTemplate from '../../../HOC/tabletemplate';
import MainCard from 'components/MainCard';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import ArrearService from '../../../../services/apiservice';
import ApiService from '../../../../services/apiservice';

const columns = [
    { field: 'studentid', headerName: 'Pupils', foreign: 'student', foreignField: 'name'  },
    { field: 'amount', headerName: 'Amount' },
    { field: 'amount', headerName: 'Amount' },
    { field: 'invoicedon', headerName: 'Invoice Date' },
    { field: 'documentno', headerName: 'Document No' },
    { field: 'remarks', headerName: 'Remarks' },
    { field: 'created_at', headerName: 'Created At' }
];

function ArrearManagement() {
    const endpoint = 'home/get_data/member_payable_arears';
    const [refresh, setRefresh]=useState(false);


    const handleEdit= async(id)=>{
        

    }
    const handleDelete= async(id)=>{
        try{
            const response= await ApiService.post('home/delete_arear', {id});
            if(response.status==200){
                toast.success('Arear deleted successfully');
                setRefresh(true);
            }
        }catch(error){
            toast.error('Delete unsuccessful');
        }
    }
    const buttons = [
        { label: 'Edit', color: 'primary', handleFunction: handleEdit },
        { label: 'Delete', color: 'error', handleFunction: handleDelete },
     
    ];

    return (
        <>
        <MainCard title="Arrear Management">
            <Typography variant="body1" gutterBottom>
                Welcome to the Arrear Management page. Here you can manage arrear details and their actions.
            </Typography>

            {/* Button for adding new arrear */}
            <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/add-arrear"
                sx={{ mr: 1 }}
            >
                Add New Arrear
            </Button>
            <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/bulk-arrear"
                sx={{ mr: 1 }}
            >
                Bulk Arrear Processing
            </Button>

            <TableTemplate
                refresh={refresh}
                buttons={buttons}
                columns={columns}
                endpoint={endpoint}
                handleDelete={handleDelete}
            />
        </MainCard>
        <ToastContainer />
        </>
        
    );
}

export default ArrearManagement;
