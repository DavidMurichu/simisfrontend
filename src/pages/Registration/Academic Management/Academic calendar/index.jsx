import React, { useState } from 'react';
import {
    Box,
    Button,
    Collapse,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';
import MainCard from 'components/MainCard';
import Term from "./Term";
import Academicyear from "./Years/academicyear";
import Calendaryear from "./Years/calendar/calendaryear";
import Academicyearterm from "./Years/term/addacademicyearterm";
import AcademicTermYear from "./Years/term/academictermyear";
import StudentClassTerm from "./student class term";

const AcademicYears = () => {
    const [selectedOption, setSelectedOption] = useState("Academic Years");
    const [searchQuery, setSearchQuery] = useState('');
    const [showFilters, setShowFilters] = useState(false);

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
        setSearchQuery('');
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const componentMap = {
        "Academic Years": <Academicyear searchQuery={searchQuery} />,
        "Student Class Term": <StudentClassTerm searchQuery={searchQuery} />,
        "Terms": <Term searchQuery={searchQuery} />,
        "Calendar Years": <Calendaryear searchQuery={searchQuery} />,
        "Academic Year Term": <AcademicTermYear searchQuery={searchQuery} />,
    };

    return (
        <MainCard title="Academic Year Management">
            <Typography variant="body1" gutterBottom>
                Welcome to the Academic Year Management page. Here you can manage academic years, terms, events, and calendar years.
            </Typography>

            <Box display="flex" flexDirection="column">
                <Box mb={2}>
                    <FormControl variant="outlined" sx={{ minWidth: 200 }}>
                        <InputLabel id="select-option-label">Select Option</InputLabel>
                        <Select
                            labelId="select-option-label"
                            value={selectedOption}
                            onChange={handleOptionChange}
                            label="Select Option"
                        >
                            {Object.keys(componentMap).map((option, index) => (
                                <MenuItem key={index} value={option}>{option}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>

                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => setShowFilters(!showFilters)}
                    >
                        {showFilters ? 'Hide Filters' : 'Show Filters'}
                    </Button>

                    <Button
                        variant="contained"
                        color="primary"
                        component={Link}
                        to={`/academic-years/add-${selectedOption.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                        Add New {selectedOption}
                    </Button>
                </Box>

                <Collapse in={showFilters}>
                    <Box mb={2}>
                        {/* Add filter options here if needed */}
                    </Box>
                </Collapse>

                {componentMap[selectedOption]}
            </Box>
        </MainCard>
    );
};

export default AcademicYears;
