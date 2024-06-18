import React, { useState, useEffect } from 'react';
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import GenericForm from '../../HOC/formtemplate'; // Adjust the path as needed
import ApiService from "../../../services/apiservice"; // Adjust the path as needed

const AddExpense = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        expense: '',
        expenseType: '',
        code: '',
        description: '',
        isActive: 'Active' // Assuming isActive has default value
    });
    const [expenseTypes, setExpenseTypes] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchExpenseTypes = async () => {
            setLoading(true);
            try {
                const response = await ApiService.fetchExpenseTypes();
                setExpenseTypes(response.data);
            } catch (error) {
                console.error('Error fetching expense types:', error);
                toast.error('Failed to fetch expense types');
            } finally {
                setLoading(false);
            }
        };
        fetchExpenseTypes();
    }, []);

    const handleFormSubmit = async (formData) => {
        try {
            // Perform form validation if needed

            // Example of adding additional fields before submission
            formData.createdBy = sessionStorage.getItem('id');

            // Call API service to create expense
            const response = await ApiService.createExpense(formData);

            if (response.status === 201) {
                toast.success('Expense added successfully');
                navigate("/expenses"); // Redirect to expenses list page
            } else {
                toast.error('Failed to add expense');
            }
        } catch (error) {
            console.error('Error adding expense:', error);
            toast.error('Failed to add expense. Please try again.');
        }
    };

    const formFields = [
        {
            name: 'expense',
            label: 'Expense *',
            type: 'text',
            required: true
        },
        {
            name: 'expenseType',
            label: 'Expense Type *',
            type: 'select',
            options: expenseTypes.map(type => ({ value: type.id, label: type.name })),
            required: true
        },
        {
            name: 'code',
            label: 'Code',
            type: 'text'
        },
        {
            name: 'description',
            label: 'Description',
            type: 'text',
            multiline: true,
            rows: 4
        },
        {
            name: 'isActive',
            label: 'Is Active *',
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
                Add Expense
            </Typography>
            <GenericForm
                formData={formData}
                fields={formFields}
                onSubmit={handleFormSubmit}
                onCancel={() => navigate("/expenses")}
                style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}
            />
        </div>
    );
};

export default AddExpense;
