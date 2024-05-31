import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import PupilService from '../../../../services/pupilservice';
import ClassesService from '../../../../services/classesService';
import AcademicYearService from '../../../../services/calendarService';

function PromotionTerm() {
    const navigate = useNavigate();
    const [recentPupils, setRecentPupils] = useState([]);
    const [classes, setClasses] = useState([]);
    const [academicYears, setAcademicYears] = useState([]);
    const [selectedPupil, setSelectedPupil] = useState('');
    const [selectedClass, setSelectedClass] = useState('');
    const [selectedAcademicYear, setSelectedAcademicYear] = useState('');
    const [isActive, setIsActive] = useState(true);

    useEffect(() => {
        fetchRecentPupils();
        fetchClasses();
        fetchAcademicYears();
    }, []);

    const fetchRecentPupils = async () => {
        try {
            const response = await PupilService.getAllPupils();
            setRecentPupils(response.data);
        } catch (error) {
            console.error('Error fetching recent pupils:', error);
        }
    };

    const fetchClasses = async () => {
        try {
            const response = await ClassesService.getAllClasses();
            setClasses(response.data);
        } catch (error) {
            console.error('Error fetching classes:', error);
        }
    };

    const fetchAcademicYears = async () => {
        try {
            const response = await AcademicYearService.getAllAcademicYears();
            setAcademicYears(response.data);
        } catch (error) {
            console.error('Error fetching academic years:', error);
        }
    };

    const handlePromotion = async () => {
        try {
            if (!selectedPupil || !selectedClass || !selectedAcademicYear) {
                console.error('Please select pupil, class, and academic year.');
                return;
            }

            const promotionData = {
                studentid: selectedPupil,
                class_name: selectedClass,
                academicyear: selectedAcademicYear,
                promotedon: null,
                createdby: null,
                lasteditedby: null,
                ipaddress: null,
                is_active: isActive ? '1' : '0',
            };
            const response = await PupilService.promotePupil(promotionData);
            if (response) {
                toast.success("Successfully promoted user");
                navigate("/pupil-class-promotion");
            }
        } catch (error) {
            console.error('Error promoting student:', error);
        }
    };

    return (
        <div>
            <Typography variant="h1">Promotion page</Typography>

            <Select
                name="studentid"
                value={selectedPupil}
                onChange={(e) => setSelectedPupil(e.target.value)}
                displayEmpty
                fullWidth
            >
                <MenuItem value="" disabled>Select Pupil</MenuItem>
                {recentPupils.map((pupil) => (
                    <MenuItem key={pupil.id} value={pupil.id}>{pupil.name}</MenuItem>
                ))}
            </Select>

            <Select
                name="class_name"
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                displayEmpty
                fullWidth
            >
                <MenuItem value="" disabled>Select Class</MenuItem>
                {classes.map((classItem) => (
                    <MenuItem key={classItem.id} value={classItem.name}>{classItem.name}</MenuItem>
                ))}
            </Select>

            <Select
                name="academicyear"
                value={selectedAcademicYear}
                onChange={(e) => setSelectedAcademicYear(e.target.value)}
                displayEmpty
                fullWidth
            >
                <MenuItem value="" disabled>Select Academic Year</MenuItem>
                {academicYears.map((year) => (
                    <MenuItem key={year.id} value={year.name}>{year.name}</MenuItem>
                ))}
            </Select>

            <div>
                <FormControlLabel
                    control={<Checkbox checked={isActive} onChange={(e) => setIsActive(e.target.checked)} />}
                    label="Is Active"
                />
            </div>

            <Button variant="contained" color="primary" onClick={handlePromotion}>Promote Student</Button>
        </div>
    );
}

export default PromotionTerm;
