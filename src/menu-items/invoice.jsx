import {
    FileAddOutlined,
    DollarOutlined,
    HistoryOutlined,
    AuditOutlined,
    FileDoneOutlined,
    ExceptionOutlined,
    FileOutlined
} from '@ant-design/icons';

const invoicesModule = {
    id: 'group-invoices',
    title: 'Invoices',
    type: 'group',
    children: [
        {
            id: 'arrears-management',
            title: 'Arrears Management',
            type: 'item',
            url: '/invoices/arrears-management',
            icon: FileDoneOutlined,
            breadcrumbs: false
        },
        {
            id: 'administrative-charges',
            title: 'Administrative Charges',
            type: 'item',
            url: '/invoices/administrative-charges',
            icon: AuditOutlined,
            breadcrumbs: false
        },
        {
            id: 'pupil-invoices',
            title: 'Pupil Invoices',
            type: 'item',
            url: '/invoices/pupil-invoices',
            icon: HistoryOutlined,
            breadcrumbs: false
        },
        {
            id: 'services',
            title: 'Services',
            type: 'item',
            url: '/invoices/services',
            icon: FileOutlined,
            breadcrumbs: false
        },
        {
            id: 'notifications-reminders',
            title: 'Notifications/Reminders',
            type: 'item',
            url: '/invoices/notifications-reminders',
            icon: DollarOutlined,
            breadcrumbs: false
        }
    ]
};

export default invoicesModule;
