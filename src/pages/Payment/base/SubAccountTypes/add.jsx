import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

import GenericForm from 'pages/HOC/formtemplate';
import ApiService from 'services/apiservice';
import FetchData from 'services/fetch';
import { Delay } from 'pages/HOC/delay';

const AddSubAccountType = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        accounttypeid: 1, // Assuming this will be populated based on the selected account type
        priority: null,
        remarks: '',
        createdby: sessionStorage.getItem('id'),
        lasteditedby: sessionStorage.getItem('id'),
        is_active: '1' // Defaulting to 'Yes' for is_active
    });

    

    const handleFormSubmit = async (formData) => {
        try {
            const response = await ApiService.post('home/add_data/sub_account_types', formData, true);
            if (response.status === 201) {
                toast.success('Sub Account Type added successfully');
                await Delay(1000);
                navigate('/payment/sub-account-types'); // Redirect after successful submission
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error('Error adding Sub Account Type. Please try again.');
            }
        }
    };

    const subAccountTypeFields = [
        { name: 'name', label: 'Name', type: 'text', required: true },
        { name: 'priority', label: 'Priority', type: 'number', required: false },
        { name: 'remarks', label: 'Remarks', type: 'text', multiline: true, rows: 4 },
        { name: 'is_active', label: 'Is Active', type: 'select', options: [
            { value: '0', label: 'No' },
            { value: '1', label: 'Yes' }
        ], required: true },
    ];

    return (
        <>
            <ToastContainer />
            <GenericForm
                formData={formData}
                title="Add Sub Account Type"
                fields={subAccountTypeFields}
                setFormData={setFormData}
                onSubmit={handleFormSubmit}
                onCancel="/payment/sub-account-types"
                navigateTo="/payment/sub-account-types"
                style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}
            />
        </>
    );
};

export default AddSubAccountType;
