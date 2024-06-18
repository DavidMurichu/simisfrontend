import PupilsService from "../../../../../services/pupilservice";
import {toast} from "react-toastify";
import MainCard from "../../../../../components/MainCard";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {Link} from "react-router-dom";
import TableTemplate from "../../../../HOC/tabletemplate";
import React from "react";

const columns = [
    { field: 'studentclasstermid', headerName: 'Student ID' },
    { field: 'current_class_id', headerName: 'Class' },
    { field: 'academicyear', headerName: 'Academic Year' },
    { field: 'current_term_id', headerName: 'Current term', renderCell: (row) => (row.promotedon || 'N/A') },
    {field: 'datedemoted', headerName:'Date Demoted'},
];

function Demoteview() {
    const endpoint = 'home/get_data/sch_demoted_students';
    const handleDelete = async (id) => {
        try {
            await PupilsService.deletePupil(id);
            toast.success('Deleted pupil successfully');
        } catch (error) {
            console.error('Error deleting pupil:', error);
            toast.error('Error deleting pupil. Please try again.');
        }
    };

    return (
        <MainCard title="Pupil Class Promotion" style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}>
            <Typography variant="body1" gutterBottom>
                Welcome to the Pupil Class Promotion page. Here you can manage pupil promotions and their details.
            </Typography>

            <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/demote-student"
                sx={{ mb: 2 }}
            >
                Demote Students
            </Button>

            <TableTemplate
                columns={columns}
                endpoint={endpoint}
                handleDelete={handleDelete}
            />
        </MainCard>
    );
}

export default Demoteview;
