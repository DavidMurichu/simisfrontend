// assets
import { AppstoreOutlined, UserOutlined, FormOutlined, SearchOutlined, ExportOutlined, ImportOutlined } from '@ant-design/icons';

// icons
const icons = {
    AppstoreOutlined,
    UserOutlined,
    FormOutlined,
    SearchOutlined,
    ExportOutlined,
    ImportOutlined
};

// ==============================|| MENU ITEMS - E-LEARNING ||============================== //

const eLearning = {
    id: 'elearning',
    title: 'E-Learning',
    type: 'group',
    children: [
        {
            id: 'learning-packages',
            title: 'Learning Packages',
            type: 'item',
            url: '/elearning/learning-packages',
            icon: icons.AppstoreOutlined,
            target: false
        },
        {
            id: 'subscribers',
            title: 'Subscribers',
            type: 'item',
            url: '/elearning/subscribers',
            icon: icons.UserOutlined,
            target: false
        },
        {
            id: 'subscribe',
            title: 'Subscribe',
            type: 'item',
            url: '/elearning/subscribe',
            icon: icons.FormOutlined,
            target: false
        },
        {
            id: 'subscriptions',
            title: 'Subscriptions',
            type: 'item',
            url: '/elearning/subscriptions',
            icon: icons.SearchOutlined,
            target: false
        }
    ]
};

export default eLearning;
