import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MainCard from 'components/MainCard';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link, useNavigate } from 'react-router-dom';
import Account from '../../../services/account';
import GenderService from '../../../services/pupilservice';
import AcademicYearService from '../../../services/calendarService';
import {toast, ToastContainer} from 'react-toastify';
import PupilService from '../../../services/pupilservice';
import ClassesService from '../../../services/classesService';
import MenuItem from "@mui/material/MenuItem";
import { Checkbox, FormControlLabel } from '@mui/material';
import FetchData from 'services/fetch';
import ApiService from 'services/apiservice';

function AddPupil() {
    const [services, setServices]=useState([]);
    const navigate = useNavigate();
    const [selectedServices, setSelectedServices] = useState([]);

   
    const [formData, setFormData] = useState({
        name: '',
        admission_no: '',
        nemis_number: '',
        assessment_number: '',
        parentname: '',
        classid: '',
        academicyearid: '',
        parent_mobile: '',
        secondary_mobile: '',
        dob: '',
        city: '',
        town: '',
        streetaddress: '',
        mobile: '',
        email: '',
        remarks: '',
        is_active: '',
        ipaddress: '',
        prev_class_id: '',
        current_class_id: '',
        current_term_id: '',
        current_academic_year: '',
        genderid: '',
        teachers_student: '0',
        deactivated: '0',
        deactivate_reason: 'Not Deactivated',
        branch_id: '',
        fathers_name: '',
        fathers_phone: '',
        mothers_name: '',
        mothers_phone: '',
        guardians_name: '',
        guardians_phone: '',
        last_school_attended: '',
        birth_cert_no: '',
        upi_no: '',
        transfer_term_id: '',
        createdby: '',
        lasteditedby: ''
    });

    const [branches, setBranches] = useState([]);
    const [genders, setGenders] = useState([]);
    const [terms, setTerms] = useState([]);
    const [classes, setClasses] = useState([]);
    const [years, setYears] = useState([]);
    const [branchName, setBranchName] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        const branchName = sessionStorage.getItem("role");
        setBranchName(branchName);
    }, []);

    const fetch=async()=>{
        await FetchData('home/get_data/auth_branches', setBranches);
        await FetchData('home/get_data/sys_genders', setGenders);
        await FetchData('home/get_data/sch_terms', setTerms);
        await FetchData('home/get_data/sch_academic_years', setYears);
        await FetchData('home/get_data/sch_classes', setClasses);
        await FetchData('home/get_data/sch_services', setServices);
    }

    useEffect(()=>{
        fetch()
    }, []);
     // Handle checkbox change
    const handleCheckboxChange = (id) => {
        setSelectedServices((prevSelected) => {
          if (prevSelected.includes(id)) {
            return prevSelected.filter((serviceId) => serviceId !== id);
          } else {
            return [...prevSelected, id];
          }
        });
        
      };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload={
            studentData:formData,
            servicesData:selectedServices
        }
        try {
            const response = await ApiService.post('home/register/student', payload, true);
            console.log("response", response.data);
            if (response.status === 201) {
                toast.success("Successfully added user to database");
                navigate("/registration/student-information");
            } else if (response.status === 401) {
                const errorMessage = response.data[0]?.message || "Unauthorized. Please try again.";
                toast.warning("Try again: " + errorMessage);
            }
        } catch (err) {
            if (err.data) {
                // Accessing the array of errors and getting the first error message
                const errorMessage = err.data[0].message;
                console.log("Error from response", err.data, errorMessage);
                toast.warning("Try again: " + errorMessage);
            } else if (err.message) {
                toast.error(err.message);
            } else {
                toast.error("An unexpected error occurred. Please try again.");
            }
        }
    };

    return (
        <MainCard title="Add Pupil" style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}>
            <ToastContainer/>
            <form onSubmit={handleSubmit}>
                <Accordion defaultExpanded>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>Personal Information</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Pupil's Name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    fullWidth
                                    error={!!error && !formData.name.trim()}
                                    helperText={!!error && !formData.name.trim() ? 'Name is required.' : ''}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    select
                                    label="Gender "
                                    name="genderid"
                                    value={formData.genderid}
                                    onChange={handleChange}
                                    fullWidth
                                    SelectProps={{
                                        native: true,
                                    }}
                                    required
                                >
                                    <option value=""></option>
                                    {genders.map(gender => (
                                        <option key={gender.id} value={gender.name}>{gender.name}</option>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Date of Birth"
                                    name="dob"
                                    type="date"
                                    value={formData.dob}
                                    onChange={handleChange}
                                    fullWidth
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="City"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Town"
                                    name="town"
                                    value={formData.town}
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Street Address"
                                    name="streetaddress"
                                    value={formData.streetaddress}
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                />
                            </Grid>
                        </Grid>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>Contact Information</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Mobile"
                                    name="mobile"
                                    value={formData.mobile}
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Email"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Parent Mobile"
                                    name="parent_mobile"
                                    value={formData.parent_mobile}
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Secondary Mobile"
                                    name="secondary_mobile"
                                    value={formData.secondary_mobile}
                                    onChange={handleChange}
                                    fullWidth
                                />
                            </Grid>
                        </Grid>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>Parental Information</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Father's Name"
                                    name="fathers_name"
                                    value={formData.fathers_name}
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Father's Phone"
                                    name="fathers_phone"
                                    value={formData.fathers_phone}
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Mother's Name"
                                    name="mothers_name"
                                    value={formData.mothers_name}
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Mother's Phone"
                                    name="mothers_phone"
                                    value={formData.mothers_phone}
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Guardian's Name"
                                    name="guardians_name"
                                    value={formData.guardians_name}
                                    onChange={handleChange}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Guardian's Phone"
                                    name="guardians_phone"
                                    value={formData.guardians_phone}
                                    onChange={handleChange}
                                    fullWidth
                                />
                            </Grid>
                        </Grid>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>Academic Information</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Admission No"
                                    name="admission_no"
                                    value={formData.admission_no}
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="NEMIS Number"
                                    name="nemis_number"
                                    value={formData.nemis_number}
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Assessment Number"
                                    name="assessment_number"
                                    value={formData.assessment_number}
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    select
                                    label="Previous Class"
                                    name="prev_class_id"
                                    value={formData.prev_class_id}
                                    onChange={handleChange}
                                    fullWidth
                                    SelectProps={{
                                        native: true,
                                    }}
                                    required
                                >
                                    <option value=""></option>
                                    {classes.map(cls => (
                                        <option key={cls.id} value={cls.name}>{cls.name}</option>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    select
                                    label="Current Class"
                                    name="current_class_id"
                                    value={formData.current_class_id}
                                    onChange={handleChange}
                                    fullWidth
                                    SelectProps={{
                                        native: true,
                                    }}
                                    required
                                >
                                    <option value=""></option>
                                    {classes.map(cls => (
                                        <option key={cls.id} value={cls.name}>{cls.name}</option>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    select
                                    label="Term ID"
                                    name="current_term_id"
                                    value={formData.current_term_id}
                                    onChange={handleChange}
                                    fullWidth
                                    SelectProps={{
                                        native: true,
                                    }}
                                    required
                                >
                                    <option value=""></option>
                                    {terms.map(term => (
                                        <option key={term.id} value={term.name}>{term.name}</option>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    select
                                    label="Transfer Term Id"
                                    name="transfer_term_id"
                                    value={formData.transfer_term_id}
                                    onChange={handleChange}
                                    fullWidth
                                    SelectProps={{
                                        native: true,
                                    }}
                                    required
                                >
                                    <option value=""></option>
                                    {terms.map(term => (
                                        <option key={term.id} value={term.name}>{term.name}</option>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    select
                                    label="Academic Year"
                                    name="academicyearid"
                                    value={formData.academicyearid}
                                    onChange={handleChange}
                                    fullWidth
                                    SelectProps={{
                                        native: true,
                                    }}
                                    required
                                >
                                    <option value=""></option>
                                    {years.map(year => (
                                        <option key={year.id} value={year.name}>{year.name}</option>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    select
                                    label="Branch"
                                    name="branch_id"
                                    value={formData.branch_id}
                                    onChange={handleChange}
                                    fullWidth
                                    SelectProps={{
                                        native: true,
                                    }}
                                    required
                                >
                                    <option value=""></option>
                                    {branches.map(branch => (
                                        <option key={branch.id} value={branch.branch_name}>{branch.branch_name}</option>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    select
                                    label="Teacher Student"
                                    name="teacher_student"
                                    value={formData.teachers_student}
                                    onChange={handleChange}
                                >
                                    <MenuItem value={'0'}>Yes</MenuItem>
                                    <MenuItem value={'1'}>No</MenuItem>
                                </TextField>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    select
                                    label="Deactivated"
                                    name="deactivated"
                                    value={formData.deactivated}
                                    onChange={handleChange}
                                    required
                                >
                                    <MenuItem value={'1'}>Yes</MenuItem>
                                    <MenuItem value={'0'}>No</MenuItem>
                                </TextField>
                            </Grid>
                            {
                                formData.deactivated==='1'&&
                                <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Deactivated Reason"
                                    name="deactivate_reason"
                                    value={formData.deactivate_reason}
                                    onChange={handleChange}
                                    fullWidth

                                />
                            </Grid>

                            }
                            
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    select
                                    label="Is Active"
                                    name="is_active"
                                    value={formData.is_active}
                                    onChange={handleChange}
                                    required
                                >
                                    <MenuItem value={'0'}>Active</MenuItem>
                                    <MenuItem value={'1'}>Inactive</MenuItem>
                                </TextField>
                            </Grid>
                        </Grid>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>Student Services</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                    <Grid container spacing={2}>
                        {services.length!=0 ?(
                            services.map((service) => (
                                <Grid item xs={12} sm={6} md={3} key={service.id}>
                                    <FormControlLabel
                                        control={
                                        <Checkbox
                                            checked={selectedServices.includes(service.id)}
                                            onChange={() => handleCheckboxChange(service.id)}
                                        />
                                        }
                                        label={
                                        <Typography variant="body1">
                                            {service.name}
                                        </Typography>
                                        }
                                    />
                                </Grid>
                                ))
                        ):(
                            <>
                            <Typography padding={2}>
                                No Services Available
                            </Typography>
                            </>
                        )
                        }
                    </Grid>
                    </AccordionDetails>
                </Accordion>
                <Grid container spacing={3} sx={{ mt: 2 }}>
                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" color="primary">
                            Add Pupil
                        </Button>
                        <Button variant="contained" color="secondary" component={Link} to="/registration/student-information" sx={{ ml: 2 }}>
                            Cancel
                        </Button>
                    </Grid>
                    {successMessage && (
                        <Grid item xs={12}>
                            <div style={{ color: 'green' }}>{successMessage}</div>
                        </Grid>
                    )}
                </Grid>
            </form>
        </MainCard>
    );
}

export default AddPupil;
