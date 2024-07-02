import React, { useState, useEffect } from 'react';
import { Typography, TextField, Button, Grid, MenuItem, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import MainCard from "../../components/MainCard";

const GenericForm = ({ formData, title, fields, onSubmit, onCancel, navigateTo, setFormData = null }) => {
    const [formState, setFormState] = useState(formData);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        setFormState(formData);
    }, [formData]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const updatedValue = type === 'checkbox' ? checked : value;

        if (setFormData) {
            setFormData({
                ...formData,
                [name]: updatedValue,
            });
        } else {
            setFormState({
                ...formState,
                [name]: updatedValue,
            });
        }
    };

    const validate = () => {
        let tempErrors = {};
        fields.forEach(field => {
            if (field.required && !formState[field.name]) {
                tempErrors[field.name] = `${field.label} is required`;
            }
        });
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            try {
                await onSubmit(formState);
            } catch (error) {
                console.error(`Error adding ${title.toLowerCase()}:`, error);
                toast.error(`Failed to add ${title.toLowerCase()}`);
            }
        } else {
            toast.error("Please fill in all required fields");
        }
    };

    return (
        <MainCard title={title} style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}>
            <Typography variant="body1" gutterBottom>
                Fill in the details to {title}.
            </Typography>
            <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                    {fields.map((field) => (
                        <Grid item xs={12} sm={field.size || 6} key={field.name}>
                            {field.type === 'select' ? (
                                <TextField
                                    fullWidth
                                    select
                                    label={field.label}
                                    name={field.name}
                                    value={formState[field.name] || ''}
                                    onChange={handleChange}
                                    required={field.required || false}
                                    error={!!errors[field.name]}
                                    helperText={errors[field.name]}
                                >
                                    {field.options.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            ) : (
                                <TextField
                                    fullWidth
                                    label={field.label}
                                    name={field.name}
                                    value={formState[field.name] || ''}
                                    onChange={handleChange}
                                    required={field.required || false}
                                    type={field.type || 'text'}
                                    InputLabelProps={field.type === 'date' ? { shrink: true } : {}}
                                    multiline={field.multiline || false}
                                    rows={field.rows || 1}
                                    error={!!errors[field.name]}
                                    helperText={errors[field.name]}
                                />
                            )}
                        </Grid>
                    ))}
                    <Grid item xs={12}>
                        <Button variant="contained" color="primary" type="submit">
                            Submit
                        </Button>
                        <Button
                            variant="contained"
                            color="secondary"
                            component={Link}
                            to={onCancel}
                            sx={{ ml: 2 }}
                        >
                            Cancel
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </MainCard>
    );
};

export default GenericForm;
