import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

import GenericForm from 'pages/HOC/formtemplate';
import ApiService from 'services/apiservice';
import FetchData from 'services/fetch';
import { Delay } from 'pages/HOC/delay';

const AddAccountType = () => {
    const navigate = useNavigate();
    const [subaccounts, setSubAccounts]=useState([]);
    const [formData, setFormData] = useState({
        name: '',
        subaccounttypeid: null,
        createdby: sessionStorage.getItem('id'),
        lasteditedby: sessionStorage.getItem('id'),
        is_active: '1' 
    });

    const fetch=async()=>{
        await FetchData('home/get_data/sub_account_types', setSubAccounts)

    }
    useEffect(() => {
        fetch()
    }, []);

    const handleFormSubmit = async (formData) => {
        try {
            const response = await ApiService.post('home/add_data/account_types', formData, true);
            if (response.status === 201) {
                toast.success('Account Type added successfully');
                await Delay(1000);
                navigate('/payment/account-types'); // Redirect after successful submission
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error('Error adding Account Type. Please try again.');
            }
        }
    };

    const accountTypeFields = [
        { name: 'name', label: 'Name', type: 'text', required: true },
        {
            name: 'subaccounttypeid',
            label: 'Sub Account Type',
            type: 'select',
            options: subaccounts.map(subaccount => ({
                value: subaccount.id,
                label: subaccount.name
            })),
            required: true
        },
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
                title="Add Account Type"
                fields={accountTypeFields}
                setFormData={setFormData}
                onSubmit={handleFormSubmit}
                onCancel="/payment/account-types"
                navigateTo="/payment/account-types"
                style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}
            />
        </>
    );
};

export default AddAccountType;
