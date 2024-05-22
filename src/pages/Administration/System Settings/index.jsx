import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import MainCard from 'components/MainCard';
import Notificationsettings from "./notificationsettings";
import Clientinfo from "./clientinfo";

export default function SystemSettings() {
    const [tabValue, setTabValue] = useState(0);

    const handleChange = (event, newValue) => {
        setTabValue(newValue);
    };




    return (
        <MainCard title="System Settings">
            <Typography variant="body1" gutterBottom>
                Manage system settings here.
            </Typography>

            <Box mt={3}>
                <Tabs value={tabValue} onChange={handleChange}>
                    <Tab label="Client Info" />
                    <Tab label="Notification Settings" />
                </Tabs>

                {tabValue === 0 && (
                  <Clientinfo/>
                )}

                {tabValue === 1 && (
                   <Notificationsettings/>
                )}
            </Box>
        </MainCard>
    );
}
