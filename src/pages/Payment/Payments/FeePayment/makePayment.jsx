import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GenericForm from '../../../HOC/formtemplate';
import ApiService from '../../../../services/apiservice';
import FetchData from 'services/fetch';
import { Delay } from 'pages/HOC/delay';

const MakePaymentManager = ({ student }) => {
    const [banks, setBanks]=useState([]);
    const [paymentmodes, setPaymentmodes]=useState([]);
    const navigate = useNavigate();
    const createdby = sessionStorage.getItem('id');
    const lasteditedby = sessionStorage.getItem('id');
    const [formData, setFormData] = useState({  studentclasspromotiontermid:student.current_class_term.id,
      
        amountpaid: 0,
        paymentdate: '',
        paymentmodeid: '',
        bankid: 1,
        description: '',
        transactionno: '',
        is_reversed: "0",
        studentid: student.id,
        is_active: "1",
        classid: student.current_class.id,
        termid: student.current_term.id,
        receiptno: "1"
    });

    const [services, setServices] = useState(student.services || []);
 

    const handleFormSubmit = async (formData) => {
        try {
            const submitData = {
                paymentdata: {
                    studentclasspromotiontermid: formData.studentclasspromotiontermid,
                    amountpaid: formData.amount,
                    paymentdate: "2024-07-15 22:32:28",
                    paymentmodeid: formData.paymentmodeid,
                    bankid: formData.bankid,
                    description: formData.description,
                    transactionno: formData.transactionno,
                    is_reversed: '0',
                    studentid: formData.studentid,
                    is_active: formData.is_active,
                    classid: formData.classid,
                    termid: formData.termid,
                    receiptno: formData.receiptno
                },
                servicesinfo: services.map(service => ({
                    studentserviceid: service.id,
                    amount: formData[`service${service.id}`],
                    is_active: "1"
                }))
            };
            console.log('submit', submitData);

            const response = await ApiService.post("home/add_payment", submitData, true);
            if (response.status === 200) {
                toast.success("Payment added successfully");
                await Delay(1000);
                navigate('/payment/fee-payment');
            } else {
                toast.error("Failed to add payment");
            }
        } catch (error) {
            console.error('Error adding payment:', error);
            toast.error("Failed to add payment");
        }
    };

    const fetch=async()=>{
        await FetchData('home/get_data/banks', setBanks);
        await FetchData('home/get_data/paymentmodes', setPaymentmodes);
    }
    useEffect(()=>{
        fetch()
    }, [])

    const fields = [
        { name: 'amount', label: 'Amount', type: 'number', required: true },
        {
            name: 'paymentmodeid',
            label: 'Payment Mode',
            type: 'select',
            options: paymentmodes.map(paymentmode => ({
                value: paymentmode.id,
                label: paymentmode.name
            })),
            required: true
        },
        { name: 'description', label: 'Description', type: 'text', required: true },
        {
            name: 'bankid',
            label: 'Bank',
            type: 'select',
            options: banks.map(bank => ({
                value: bank.id,
                label: bank.name
            })),
            required: true
        },
        
        { name: 'transactionno', label: 'Transaction No', type: 'text', required: true },
        { name: 'receiptno', label: 'Receipt No', type: 'text', required: true },
        { name: 'remarks', label: 'Remarks', type: 'text', multiline: true, rows: 4, required: true },
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
    ];
    let mergefields = fields; 

    if(services){
        const serviceFields = services.map(service => ({
            name: `service${service.id}`,
            label: `service: ${service.service.name} amount: ${service.service.cost}`,
            type: 'number',
            required: true
        }));
    mergefields = [...fields, ...serviceFields];
    }

    


    return (
        <>
            <GenericForm
                setFormData={setFormData}
                formData={formData}
                title="Add Payment"
                fields={mergefields}
                onSubmit={handleFormSubmit}
                onCancel="/invoices/create-payment"
            />
            <ToastContainer />
        </>
    );
};

export default MakePaymentManager;
