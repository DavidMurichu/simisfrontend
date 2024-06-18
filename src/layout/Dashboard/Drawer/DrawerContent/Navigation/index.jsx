// material-ui
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// project import
import NavGroup from './NavGroup';
import menuItem from 'menu-items';

// ==============================|| DRAWER CONTENT - NAVIGATION ||============================== //

export default function Navigation() {
  const navGroups = menuItem.items.map((item) => {
    switch (item.type) {
      case 'group':
        return <NavGroup key={item.id} item={item} style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }} />;
      default:
        return (
          <Typography key={item.id} variant="h6" color="error" align="center" style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }} >
            Fix - Navigation Group
          </Typography>
        );
    }
  });

  return <Box sx={{ pt: 2 }} style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }} >{navGroups}</Box>;
}
