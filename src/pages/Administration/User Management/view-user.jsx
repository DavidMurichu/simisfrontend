import React from 'react';
import { Link } from 'react-router-dom';
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

function ViewUser() {
    const user = {
        id: 1,
        name: 'Doe',
        fullname: 'John Doe',
        email: 'john.doe@example.com',
        department: 'Engineering',
        phone: '123-456-7890',
        role: 'Administrator',
    };

    const handleDelete = () => {
        // Implement delete logic here
        console.log('Deleting user:', user.fullname);
    };

    return (
        <MainCard title={`User Profile: ${user.fullname}`}>
            <Grid container spacing={3} justifyContent="center">
                <Grid item xs={12} md={4} alignItems="center">
                    <Avatar sx={{ width: 120, height: 120, mx: 'auto' }}>
                        <AccountCircleIcon sx={{ width: 100, height: 100 }} />
                    </Avatar>
                    <Typography variant="h4" align="center" sx={{ mt: 2 }}>Personal Information</Typography>
                    <List dense={false}>
                        <ListItem>
                            <ListItemText primaryTypographyProps={{ variant: 'subtitle1' }}>Surname</ListItemText>
                            <ListItemSecondaryAction>
                                <Typography variant="body1">{user.name}</Typography>
                            </ListItemSecondaryAction>
                        </ListItem>
                        <ListItem>
                            <ListItemText primaryTypographyProps={{ variant: 'subtitle1' }}>Full Names</ListItemText>
                            <ListItemSecondaryAction>
                                <Typography variant="body1">{user.fullname}</Typography>
                            </ListItemSecondaryAction>
                        </ListItem>
                        <ListItem>
                            <ListItemText primaryTypographyProps={{ variant: 'subtitle1' }}>Email</ListItemText>
                            <ListItemSecondaryAction>
                                <Typography variant="body1">{user.email}</Typography>
                            </ListItemSecondaryAction>
                        </ListItem>
                        <ListItem>
                            <ListItemText primaryTypographyProps={{ variant: 'subtitle1' }}>Department</ListItemText>
                            <ListItemSecondaryAction>
                                <Typography variant="body1">{user.department}</Typography>
                            </ListItemSecondaryAction>
                        </ListItem>
                    </List>
                </Grid>
                <Divider orientation="vertical" flexItem />
                <Grid item xs={12} md={4}>
                    <Typography variant="h5" align="left">Contact Information</Typography>
                    <List dense={false}>
                        <ListItem>
                            <ListItemText primaryTypographyProps={{ variant: 'subtitle1' }}>Phone</ListItemText>
                            <ListItemSecondaryAction>
                                <Typography variant="body1">{user.phone}</Typography>
                            </ListItemSecondaryAction>
                        </ListItem>
                    </List>
                    <Typography variant="h5" align="left" sx={{ mt: 4 }}>Role Information</Typography>
                    <List dense={false}>
                        <ListItem>
                            <ListItemText primaryTypographyProps={{ variant: 'subtitle1' }}>Role</ListItemText>
                            <ListItemSecondaryAction>
                                <Typography variant="body1">{user.role}</Typography>
                            </ListItemSecondaryAction>
                        </ListItem>
                    </List>
                </Grid>
                <Grid item xs={12} md={4} sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                    <Button onClick={handleDelete} variant="contained" color="secondary">
                        Delete User
                    </Button>
                </Grid>
            </Grid>
        </MainCard>
    );
}

export default ViewUser;
