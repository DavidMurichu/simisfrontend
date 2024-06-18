import {
    FileAddOutlined,
    DollarOutlined,
    HistoryOutlined,
    AuditOutlined,
    FileDoneOutlined,
    ExceptionOutlined,
    FileOutlined,
    BellOutlined,
    DeleteOutlined,
    AppstoreOutlined
} from '@ant-design/icons';

const invoicesModule = {
    id: 'group-invoices',
    title: 'Invoices',
    type: 'group',
    children: [
        {
            id: 'invoice-creation-and-management',
            title: 'Invoice Creation and Management',
            type: 'item',
            url: '/invoices/invoice-creation-and-management',
            icon: FileAddOutlined,
            breadcrumbs: false
        },
        {
            id: 'administrative-charges',
            title: 'Administrative Charges',
            type: 'item',
            url: '/invoices/administrative-charges',
            icon: DollarOutlined,
            breadcrumbs: false
        },
        {
            id: 'pupil-financials',
            title: 'Pupil Financials',
            type: 'item',
            url: '/invoices/pupil-financials',
            icon: HistoryOutlined,
            breadcrumbs: false
        },
        {
            id: 'notifications-and-reminders',
            title: 'Notifications and Reminders',
            type: 'item',
            url: '/invoices/notifications-and-reminders',
            icon: BellOutlined,
            breadcrumbs: false
        },
        {
            id: 'deleted-items',
            title: 'Deleted Items',
            type: 'item',
            url: '/invoices/deleted-items',
            icon: DeleteOutlined,
            breadcrumbs: false
        }
    ]
};

export default invoicesModule;
