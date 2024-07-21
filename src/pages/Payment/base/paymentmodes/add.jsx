import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

import GenericForm from 'pages/HOC/formtemplate';
import ApiService from 'services/apiservice';
import FetchData from 'services/fetch';
import { Delay } from 'pages/HOC/delay';
import { set } from 'lodash';

const AddPaymentMode = () => {
    const navigate = useNavigate();
    const [accountTypes, setAccountTypes] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        acctypeid: null,
        is_bank: '0',
        remarks: '',
        createdby: sessionStorage.getItem('id'),
        lasteditedby: sessionStorage.getItem('id'),
        ipaddress: '',
        is_active: '1'
    });

    const fetchAccountTypes = async () => {
        try {
          await FetchData('home/get_data/account_types', setAccountTypes);
        } catch (error) {
            console.error('Error fetching account types:', error);
        }
    };

    useEffect(() => {
        fetchAccountTypes();
    }, []);

    const handleFormSubmit = async (formData) => {
        try {
            const response = await ApiService.post('home/add_data/paymentmodes', formData, true);
            if (response.status === 201) {
                toast.success('Payment Mode added successfully');
                await Delay(1000);
                navigate('/payment/payment-modes'); // Redirect after successful submission
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error('Error adding Payment Mode. Please try again.');
            }
        }
    };

    const paymentModeFields = [
        { name: 'name', label: 'Name', type: 'text', required: true },
        {
            name: 'acctypeid',
            label: 'Account Type',
            type: 'select',
            options: accountTypes.map(type => ({
                value: type.id,
                label: type.name
            })),
            required: true
        },
        { name: 'is_bank', label: 'Is Bank', type: 'select', options: [
            { value: '0', label: 'No' },
            { value: '1', label: 'Yes' }
        ], required: true },
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
                title="Add Payment Mode"
                fields={paymentModeFields}
                setFormData={setFormData}
                onSubmit={handleFormSubmit}
                onCancel="/payment/payment-modes"
                navigateTo="/payment/payment-modes"
                style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}
            />
        </>
    );
};

export default AddPaymentMode;
