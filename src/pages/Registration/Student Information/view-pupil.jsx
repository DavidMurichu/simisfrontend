import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MainCard from 'components/MainCard';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import Divider from '@mui/material/Divider';
import PupilService from "../../../services/pupilservice";
import {toast} from "react-toastify";

function ViewPupil() {
    const { id } = useParams();
    const [pupil, setPupil] = useState(null);

    useEffect(() => {
        const fetchPupil = async () => {
            try {
                const response = await PupilService.getPupilById(id);
                if (response && response.data) {
                    setPupil(response.data);
                }
            } catch (err) {
                if (err.data) {
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

        fetchPupil();
    }, [id]);

    if (!pupil) {
        return <Typography>Loading...</Typography>;
    }

    const handleDelete = () => {
        // Implement delete logic here
        console.log('Deleting pupil:', pupil.name);
    };

    return (
        <MainCard title={`Pupil Profile: ${pupil.name}`} style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}>
            <Grid container spacing={3} justifyContent="center">
                <Grid item xs={12} md={4} alignItems="center">
                    <Avatar sx={{ width: 120, height: 120, mx: 'auto' }}>
                        <AccountCircleIcon sx={{ width: 100, height: 100 }} />
                    </Avatar>
                    <Typography variant="h4" align="center" sx={{ mt: 2 }}>Personal Information</Typography>
                    <List dense={false}>
                        <ListItem>
                            <ListItemText primaryTypographyProps={{ variant: 'subtitle1' }}>Name</ListItemText>
                            <ListItemSecondaryAction>
                                <Typography variant="body1">{pupil.name}</Typography>
                            </ListItemSecondaryAction>
                        </ListItem>
                        <ListItem>
                            <ListItemText primaryTypographyProps={{ variant: 'subtitle1' }}>Gender</ListItemText>
                            <ListItemSecondaryAction>
                                <Typography variant="body1">{pupil.gender}</Typography>
                            </ListItemSecondaryAction>
                        </ListItem>
                        <ListItem>
                            <ListItemText primaryTypographyProps={{ variant: 'subtitle1' }}>Date of Birth</ListItemText>
                            <ListItemSecondaryAction>
                                <Typography variant="body1">{pupil.dateOfBirth}</Typography>
                            </ListItemSecondaryAction>
                        </ListItem>
                        <ListItem>
                            <ListItemText primaryTypographyProps={{ variant: 'subtitle1' }}>Parent Name</ListItemText>
                            <ListItemSecondaryAction>
                                <Typography variant="body1">{pupil.parentName}</Typography>
                            </ListItemSecondaryAction>
                        </ListItem>
                    </List>
                </Grid>
                <Divider orientation="vertical" flexItem />
                <Grid item xs={12} md={4}>
                    <Typography variant="h5" align="left">Contact Information</Typography>
                    <List dense={false}>
                        <ListItem>
                            <ListItemText primaryTypographyProps={{ variant: 'subtitle1' }}>Mobile</ListItemText>
                            <ListItemSecondaryAction>
                                <Typography variant="body1">{pupil.mobile}</Typography>
                            </ListItemSecondaryAction>
                        </ListItem>
                        <ListItem>
                            <ListItemText primaryTypographyProps={{ variant: 'subtitle1' }}>Secondary Mobile</ListItemText>
                            <ListItemSecondaryAction>
                                <Typography variant="body1">{pupil.secondaryMobile}</Typography>
                            </ListItemSecondaryAction>
                        </ListItem>
                        <ListItem>
                            <ListItemText primaryTypographyProps={{ variant: 'subtitle1' }}>City</ListItemText>
                            <ListItemSecondaryAction>
                                <Typography variant="body1">{pupil.city}</Typography>
                            </ListItemSecondaryAction>
                        </ListItem>
                        <ListItem>
                            <ListItemText primaryTypographyProps={{ variant: 'subtitle1' }}>Town</ListItemText>
                            <ListItemSecondaryAction>
                                <Typography variant="body1">{pupil.town}</Typography>
                            </ListItemSecondaryAction>
                        </ListItem>
                        <ListItem>
                            <ListItemText primaryTypographyProps={{ variant: 'subtitle1' }}>Address</ListItemText>
                            <ListItemSecondaryAction>
                                <Typography variant="body1">{pupil.address}</Typography>
                            </ListItemSecondaryAction>
                        </ListItem>
                    </List>
                    <Typography variant="h5" align="left" sx={{ mt: 4 }}>Academic Information</Typography>
                    <List dense={false}>
                        <ListItem>
                            <ListItemText primaryTypographyProps={{ variant: 'subtitle1' }}>Admission Class</ListItemText>
                            <ListItemSecondaryAction>
                                <Typography variant="body1">{pupil.admissionClass}</Typography>
                            </ListItemSecondaryAction>
                        </ListItem>
                        <ListItem>
                            <ListItemText primaryTypographyProps={{ variant: 'subtitle1' }}>Admission Year</ListItemText>
                            <ListItemSecondaryAction>
                                <Typography variant="body1">{pupil.admissionYear}</Typography>
                            </ListItemSecondaryAction>
                        </ListItem>
                        <ListItem>
                            <ListItemText primaryTypographyProps={{ variant: 'subtitle1' }}>Current Academic Year</ListItemText>
                            <ListItemSecondaryAction>
                                <Typography variant="body1">{pupil.currentAcademicYear}</Typography>
                            </ListItemSecondaryAction>
                        </ListItem>
                    </List>
                </Grid>
                <Grid item xs={12} md={4} sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                    <Button onClick={handleDelete} variant="contained" color="secondary">
                        Delete Pupil
                    </Button>
                </Grid>
            </Grid>
        </MainCard>
    );
}

export default ViewPupil;
