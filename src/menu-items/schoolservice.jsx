// assets
import {
    ContainerOutlined,
    TeamOutlined,
    PlusCircleOutlined,
    ScheduleOutlined
} from '@ant-design/icons';

// icons
const icons = {
    ContainerOutlined,
    TeamOutlined,
    PlusCircleOutlined,
    ScheduleOutlined
};

// ==============================|| MODULE - SCHOOL SERVICES ||============================== //

const schoolServicesModule = {
    id: 'group-school-services',
    title: 'School Services',
    type: 'group',
    children: [
        {
            id: 'services',
            title: 'Services',
            type: 'item',
            url: '/school-services/services',
            icon: icons.ContainerOutlined,
            breadcrumbs: false
        },
        {
            id: 'subjects',
            title: 'Subjects',
            type: 'item',
            url: '/school-services/subjects',
            icon: icons.TeamOutlined,
            breadcrumbs: false
        },
        {
            id: 'teachers',
            title: 'Teachers',
            type: 'item',
            url: '/school-services/teachers',
            icon: icons.TeamOutlined,
            breadcrumbs: false
        },
        {
            id: 'calendar-events',
            title: 'Calendar Events',
            type: 'item',
            url: '/school-services/calendar-events',
            icon: icons.ScheduleOutlined,
            breadcrumbs: false
        }
    ]
};

export default schoolServicesModule;
