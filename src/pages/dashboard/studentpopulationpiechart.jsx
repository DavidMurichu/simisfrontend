import React, { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import ReactApexChart from 'react-apexcharts';
import MainCard from 'components/MainCard';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

const StudentPopulationPieChart = () => {
    const theme = useTheme();

    const [slot, setSlot] = useState('week');
    const [options, setOptions] = useState({
        chart: {
            type: 'pie',
            toolbar: {
                show: false
            }
        },
        labels: ['Male', 'Female'],
        legend: {
            position: 'bottom'
        },
        dataLabels: {
            enabled: true,
            formatter: (val) => `${val.toFixed(1)}%`
        }
    });

    useEffect(() => {
        setOptions((prevState) => ({
            ...prevState,
            colors: ['#FF5733', '#800000'],
            legend: {
                ...prevState.legend,
                labels: {
                    colors: theme.palette.text.secondary
                }
            }
        }));
    }, [theme]);

    const [series] = useState([60, 40]); // Sample data: 60% male, 40% female

    return (
        <>
            <Grid container alignItems="center" justifyContent="space-between">
                <Grid item>
                    <Typography variant="h6">Student Population</Typography>
                </Grid>

            </Grid>
            <MainCard content={false} sx={{ mt: 1.5 }}>
                <Box sx={{ pt: 1, pr: 2 }}>
                    <ReactApexChart options={options} series={series} type="pie" height={250} />
                </Box>
            </MainCard>
        </>
    );
};

export default StudentPopulationPieChart;
