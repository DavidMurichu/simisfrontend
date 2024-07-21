import React, { useState, useEffect } from 'react';
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import GenericForm from '../../HOC/formtemplate';
import MainCard from 'components/MainCard';
import axios from 'axios';

const AddStudentInvoiced = () => {
    const navigate = useNavigate();
    const [invoices, setInvoices] = useState([]);
    const [studentServices, setStudentServices] = useState([]);
    const [formData, setFormData] = useState({
        invoice: '',
        studentService: '',
        serviceValue: '',
        createdon: '2024-06-13', // Assuming this is a default value
        isActive: '1', // Assuming '1' means active
    });

    useEffect(() => {
        const fetchDropdownData = async () => {
            try {
                const invoiceResponse = await axios.get('/api/invoices');
                const serviceResponse = await axios.get('/api/student-services');

                setInvoices(invoiceResponse.data);
                setStudentServices(serviceResponse.data);
            } catch (error) {
                toast.error("Error fetching dropdown data");
                console.error('Error fetching dropdown data:', error);
            }
        };

        fetchDropdownData();
    }, []);

    const handleFormSubmit = async (formData) => {
        try {
            const response = await axios.post('/api/student-invoiced', formData);
            if (response.status === 201) {
                toast.success("Student invoiced successfully");
                navigate("/student-invoiced"); // Adjust the path as needed
            } else {
                toast.error("Failed to invoice student");
            }
        } catch (error) {
            console.error('Error adding student invoice:', error);
            toast.error("Failed to add student invoice");
        }
    };

    const formFields = [
        {
            name: 'invoice',
            label: 'Invoice',
            type: 'select',
            options: invoices.map(invoice => ({ value: invoice.id, label: invoice.name })),
            required: true
        },
        {
            name: 'studentService',
            label: 'Student Service',
            type: 'select',
            options: studentServices.map(service => ({ value: service.id, label: service.name })),
            required: true
        },
        {
            name: 'serviceValue',
            label: 'Service Value',
            type: 'number',
            required: true
        },
        {
            name: 'createdon',
            label: 'Createdon',
            type: 'date',
            required: true
        },
        {
            name: 'isActive',
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
        <MainCard title="Add Student Invoiced">
            <Typography variant="body1" gutterBottom>
                Fill in the details to invoice a student.
            </Typography>
            <ToastContainer />
            <GenericForm
                formData={formData}
                fields={formFields}
                onSubmit={handleFormSubmit}
                onCancel={() => navigate("/invoices/services-invoiced")}
                navigateTo="/invoices/services-invoiced"
            />
        </MainCard>
    );
};

export default AddStudentInvoiced;
