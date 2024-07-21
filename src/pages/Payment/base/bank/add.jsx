import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

import GenericForm from 'pages/HOC/formtemplate';
import ApiService from 'services/apiservice';
import FetchData from 'services/fetch';
import { Delay } from 'pages/HOC/delay';

const AddBank = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        createdby: sessionStorage.getItem('id'),
        lasteditedby: sessionStorage.getItem('id'),
        ipaddress: '',
        description: '',
        is_active: '1'
    });

    const handleFormSubmit = async (formData) => {
        try {
            const response = await ApiService.post('home/add_data/banks', formData, true);
            if (response.status === 201) {
                toast.success('Bank added successfully');
                await Delay(1000);
                navigate('/payment/banks'); // Redirect after successful submission
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error('Error adding Bank. Please try again.');
            }
        }
    };

    const bankFields = [
        { name: 'name', label: 'Name', type: 'text', required: true },
        { name: 'description', label: 'Description', type: 'text', multiline: true, rows: 4 },
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
                title="Add Bank"
                fields={bankFields}
                setFormData={setFormData}
                onSubmit={handleFormSubmit}
                onCancel="/payment/banks"
                navigateTo="/payment/banks"
                style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}
            />
        </>
    );
};

export default AddBank;
