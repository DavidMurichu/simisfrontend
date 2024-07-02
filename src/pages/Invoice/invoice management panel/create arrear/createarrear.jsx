import React from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TableTemplate from '../../../HOC/tabletemplate';
import MainCard from 'components/MainCard';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import ArrearService from '../../../../services/apiservice';

const columns = [
    { field: 'studentid', headerName: 'Pupils' },
    { field: 'amount', headerName: 'Amount' },
    { field: 'amount', headerName: 'Amount' },
    { field: 'invoicedon', headerName: 'Invoice Date' },
    { field: 'documentno', headerName: 'Document No' },
    { field: 'remarks', headerName: 'Remarks' },
    { field: 'created_at', headerName: 'Created At' }
];

function ArrearManagement() {
    const endpoint = 'home/get_data/member_payable_arears';

    const handleDelete = async (id) => {
        try {
            // const response = await ArrearService.deleteArrear(id);
            // if (response.status === 200) {
            //     toast.success("Deleted arrear successfully");
            // } else {
            //     toast.warning("Error, try again");
            // }
        } catch (error) {
            console.error('Error deleting arrear:', error);
            toast.error("Error deleting arrear. Please try again.");
        }
    };

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
                sx={{ mb: 2 }}
            >
                Add New Arrear
            </Button>
            <TableTemplate
                columns={columns}
                endpoint={endpoint}
                handleDelete={handleDelete}
            />
        </MainCard>
        <ToastContainer></ToastContainer>
        </>
        
    );
}

export default ArrearManagement;
