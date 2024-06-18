import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import NavGroup from './NavGroup';
import menuItems from 'menu-items';

export default function Navigation() {

    const navGroups = menuItems.items.map((item) => {
        switch (item.type) {
            case 'group':
                return <NavGroup key={item.id} item={item} level={1} />;
            default:

                return (
                    <Typography key={item.id} variant="h6" color="error" >
                        Navigation Error: Unexpected item type
                    </Typography>
                );
        }
    });

    return (
        <Box sx={{ paddingTop: 2 }}>
            {navGroups}
        </Box>
    );
}
