import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from "react-toastify";
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TeacherService from "../../../../services/TeacherService";

function Teachers() {
    const [persons, setPersons] = useState([]);

    const fetchPersons = async () => {
        try {
            const response = await TeacherService.getAllPersons();
            setPersons(response.data);
        } catch (error) {
            console.error('Error fetching persons:', error);
        }
    };

    useEffect(() => {
        fetchPersons();
    }, []);

    const handleDelete = async (id) => {
        try {
            const response = await TeacherService.deletePerson(id);
            if (response.status === 200) {
                toast.success("Deleted person successfully");
                fetchPersons();
            } else {
                toast.warning("Error, Try again");
            }
        } catch (error) {
            console.log("Error deleting person", error);
        }
    };
    return (
        <div>
            <h1>Teacher Management</h1>
            <Button variant="contained" color="primary" component={Link} to="/add-teacher">Add new Teacher</Button>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Surname</TableCell>
                            <TableCell>First Name</TableCell>
                            <TableCell>Last Name</TableCell>
                            <TableCell>Title</TableCell>
                            <TableCell>Mobile No</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Physical Address</TableCell>
                            <TableCell>Created On</TableCell>
                            <TableCell>Is Active</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {persons.map((person) => (
                            <TableRow key={person.id}>
                                <TableCell>{person.name}</TableCell>
                                <TableCell>{person.surname}</TableCell>
                                <TableCell>{person.firstname}</TableCell>
                                <TableCell>{person.lastname}</TableCell>
                                <TableCell>{person.title}</TableCell>
                                <TableCell>{person.mobileno}</TableCell>
                                <TableCell>{person.email}</TableCell>
                                <TableCell>{person.physicaladdress}</TableCell>
                                <TableCell>{person.createdon}</TableCell>
                                <TableCell>{person.isActive ? 'Active' : 'Inactive'}</TableCell>
                                <TableCell>
                                    <Button variant="contained" color="primary" component={Link} to={`/edit-teacher/${person.id}`}>Edit</Button>
                                    <Button variant="contained" color="secondary" onClick={() => handleDelete(person.id)}>Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default Teachers;
