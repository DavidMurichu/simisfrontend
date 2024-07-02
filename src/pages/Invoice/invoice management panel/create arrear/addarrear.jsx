import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import GenericForm from '../../../HOC/formtemplate';
import ApiService from '../../../../services/apiservice';

const AddArrear = () => {
    const navigate = useNavigate();
    const createdby = sessionStorage.getItem('id');
    const lasteditedby = sessionStorage.getItem('id');

    const [formData, setFormData] = useState({
        incomeid:'',
        academicyearid:'',
        classid:'',
        termid:'',
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
    const [incomes, setIncomes] = useState([]);

    useEffect(() => {
        const fetchDropdowns = async () => {
            try {
                const incomes= await ApiService.get("home/get_data/incomes");
                setIncomes(incomes.data);
                const studentsResponse = await ApiService.get("home/promoted/students/sch_student_class_terms");
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
                    studentclasspromotiontermid: selectedStudent.classterm_id,
                    academicyearid: selectedStudent.academicyearid,
                    classid: selectedStudent.current_class_id,
                    termid: selectedStudent.current_term_id,
                }));
            }
        }
    }, [formData.studentid, students]);
    
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    const handleFormSubmit = async (formData) => {
        try {

            const submitData = {
                studentarears: [
                    {
                        classid: formData.classid,
                        termid: formData.termid,
                        academicyearid: formData.academicyearid,
                        studentid: formData.studentid,
                        amount: formData.amount,
                        is_active: formData.is_active,
                        createdby: formData.createdby,
                        lasteditedby: formData.lasteditedby,
                        studentclasspromotiontermid: formData.studentclasspromotiontermid,
                    }
                ]
            };
            const response = await ApiService.post("home/create_arear", submitData, true);
            if (response.status === 201) {
                toast.success("Arrear added successfully");
                await delay(1000);
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
            // required: true
        },
        {
            name: 'paymenttermid',
            label: 'Payment Term',
            type: 'select',
            options: paymentTerms.map(paymentTerm => ({ value: paymentTerm.id, label: paymentTerm.name })),
            // required: true
        },
        {
            name: 'incomeid',
            label: 'Incomes',
            type: 'select',
            options: incomes.map(income => ({ value: income.id, label: income.name })),
            // required: true
        },
        
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
            // required: true
        }
    ];

    return (
        <>
        <GenericForm
            setFormData={setFormData}
            formData={formData}
            title="Add Arrear"
            fields={arrearFields}
            onSubmit={handleFormSubmit}
            onCancel="/invoices/create-arrear"
        />
        </>
        
    );
};

export default AddArrear;
