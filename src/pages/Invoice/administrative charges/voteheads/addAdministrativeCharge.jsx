import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { toast, ToastContainer } from 'react-toastify';


import GenericForm from 'pages/HOC/formtemplate';
import ApiService from 'services/apiservice';
import Account from 'services/account';
import FetchData from 'services/fetch';
import { Delay } from 'pages/HOC/delay';

const AddAdministrativeCharge = () => {
    const navigate = useNavigate();
    const [branches, setBranches] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        is_active: 0,
        branch_name: '',
        createdby: sessionStorage.getItem('id'),
	    lasteditedby:sessionStorage.getItem('id'),
    });

    useEffect(() => {
            FetchData('home/get_data/auth_branches', setBranches);
    }, []);

    const handleFormSubmit = async (formData) => {
        try {
            const response = await ApiService.post('home/add_data/sch_vote_heads', formData, true);
            if (response.status === 201) {
                toast.success('Administrative charge added successfully');
                await Delay(1000);
                navigate('/invoices/administrative-charge-management');
            }
        } catch (error) {
            
           
            toast.error(error.response.data[0]['message']);
        }
    };

    const chargeFields = [
        { name: 'name', label: 'Name', type: 'text', required: true },
        {
            name: 'branch_name',
            label: 'Branch Name',
            type: 'select',
            options: branches.map(branch => ({ value: branch.branch_name, label: branch.branch_name })),
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
        },
        
        { name: 'description', label: 'Description', type: 'text', multiline: true, rows: 4 },

    ];

    return (
        < >
            <ToastContainer />
            <GenericForm
                formData={formData}
                title="Add Administrative Charge"
                fields={chargeFields}
                setFormData={setFormData}
                onSubmit={handleFormSubmit}
                onCancel="/administrative-charges"
                navigateTo="/administrative-charges"
                style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}
            />
        </>
    );
};

export default AddAdministrativeCharge;
