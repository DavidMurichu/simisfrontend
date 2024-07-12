import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { toast, ToastContainer } from 'react-toastify';


import GenericForm from 'pages/HOC/formtemplate';
import ApiService from 'services/apiservice';
import FetchData from 'services/fetch';
import { Delay } from 'pages/HOC/delay';

const AddAdministrativeChargeValue = () => {
    const navigate = useNavigate();
    const [branches, setBranches] = useState([]);
    const [classes, setClasses] = useState([]);
    const [terms, setTerms] = useState([]);
    const [voteheads, setVoteheads] = useState([]);
    const [formData, setFormData] = useState({
        amount:'',
        remarks:'',
        classid:'',
        termid:'',
        voteheadid:'',
        description: '',
        status: 0,
        branch_name: '',
        is_active:0
    });

    useEffect(() => {
        FetchData("home/get_data/sch_classes", setClasses);
        FetchData("home/get_data/auth_branches", setBranches);
        FetchData("home/get_data/sch_terms", setTerms);
        FetchData("home/get_data/sch_vote_heads", setVoteheads);
         }, []);

    const handleFormSubmit = async (formData) => {
        try {
            
            const response = await ApiService.post('home/add_data/sch_fee_structure_vote_heads', formData, true);
            console.log(response);
            
            if (response.status === 201) {
                toast.success('Administrative charge added successfully');
                await Delay(1000);
                navigate('/invoices/administrative-charge-values-management');
            }
        } catch (error) {
            console.log('error', error);
            toast.error(error.response.data[0]['message']);
        }
    };

    const fields = [
        {
            name: 'classid',
            label: 'Class Name',
            type: 'select',
            options: classes.map(cls => ({
                value: cls.name,
                label: cls.name
            })),
            required: true
        },
        {
            name: 'termid',
            label: 'Class Term',
            type: 'select',
            options: terms.map(term => ({
                value: term.name,
                label: term.name
            })),
            required: true
        },
        {
            name: 'voteheadid',
            label: 'Votehead',
            type: 'select',
            options: voteheads.map(votehead => ({
                value: votehead.name,
                label: votehead.name
            })),
            required: true
        },
        
        { name: 'amount', label: 'Amount', type: 'number', required: true },
        
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
        {
            name: 'status',
            label: 'status',
            type: 'select',
            options: [
                { value: '0', label: 'in active' },
                { value: '1', label: 'Active' }
            ],
            required: true
        },
        {
            name: 'branch_name',
            label: 'Branch Name',
            type: 'select',
            options: branches.map(branch => ({ value: branch.branch_name, label: branch.branch_name })),
            required: true
        },
        { name: 'remarks', label: 'Description', type: 'text', multiline: true, rows: 4 },
       

    ];

    return (
        < >
            <ToastContainer />
            <GenericForm
                formData={formData}
                title="Add Administrative Charge"
                fields={fields}
                setFormData={setFormData}
                onSubmit={handleFormSubmit}
                onCancel="/administrative-charges"
                navigateTo="/administrative-charges"
                style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}
            />
        </>
    );
};

export default AddAdministrativeChargeValue;
