import PropTypes from 'prop-types';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import EditOutlined from '@ant-design/icons/EditOutlined';
import UserOutlined from '@ant-design/icons/UserOutlined';
import LogoutOutlined from '@ant-design/icons/LogoutOutlined';
import { toast, ToastContainer } from 'react-toastify';
import { useAuth } from '../../../../../contexts/AuthContext';
import { logout } from 'services/account';

export default function ProfileTab({ handleLogout }) {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const navigate = useNavigate();
    const { setIsLoggedIn } = useAuth();

    const handleListItemClick = (event, index, path) => {
        setSelectedIndex(index);
        if (path) {
            navigate(path);
        }
    };

    const handleEditProfileClick = (event) => {
        handleListItemClick(event, 0, '/edit-user');
    };

    const handleViewProfileClick = (event) => {
        handleListItemClick(event, 1, '/view-user');
    };

    const handleLogoutClick = async () => {
        try {
            await logout();
            toast.success("You are now logged out");
            setTimeout(async () => {
                setIsLoggedIn(false);
                navigate("/login");
            }, 3000);
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return (
        <List component="nav" sx={{ p: 0, '& .MuiListItemIcon-root': { minWidth: 32 } }}>
            <ToastContainer />
            <ListItemButton selected={selectedIndex === 0} onClick={handleEditProfileClick}>
                <ListItemIcon>
                    <EditOutlined />
                </ListItemIcon>
                <ListItemText primary="Edit Profile" />
            </ListItemButton>
            <ListItemButton selected={selectedIndex === 1} onClick={handleViewProfileClick}>
                <ListItemIcon>
                    <UserOutlined />
                </ListItemIcon>
                <ListItemText primary="View Profile" />
            </ListItemButton>
            <ListItemButton selected={selectedIndex === 2} onClick={handleLogoutClick}>
                <ListItemIcon>
                    <LogoutOutlined />
                </ListItemIcon>
                <ListItemText primary="Logout" />
            </ListItemButton>
        </List>
    );
}

ProfileTab.propTypes = {
    handleLogout: PropTypes.func.isRequired,
};
