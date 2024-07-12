import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

const FilterTemplate = ({
    filters = [], // Ensure filters is default initialized as an empty array
    filterValues,
    handleFilterChange,
    handleSearch,
    loading = false
}) => {
    return (
        <Box sx={{ mb: 2 }}>
            <Grid container spacing={2} alignItems="center">
                {filters && filters.map((filter) => ( // Check if filters is defined before mapping
                    <Grid item xs={12} md={3} key={filter.label}>
                        {filter.type === 'select' ? (
                            <TextField
                                select
                                label={filter.label}
                                fullWidth
                                value={filterValues[filter.field]}
                                onChange={(e) => handleFilterChange(filter.field, e.target.value)}
                            >
                                {filter.options.map((option) => (
                                    <MenuItem key={option.id} value={option.id}>
                                        {option.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                        ) : (
                            <TextField
                                label={filter.label}
                                type={filter.type}
                                fullWidth
                                InputLabelProps={{ shrink: true }}
                                value={filterValues[filter.field]}
                                onChange={(e) => handleFilterChange(filter.field, e.target.value)}
                            />
                        )}
                    </Grid>
                ))}
                <Grid item xs={12} md={3}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSearch}
                        fullWidth
                     
                        
                       
                    >
                        Search
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
};

export default FilterTemplate;
