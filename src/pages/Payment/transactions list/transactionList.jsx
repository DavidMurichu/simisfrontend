import React, { useState, useEffect } from 'react';
import { Typography, Button, Tabs, Tab, Box } from '@mui/material';
import TableTemplate from '../../HOC/tabletemplate';
import MainCard from 'components/MainCard';
import axios from 'axios';
import { toast } from 'react-toastify';
import {useNavigate} from "react-router-dom";

const Incomes = () => {
    const [tabValue, setTabValue] = useState(0);
    const [incomeData, setIncomeData] = useState([]);
    const [expenseData, setExpenseData] = useState([]);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchIncomes();
        fetchExpenses();
    }, []);

    const fetchIncomes = async () => {
        try {
            setLoading(true);
            const response = await axios.get('/api/incomes');
            setIncomeData(response.data);
        } catch (error) {
            toast.error("Error fetching incomes data");
            console.error('Error fetching incomes data:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchExpenses = async () => {
        try {
            setLoading(true);
            const response = await axios.get('/api/expenses');
            setExpenseData(response.data);
        } catch (error) {
            toast.error("Error fetching expenses data");
            console.error('Error fetching expenses data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const incomeColumns = [
        { field: 'name', headerName: 'Name', width: 200 },
        { field: 'isActive', headerName: 'Is Active', width: 150 },
        { field: 'createdBy', headerName: 'Created By', width: 200 }
    ];

    const expenseColumns = [
        { field: 'expense', headerName: 'Expenses', width: 200 },
        { field: 'expenseType', headerName: 'Expense Type', width: 200 },
        { field: 'code', headerName: 'Code', width: 150 },
        { field: 'description', headerName: 'Description', width: 200 },
        { field: 'isActive', headerName: 'Is Active', width: 150 }
    ];

    return (
        <MainCard title="JIMANAGE :: INCOMES & EXPENSES">
            <Typography variant="body1" gutterBottom>
                Manage incomes and expenses.
            </Typography>
            <Tabs
                value={tabValue}
                onChange={handleTabChange}
                indicatorColor="primary"
                textColor="primary"
                variant="fullWidth"
                aria-label="Income and Expense Tabs"
            >
                <Tab label="Incomes" />
                <Tab label="Expenses" />
            </Tabs>
            <Box mt={2}>
                {tabValue === 0 && (
                    <div>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {navigate("/payment/add-income")}}
                            style={{ marginBottom: '10px' }}
                        >
                            Add Income
                        </Button>
                        <TableTemplate
                            columns={incomeColumns}
                            data={incomeData}
                            loading={loading}
                            // handleDelete={handleDeleteIncome}
                        />
                    </div>
                )}
                {tabValue === 1 && (
                    <div>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {navigate("/payment/add-expense")}}
                            style={{ marginBottom: '10px' }}
                        >
                            Add Expense
                        </Button>
                        <TableTemplate
                            columns={expenseColumns}
                            data={expenseData}
                            loading={loading}
                            // handleDelete={handleDeleteExpense}
                        />
                    </div>
                )}
            </Box>
        </MainCard>
    );
};

export default Incomes;
