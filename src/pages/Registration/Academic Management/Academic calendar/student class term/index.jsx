import React from 'react';
import { toast } from 'react-toastify';
import TableTemplate from '../../../../HOC/tabletemplate';
import StudentClassTermService from '../../../../../services/calendarService';
import {useNavigate} from "react-router-dom";

const StudentClassTerm = () => {
    const columns = [
        { field: 'studentclasspromotionid', headerName: 'Student Class Promotion ID' },
        { field: 'termid', headerName: 'Term ID' },
        { field: 'createdon', headerName: 'Created On' },
        { field: 'is_active', headerName: 'Is Active' },
    ];
    const endpoint = 'home/get_data/sch_student_class_terms';
    const navigate  = useNavigate();
    const handleDelete = async (id) => {
        try {
            await StudentClassTermService.deleteClassTerm(id);
            toast.success('Term deleted successfully');
        } catch (error) {
            console.error('Error deleting term:', error);
            toast.error('Failed to delete term');
        }
    };

    const handleEdit = (id) => {
    navigate(`/student-class-terms/edit/${id}`);
    };

    return (
        <TableTemplate
            columns={columns}
            endpoint={endpoint}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}
        />
    );
};

export default StudentClassTerm;
