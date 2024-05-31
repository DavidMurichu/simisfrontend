import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import React, { useState, useEffect } from "react";
import Account from "../../../services/account";

function Clientinfo() {
    const [clientInfo, setClientInfo] = useState([]);
    const [changedFields, setChangedFields] = useState({});
    const [tableId, setTableId] = useState("");

    const fetchClientInfo = async () => {
        try {
            const response = await Account.getClientInfo();
            console.log(response.data);
            if (response.data && response.data.length > 0) {
                const clientData = response.data[0]; // Assuming you want the first element
                setClientInfo(clientData);
                setTableId(clientData.id);
            }
        } catch (error) {
            console.error('Error fetching client info:', error);
        }
    };

    useEffect(() => {
        fetchClientInfo();
    }, []);

    const handleClientInfoSubmit = async (event) => {
        event.preventDefault();
        const id = sessionStorage.getItem("id");
        try {
            const response = await Account.updateClientInfo(id, { tableId, changedFields });
            if (response) {
                console.log('Success:', response.data);
                fetchClientInfo();
            }
            console.log("changed fields", changedFields);
        } catch (error) {
            console.error('Error submitting client info:', error);
        }
    };

    const handleClientInfoChange = (event) => {
        const { name, value } = event.target;
        setClientInfo({
            ...clientInfo,
            [name]: value,
        });
        setChangedFields({
            ...changedFields,
            [name]: value,
        });
    };

    return (
        <Box mt={3}>
            <Typography variant="h6" gutterBottom>
                Client Info
            </Typography>
            <form onSubmit={handleClientInfoSubmit}>
                <TextField
                    fullWidth
                    label="Company Name"
                    variant="outlined"
                    name="name"
                    value={clientInfo.name || ""}
                    onChange={handleClientInfoChange}
                    sx={{ mb: 2 }}
                />
                <TextField
                    fullWidth
                    label="Email Address"
                    variant="outlined"
                    name="email"
                    type="email"
                    value={clientInfo.email || ""}
                    onChange={handleClientInfoChange}
                    sx={{ mb: 2 }}
                />
                <TextField
                    fullWidth
                    label="Official Phone Number"
                    variant="outlined"
                    name="mobile"
                    type="tel"
                    value={clientInfo.mobile || ""}
                    onChange={handleClientInfoChange}
                    sx={{ mb: 2 }}
                />
                <TextField
                    fullWidth
                    label="Company Website"
                    variant="outlined"
                    name="website"
                    type="text"
                    value={clientInfo.website || ""}
                    onChange={handleClientInfoChange}
                    sx={{ mb: 2 }}
                />
                <TextField
                    fullWidth
                    label="Company Facebook"
                    variant="outlined"
                    name="companyFacebook"
                    type="url"
                    value={clientInfo.companyFacebook || ""}
                    onChange={handleClientInfoChange}
                    sx={{ mb: 2 }}
                />
                <TextField
                    fullWidth
                    label="Company Twitter"
                    variant="outlined"
                    name="companyTwitter"
                    type="url"
                    value={clientInfo.companyTwitter || ""}
                    onChange={handleClientInfoChange}
                    sx={{ mb: 2 }}
                />
                <TextField
                    fullWidth
                    label="Company Youtube"
                    variant="outlined"
                    name="companyYoutube"
                    type="url"
                    value={clientInfo.companyYoutube || ""}
                    onChange={handleClientInfoChange}
                    sx={{ mb: 2 }}
                />
                <TextField
                    fullWidth
                    label="Company Location"
                    variant="outlined"
                    name="companyLocation"
                    value={clientInfo.companyLocation || ""}
                    onChange={handleClientInfoChange}
                    sx={{ mb: 2 }}
                />
                <Button type="submit" variant="contained" color="primary">
                    Save Client Info
                </Button>
            </form>
        </Box>
    );
}

export default Clientinfo;
