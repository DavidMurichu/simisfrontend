import React, { useState, useEffect } from 'react';
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import GenericForm from '../../../HOC/formtemplate';
import SchoolService from '../../../../services/schoolservice';
import ApiService from "../../../../services/apiservice";
import Account from "../../../../services/account";

const AddSchoolService = () => {
    const navigate = useNavigate();
    const createdby = sessionStorage.getItem('id');
    const lasteditedby = sessionStorage.getItem('id');
    const [formData, setFormData] = useState({
        servicedurationid: '',
        paymenttermid: '',
        name: '',
        cost: '',
        is_transport_route: '',
        invoiced_once: '',
        description: '',
        is_active: '',
        branch_id: ''
    });
    const [serviceDurations, setServiceDurations] = useState([]);
    const [paymentTerms, setPaymentTerms] = useState([]);
    const [branches, setBranches] = useState([]);
    useEffect(() => {
        const fetchDropdowns = async () => {
            try {
                const serviceDurationResponse = await SchoolService.fetchServiceDurations();
                setServiceDurations(serviceDurationResponse.data);
                const paymentTermResponse = await ApiService.fetchPaymentTerm();
                console.log("payment value",paymentTermResponse.data)
                setPaymentTerms(paymentTermResponse.data);
                const branchesResponse = await Account.getAllBranches();

                setBranches(branchesResponse.data);

            } catch (error) {
                toast.error('Failed to fetch dropdown options');
                console.error('Error fetching dropdown options:', error);
            }
        };

        fetchDropdowns();
    }, []);
    const handleFormSubmit = async (formData) => {
        try {
            formData.createdby = createdby;
            formData.lasteditedby = lasteditedby;
            console.log(formData)
            const response = await SchoolService.createSchoolService(formData);
            if (response.status === 201) {
                toast.success('School service added successfully');
                navigate("/school-services");
            } else {
                toast.error('Failed to add school service');
            }
        } catch (error) {
            console.error('Error adding school service:', error);
            toast.error('Failed to add school service. Please try again.');
        }
    };
    const formFields = [
        {
            name: 'servicedurationid',
            label: 'Service Duration',
            type: 'select',
            options: serviceDurations.map(duration => ({ value: duration.id, label: duration.name })),
            required: true
        },

        {
            name: 'name',
            label: 'Name',
            type: 'text',
            required: true
        },
        {
            name: 'cost',
            label: 'Cost',
            type: 'number',
            required: true
        },
        {
            name: 'paymenttermid',
            label: 'Payment Term',
            type: 'select',
            options: paymentTerms.map(payment => ({ value: payment.id, label: payment.name })),
            required: true
        },
        {
            name: 'is_transport_route',
            label: 'Is Transport Route',
            type: 'select',
            options: [
                { value: '0', label: 'No' },
                { value: '1', label: 'Yes' }
            ],
            required: true
        },
        {
            name: 'invoiced_once',
            label: 'Invoiced Once',
            type: 'select',
            options: [
                { value: '0', label: 'No' },
                { value: '1', label: 'Yes' }
            ],
            required: true
        },
        {
            name: 'description',
            label: 'Description',
            type: 'text',
            multiline: true,
            rows: 4
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
        {
            name: 'branch_id',
            label: 'Branch',
            type: 'select',
            options: branches.map(branch => ({ value: branch.id, label: branch.branch_name })),
            required: true
        }
    ];

    return (
        <div>
            <GenericForm
                formData={formData}
                fields={formFields}
                title="Add Students Service"
                onSubmit={handleFormSubmit}
                onCancel={() => navigate("/school-services")}
                style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}
            />
        </div>
    );
};

export default AddSchoolService;
