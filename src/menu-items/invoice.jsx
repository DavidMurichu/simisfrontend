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
            id: 'create-arrear',
            title: 'Create Arrear',
            type: 'item',
            url: '/invoices/create-arrear',
            icon: FileAddOutlined,
            breadcrumbs: false
        },
        {
            id: 'fee-structure-admin-charges',
            title: 'Fee Structure Admin Charges',
            type: 'item',
            url: '/invoices/fee-structure-admin-charges',
            icon: DollarOutlined,
            breadcrumbs: false
        },
        {
            id: 'pupil-fee-invoices',
            title: 'Pupil Fee Invoices',
            type: 'item',
            url: '/invoices/pupil-fee-invoices',
            icon: HistoryOutlined,
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
            id: 'pupil-arrears',
            title: 'Pupil Arrears',
            type: 'item',
            url: '/invoices/pupil-arrears',
            icon: FileDoneOutlined,
            breadcrumbs: false
        },
        {
            id: 'pupil-services',
            title: 'Pupil Services',
            type: 'item',
            url: '/invoices/pupil-services',
            icon: ExceptionOutlined,
            breadcrumbs: false
        },
        {
            id: 'services-invoiced',
            title: 'Services Invoiced',
            type: 'item',
            url: '/invoices/services-invoiced',
            icon: FileOutlined,
            breadcrumbs: false
        },
        {
            id: 'bulk-fee-reminder',
            title: 'Bulk Fee Reminder',
            type: 'item',
            url: '/invoices/bulk-fee-reminder',
            icon: DollarOutlined,
            breadcrumbs: false
        },
        {
            id: 'deleted-arrears',
            title: 'Deleted Arrears',
            type: 'item',
            url: '/invoices/deleted-arrears',
            icon: ExceptionOutlined,
            breadcrumbs: false
        },
        // Add more items as needed
    ]
};

export default invoicesModule;
