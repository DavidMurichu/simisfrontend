import React from 'react';
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    Grid,
    FormControl,
    InputLabel,
    Select,
    MenuItem
} from '@mui/material';
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';

const FilterComponent = ({ uniqueClasses, uniqueTerms, uniqueYears, selectedClass, setSelectedClass, selectedTerm, setSelectedTerm, selectedYear, setSelectedYear }) => {
    return (
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="filter-panel-content"
                id="filter-panel-header"
            >
                <Typography variant="h6">Filter Students</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={4}>
                        <FormControl fullWidth>
                            <InputLabel>Class</InputLabel>
                            <Select
                                value={selectedClass}
                                onChange={(e) => setSelectedClass(e.target.value)}
                                label="Class"
                            >
                                <MenuItem value="">All Classes</MenuItem>
                                {uniqueClasses.map((classId, index) => (
                                    <MenuItem key={index} value={classId}>{classId}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <FormControl fullWidth>
                            <InputLabel>Term</InputLabel>
                            <Select
                                value={selectedTerm}
                                onChange={(e) => setSelectedTerm(e.target.value)}
                                label="Term"
                            >
                                <MenuItem value="">All Terms</MenuItem>
                                {uniqueTerms.map((term, index) => (
                                    <MenuItem key={index} value={term}>{term}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <FormControl fullWidth>
                            <InputLabel>Academic Year</InputLabel>
                            <Select
                                value={selectedYear}
                                onChange={(e) => setSelectedYear(e.target.value)}
                                label="Academic Year"
                            >
                                <MenuItem value="">All Years</MenuItem>
                                {uniqueYears.map((year, index) => (
                                    <MenuItem key={index} value={year}>{year}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
            </AccordionDetails>
        </Accordion>
    );
};

export default FilterComponent;
