import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GenericForm from '../../HOC/formtemplate';
import AdministrativeChargeService from '../../../services/apiservice';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import BaseLink from '../../../services/baselink';
import ApiService from '../../../services/apiservice';
import Account from "../../../services/account";

const AddAdministrativeCharge = () => {
    const navigate = useNavigate();
    const [paymentTerms, setPaymentTerms] = useState([]);
    const [branches, setBranches] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        paymentterm: '',
        description: '',
        is_active: 1,
        branch_name: ''
    });

    useEffect(() => {
        const fetchPaymentTerms = async () => {
            try {
                const response = await ApiService.fetchPaymentTerm();
                if (response && response.data && Array.isArray(response.data)) {
                    setPaymentTerms(response.data);
                } else {
                    setPaymentTerms([]);
                    toast.error('Failed to fetch payment terms: data format is incorrect');
                }
            } catch (error) {
                setPaymentTerms([]);
                toast.error('Failed to fetch payment terms');
                console.error('Error fetching payment terms:', error);
            }
        };

        const fetchBranches = async () => {
            try {
                // Replace with your actual API call to fetch branches
                const branchResponse = await Account.getAllBranches();
                if (branchResponse.data && Array.isArray(branchResponse.data)) {
                    setBranches(branchResponse.data);
                } else {
                    setBranches([]);
                    toast.error('Failed to fetch branches: data format is incorrect');
                }
            } catch (error) {
                setBranches([]);
                toast.error('Failed to fetch branches');
                console.error('Error fetching branches:', error);
            }
        };

        fetchPaymentTerms();
        fetchBranches();
    }, []);

    const handleFormSubmit = async (formData) => {
        try {
            formData.createdby = sessionStorage.getItem('id');
            const response = await AdministrativeChargeService.createCharge(formData);
            if (response.status === 201) {
                console.log("response yeeeeeeeeeeeeeeee")
                toast.success('Administrative charge added successfully');
                navigate('/invoices/administrative-charges');
            }
        } catch (error) {
            toast.error('Failed to add administrative charge');
        }
    };

    const chargeFields = [
        { name: 'name', label: 'Name', type: 'text', required: true },
        {
            name: 'paymentterm',
            label: 'Payment Term',
            type: 'select',
            options: paymentTerms.map(term => ({ value: term.name, label: term.name })),
            required: true
        },
        { name: 'description', label: 'Description', type: 'text', multiline: true, rows: 4 },
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
            name: 'branch_name',
            label: 'Branch Name',
            type: 'select',
            options: branches.map(branch => ({ value: branch.branch_name, label: branch.branch_name })),
            required: true
        }
    ];

    return (
        < >
            <ToastContainer />
            <GenericForm
                formData={formData}
                title="Add Administrative Charge"
                fields={chargeFields}
                onSubmit={handleFormSubmit}
                onCancel="/administrative-charges"
                navigateTo="/administrative-charges"
                style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}
            />
        </>
    );
};

export default AddAdministrativeCharge;
