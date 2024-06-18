import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import GenericForm from '../../../HOC/formtemplate';
import ApiService from '../../../../services/apiservice';

const AddArrear = () => {
    const navigate = useNavigate();
    const createdby = sessionStorage.getItem('id');
    const lasteditedby = sessionStorage.getItem('id');

    const [formData, setFormData] = useState({
        studentid: '',
        paymenttermid: '',
        studentclasspromotiontermid: '',
        documentno: '',
        invoicedon: '',
        amount: '',
        remarks: '',
        createdby,
        lasteditedby,
        is_active: '1'
    });

    const [students, setStudents] = useState([]);
    const [paymentTerms, setPaymentTerms] = useState([]);

    useEffect(() => {
        const fetchDropdowns = async () => {
            try {
                const studentsResponse = await ApiService.get("home/get_data/sch_students");
                setStudents(studentsResponse.data);
                const paymentTermResponse = await ApiService.get("home/get_data/sch_payment_terms");
                setPaymentTerms(paymentTermResponse.data);
            } catch (error) {
                toast.error('Failed to fetch dropdown options');
                console.error('Error fetching dropdown options:', error);
            }
        };

        fetchDropdowns();
    }, []);

    useEffect(() => {
        if (formData.studentid) {
            const selectedStudent = students.find(student => student.id === parseInt(formData.studentid));
            if (selectedStudent) {
                setFormData(prevState => ({
                    ...prevState,
                    studentclasspromotiontermid: selectedStudent.classterm_id
                }));
            }
        }
    }, [formData.studentid, students]);

    const handleFormSubmit = async (formData) => {
        try {
            const response = await ApiService.post("home/add_data/member_payable_arears", formData, true);
            if (response.status === 201) {
                toast.success("Arrear added successfully");
                navigate('/invoices/create-arrear');
            } else {
                toast.error("Failed to add arrear");
            }
        } catch (error) {
            console.error('Error adding arrear:', error);
            toast.error("Failed to add arrear");
        }
    };

    const arrearFields = [
        {
            name: 'studentid',
            label: 'Student',
            type: 'select',
            options: students.map(student => ({ value: student.id, label: student.name })),
            required: true
        },
        {
            name: 'paymenttermid',
            label: 'Payment Term',
            type: 'select',
            options: paymentTerms.map(paymentTerm => ({ value: paymentTerm.id, label: paymentTerm.name })),
            required: true
        },
        { name: 'documentno', label: 'Document No', type: 'text', required: true },
        { name: 'invoicedon', label: 'Invoice Date', type: 'date', required: true },
        { name: 'amount', label: 'Amount', type: 'number', required: true },
        { name: 'remarks', label: 'Remarks', type: 'text', multiline: true, rows: 4 },
        {
            name: 'is_active',
            label: 'Is Active',
            type: 'select',
            options: [
                { value: '0', label: 'No' },
                { value: '1', label: 'Yes' }
            ],
            required: true
        }
    ];

    return (
        <GenericForm
            formData={formData}
            title="Add Arrear"
            fields={arrearFields}
            onSubmit={handleFormSubmit}
            onCancel="/invoices/create-arrear"
        />
    );
};

export default AddArrear;
