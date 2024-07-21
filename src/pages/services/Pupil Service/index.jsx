import React from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TableTemplate from '../../HOC/tabletemplate';
import MainCard from 'components/MainCard';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";

const columns = [
    { field: 'studentid', headerName: 'Pupils', foreign: 'student', foreignField: 'name'  },
    { field: 'serviceid', headerName: 'Service', foreign: 'service', foreignField: 'name'  },
    { field: 'cost', headerName: 'Ammount', foreign: 'service', foreignField: 'cost'  },
    { field: 'createdby', headerName: 'Created By' },
    { field: 'is_active', headerName: 'Is_active' },
    { field: 'created_at', headerName: 'Created At' }

];

const handleEdit=()=>{

}

const handleDelete=()=>{

}


const buttons = [
    { label: 'Edit', color: 'primary', handleFunction: handleEdit },
    { label: 'Delete', color: 'error', handleFunction: handleDelete },
   
];



function StudentServiceManagemant() {
    const endpoint = 'home/get_data/sch_student_services';

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
                Welcome to the Student service Management page. Here you can manage Student Service details and their actions.
            </Typography>

            {/* Button for adding new arrear */}
            <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/add-student-services"
                sx={{ mr: 1 }}
            >
                Assign New Service
            </Button>

            <TableTemplate
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

export default StudentServiceManagemant;
