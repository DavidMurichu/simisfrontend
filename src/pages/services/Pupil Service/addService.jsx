import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GenericForm from '../../HOC/formtemplate';
import ApiService from '../../../services/apiservice';

const AddStudentService = () => {
    const navigate = useNavigate();
    const createdby = sessionStorage.getItem('id');
    const lasteditedby = sessionStorage.getItem('id');
    
    const [formData, setFormData] = useState({
        studentid: '',
        serviceid: '',
        studentclasspromotiontermid: '',
        status: '',
        createdby,
        lasteditedby,
        is_active: '1'
    });

    const [services, setServices] = useState([]);
    const [students, setStudents] = useState([]);


    const fetchData = async (url, setState) => {
        try {
            
            const response = await ApiService.get(url);
            if (response.data) {
                if (response.data.error) {
                    toast.error(`Error: ${response.data.error}`);
                    console.error(`Error fetching data from ${url}: ${response.data.error}`);
                } else if (Array.isArray(response.data)) {
                    setState(response.data);
                }
            }
        } catch (error) {
            toast.error(`Failed to fetch data from ${url}`);
            console.error(`Error fetching data from ${url}:`, error);
        }
    };

    useEffect(() => {
        fetchData("home/get_data/sch_services", setServices);
        fetchData("home/promoted/students/sch_student_class_terms", setStudents);
    }, []);

    useEffect(() => {
        if (formData.studentid) {
            const selectedStudent = students.find(student => student.id === parseInt(formData.studentid));
            if (selectedStudent) {
                setFormData(prevState => ({
                    ...prevState,
                    studentclasspromotiontermid: selectedStudent.classterm_id,
                    academicyearid: selectedStudent.academicyearid,
                    classid: selectedStudent.current_class_id,
                    termid: selectedStudent.current_term_id,
                }));
            }
        }
    }, [formData.studentid, students]);

    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    const handleFormSubmit = async (formData) => {
        try {
            console.log('datad', formData);
            const submitData = formData;
                        
            const response = await ApiService.post("home/add_data/sch_student_services", submitData, true);
            if (response.status === 201) {
                toast.success("Service Assigned successfully");
                await delay(1000);
                navigate('/student-services');
            } else {
                toast.error("Failed to add student service");
            }
        } catch (error) {
            console.error('Error adding student service:', error);
            toast.error("Failed to add student service");
        }
    };

    const studentServiceFields = [
        {
            name: 'studentid',
            label: 'Student',
            type: 'select',
            options: students.map(student => ({ value: student.id, label: student.name })),
            required: true
        },
        {
            name: 'serviceid',
            label: 'Services',
            type: 'select',
            options: services.map(service => ({ value: service.id, label: service.name })),
            required: true
        },
        {
            name: 'status',
            label: 'Status',
            type: 'select',
            options: [
                { value: '0', label: 'No' },
                { value: '1', label: 'Yes' }
            ],
            required: true
        },
        {
            name: 'is_active',
            label: 'Is Active',
            type: 'select',
            options: [
                { value: '0', label: 'No' },
                { value: '1', label: 'Yes' }
            ],
            required: true
        }
    ];

    return (
        <>
            <GenericForm
                setFormData={setFormData}
                formData={formData}
                title="Add Student Service"
                fields={studentServiceFields}
                onSubmit={handleFormSubmit}
                onCancel="/student-services"
            />
            <ToastContainer />
        </>
    );
};

export default AddStudentService;
