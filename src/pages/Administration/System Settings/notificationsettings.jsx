import Typography from "@mui/material/Typography";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Box from "@mui/material/Box";
import React, {useState} from "react";

function Notificationsettings() {
    const [notificationSettings] = useState([
        { id: 1, description: 'Email Notifications', status: 'Active', createdOn: '2022-01-01', isActive: true },
        { id: 2, description: 'Push Notifications', status: 'Inactive', createdOn: '2022-02-01', isActive: false },
        { id: 3, description: 'SMS Notifications', status: 'Active', createdOn: '2022-03-01', isActive: true },
    ]);
    return(
        <>
            <Box mt={3}>
                <Typography variant="h6" gutterBottom>
                    Notification Settings
                </Typography>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Description</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Created On</TableCell>
                                <TableCell>Is Active</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {notificationSettings.map((setting) => (
                                <TableRow key={setting.id}>
                                    <TableCell>{setting.description}</TableCell>
                                    <TableCell>{setting.status}</TableCell>
                                    <TableCell>{setting.createdOn}</TableCell>
                                    <TableCell>{setting.isActive ? 'Active' : 'Inactive'}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </>
    )
}
export default Notificationsettings;