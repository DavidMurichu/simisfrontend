import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import TableTemplate from "../../../../HOC/tabletemplate";
import MainCard from "../../../../../components/MainCard";
import React from "react";
import TeacherService from "../../../../../services/TeacherService";
import { toast } from "react-toastify";

const columns = [
    { field: 'teacherid', headerName: 'Teacher ID' },
    { field: 'duty_start', headerName: 'Duty Start' },
    { field: 'duty_end', headerName: 'Duty End' },
    { field: 'comments', headerName: 'Comments' },
    { field: 'createdby', headerName: 'Created By' },
    { field: 'lasteditedby', headerName: 'Last Edited By' },
    { field: 'ipaddress', headerName: 'IP Address' },
    { field: 'is_active', headerName: 'Is Active' },
];

function TeachersOnDuty() {
    const endpoint = 'home/get_data/sch_teacher_on_duties';

    const handleDelete = async (id) => {
        try {
            const response = await TeacherService.deleteTeacherOnDuty(id);
            if (response.status === 200) {
                toast.success("Deleted teacher successfully");
            } else {
                toast.warning("Error, try again");
            }
        } catch (error) {
            console.error('Error deleting teacher:', error);
            toast.error("Error deleting teacher. Please try again.");
        }
    };

    return (
        <div>
            <MainCard title="Teacher on Duty Management" style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}>
                <Typography variant="body1" gutterBottom>
                    Welcome to the Teacher on Duty management page. Here you can manage teacher details and their actions.
                </Typography>

                {/* Button for adding new teacher */}
                <Button
                    variant="contained"
                    color="primary"
                    component={Link}
                    to="/teacher-on-duty/add"
                    sx={{ mb: 2 }}
                >
                    Add Teacher on Duty
                </Button>

                <TableTemplate
                    columns={columns}
                    endpoint={endpoint}
                    handleDelete={handleDelete}
                />
            </MainCard>
        </div>
    )
}

export default TeachersOnDuty;
