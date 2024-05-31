import React, { useState } from 'react';
import { Typography, Button, Grid, Divider, Select, MenuItem, Box, Collapse, List, ListItem, ListItemText, Paper } from '@mui/material';
import MainCard from 'components/MainCard';

function PupilClass() {
    const [selectedClass, setSelectedClass] = useState('');
    const [selectedStream, setSelectedStream] = useState('');
    const [selectedStudent, setSelectedStudent] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [classStreams, setClassStreams] = useState({
        'Class 1': ['Stream A', 'Stream B', 'Stream C'],
        'Class 2': ['Stream X', 'Stream Y', 'Stream Z'],
        'Class 3': ['Stream P', 'Stream Q', 'Stream R'],
    });

    const handleClassSelect = (className) => {
        setSelectedClass(className);
        setSelectedStream('');
        setSelectedStudent('');
        setSuccessMessage('');
    };

    const handleStreamSelect = (streamName) => {
        setSelectedStream(streamName);
        setSelectedStudent('');
        setSuccessMessage('');
    };

    const handleStudentSelect = (studentName) => {
        setSelectedStudent(studentName);
        setSuccessMessage('');
    };

    const handlePlacePupil = () => {
        setSuccessMessage('Pupil placed successfully!');
    };

    const handleSetAsClass = () => {
        setSuccessMessage(`Stream ${selectedStream} set as class for ${selectedStudent}`);
    };

    return (
        <MainCard title="Pupil Class" sx={{ p: 3 }}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={3}>
                    <Paper elevation={3} sx={{ p: 2, height: '100%' }}>
                        <Typography variant="h6" gutterBottom>Classes</Typography>
                        <List>
                            {Object.keys(classStreams).map((className) => (
                                <ListItem
                                    button
                                    key={className}
                                    onClick={() => handleClassSelect(className)}
                                    selected={selectedClass === className}
                                    sx={{ mb: 1 }}
                                >
                                    <ListItemText primary={className} />
                                </ListItem>
                            ))}
                        </List>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={9}>
                    <Box>
                        <Collapse in={!!selectedClass}>
                            <Typography variant="h6" gutterBottom>Select Stream</Typography>
                            <Select
                                value={selectedStream}
                                onChange={(e) => handleStreamSelect(e.target.value)}
                                fullWidth
                                variant="outlined"
                                sx={{ mb: 3 }}
                            >
                                <MenuItem value="">Select Stream</MenuItem>
                                {classStreams[selectedClass]?.map((streamName) => (
                                    <MenuItem key={streamName} value={streamName}>
                                        {streamName}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Collapse>
                        <Collapse in={!!selectedClass && !!selectedStream}>
                            <Typography variant="h6" gutterBottom>Selected Stream Information</Typography>
                            <Box mt={2} mb={3}>
                                <Typography variant="body1">Stream: {selectedStream}</Typography>
                                <Typography variant="body1">Number of Students: 25</Typography>
                                {/* Add more stream-related information here */}
                            </Box>
                        </Collapse>
                    </Box>
                    <Divider sx={{ my: 3 }} />
                    <Box>
                        <Typography variant="h6" gutterBottom>Selected Student Information</Typography>
                        <Box mt={2} mb={3}>
                            <Typography variant="body1">
                                {selectedStudent ? `Student: ${selectedStudent}` : 'No student selected'}
                            </Typography>
                        </Box>
                        <Divider sx={{ my: 3 }} />
                        <Box display="flex" justifyContent="center" gap={2}>
                            <Button
                                variant="contained"
                                color="success"
                                onClick={handlePlacePupil}
                                disabled={!selectedStudent || !selectedStream}
                            >
                                Place Pupil
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleSetAsClass}
                                disabled={!selectedStudent || !selectedStream}
                            >
                                Set as Class
                            </Button>
                        </Box>
                        {successMessage && (
                            <Box display="flex" justifyContent="center" mt={2}>
                                <Typography variant="body1" color="success" align="center">
                                    {successMessage}
                                </Typography>
                            </Box>
                        )}
                    </Box>
                </Grid>
            </Grid>
        </MainCard>
    );
}

export default PupilClass;
