import React from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import MainCard from 'components/MainCard';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import TableTemplate from 'pages/HOC/tabletemplate';

		
		
		
		
		
const columns = [
    { field: 'classid', headerName: 'Class' },
    { field: 'termid', headerName: 'Term' },
    { field: 'voteheadid', headerName: 'Vote Head' },
    { field: 'amount', headerName: 'Amount' },
    { field: 'status', headerName: 'Status' },
    { field: 'remarks', headerName: 'Remarks' },
    { field: 'created_at', headerName: 'Created On' },
    { field: 'updated_at', headerName: 'Updated At' },
    { field: 'is_active', headerName: 'Is Active' }
];

function AdministrativeChargesValuesManagement() {
    const endpoint = 'home/get_data/sch_fee_structure_vote_heads';
    const handleDelete = async (id) => {
        try {
            // const response = await AdministrativeChargesService.deleteCharge(id);
            // if (response.status === 200) {
            //     toast.success("Deleted administrative charge successfully");
            // } else {
            //     toast.warning("Error, try again");
            // }
        } catch (error) {
            console.error('Error deleting administrative charge:', error);
            toast.error("Error deleting administrative charge. Please try again.");
        }
    };

    return (
        <MainCard title="Administrative Charges values  Management" style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}>
            <Typography variant="body1" gutterBottom>
                Welcome to the Administrative Charges Management page. Here you can manage administrative charges details and their actions.
            </Typography>

            {/* Button for adding new administrative charge */}
            <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/add-administrative-charge-value"
                sx={{ mr: 1 }}
            >
                Assign Administrative Charge Value
            </Button>
            
            <TableTemplate
                columns={columns}
                endpoint={endpoint}
                handleDelete={handleDelete}
            />
        </MainCard>
    );
}






export default AdministrativeChargesValuesManagement;

