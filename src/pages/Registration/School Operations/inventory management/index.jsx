import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid';

function InventoryManagement() {
    const [selectedSection, setSelectedSection] = useState('');

    const handleSectionChange = (event) => {
        setSelectedSection(event.target.value);
    };

    return (
        <div>
            <Typography variant="h4" gutterBottom>
                Inventory Management
            </Typography>

            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="h6">Select Section:</Typography>
                    <Select
                        value={selectedSection}
                        onChange={handleSectionChange}
                        fullWidth
                    >
                        <MenuItem value="">Select Section</MenuItem>
                        <MenuItem value="ItemCategories">Item Categories</MenuItem>
                        <MenuItem value="ItemsTitles">Items/Books Titles</MenuItem>
                        <MenuItem value="ItemsRegister">Items/Books Register</MenuItem>
                        <MenuItem value="ViewSearchItems">View And Search Items/Book</MenuItem>
                        <MenuItem value="IssueItems">Issue Item/Book</MenuItem>
                        <MenuItem value="ReturnItems">Return Item/Books</MenuItem>
                    </Select>
                </Grid>
                {/* Render different sections based on selectedSection */}
                {selectedSection && (
                    <Grid item xs={12}>
                        {/* You can render different components or content based on the selectedSection */}
                        <Typography variant="h6">Selected Section: {selectedSection}</Typography>
                        {/* Render respective components/content based on selectedSection */}
                    </Grid>
                )}
            </Grid>
        </div>
    );
}

export default InventoryManagement;
