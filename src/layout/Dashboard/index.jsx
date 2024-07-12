import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

// material-ui
import useMediaQuery from '@mui/material/useMediaQuery';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';

// project import
import Drawer from './Drawer';
import Header from './Header';
import navigation from 'menu-items';
import Loader from 'components/Loader';
import Breadcrumbs from 'components/@extended/Breadcrumbs';

import { handlerDrawerOpen, useGetMenuMaster } from 'api/menu';
import { ToastContainer } from 'react-toastify';

// ==============================|| MAIN LAYOUT ||============================== //

export default function DashboardLayout() {
  const { menuMasterLoading } = useGetMenuMaster();
  const downXL = useMediaQuery((theme) => theme.breakpoints.down('xl'));

  useEffect(() => {
    handlerDrawerOpen(!downXL);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [downXL]);

  if (menuMasterLoading) return <Loader style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}  />;

  return (
    <Box sx={{ display: 'flex', width: '100%' }} >
      <Header style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }} />
      <Drawer style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }} />
      <Box component="main" sx={{ width: 'calc(100% - 260px)', flexGrow: 1, p: { xs: 2, sm: 3 } }} style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }} >
        <Toolbar style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }} />
        <Breadcrumbs navigation={navigation} title style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}  />
        <Outlet style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}  />
      </Box>
    </Box>
  );
}
