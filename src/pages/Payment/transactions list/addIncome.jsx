import React, { useState } from 'react';
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import GenericForm from '../../HOC/formtemplate';
import ApiService from "../../../services/apiservice";

const AddIncome = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        isActive: 'Active' // Assuming isActive has default value
    });

    const handleFormSubmit = async (formData) => {
        try {
            // Perform form validation if needed

            // Example of adding additional fields before submission
            formData.createdBy = sessionStorage.getItem('id');

            // Call API service to create income
            const response = await ApiService.createIncome(formData);

            if (response.status === 201) {
                toast.success('Income added successfully');
                navigate("/payment/transaction-lists");
            } else {
                toast.error('Failed to add income');
            }
        } catch (error) {
            console.error('Error adding income:', error);
            toast.error('Failed to add income. Please try again.');
        }
    };

    const formFields = [
        {
            name: 'name',
            label: 'Name',
            type: 'text',
            required: true
        },
        {
            name: 'isActive',
            label: 'Is Active',
            type: 'select',
            options: [
                { value: 'Active', label: 'Active' },
                { value: 'Inactive', label: 'Inactive' }
            ],
            required: true
        }
    ];

    return (
        <div style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}>
            <Typography variant="h5" gutterBottom>
                Create Income
            </Typography>
            <GenericForm
                formData={formData}
                fields={formFields}
                onSubmit={handleFormSubmit}
                onCancel={() => navigate("payment/transaction-lists")}
                style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}
            />
        </div>
    );
};

export default AddIncome;
