import React from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import MainCard from 'components/MainCard';
import { Link } from 'react-router-dom';

export default function FinancialReports() {
    return (
        <MainCard title="Financial Reports">
            <Typography variant="body1" gutterBottom>
                View and generate financial reports.
            </Typography>

            {/* Placeholder buttons for different types of financial reports */}
            <Button variant="outlined" color="primary" sx={{ mr: 2, mb: 2 }}>
                <Link to="/income-reports">Income Reports</Link>
            </Button>
            <Button variant="outlined" color="primary" sx={{ mr: 2, mb: 2 }}>
                <Link to="/expense-reports">Expense Reports</Link>
            </Button>
            <Button variant="outlined" color="primary" sx={{ mr: 2, mb: 2 }}>
                <Link to="/profit-loss">Profit & Loss</Link>
            </Button>
            <Button variant="outlined" color="primary" sx={{ mr: 2, mb: 2 }}>
                <Link to="/balance-sheet">Balance Sheet</Link>
            </Button>
            <Button variant="outlined" color="primary" sx={{ mb: 2 }}>
                <Link to="/cash-flow">Cash Flow</Link>
            </Button>

        </MainCard>
    );
}
