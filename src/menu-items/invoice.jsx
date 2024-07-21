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
    AppstoreOutlined,
    SolutionOutlined
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
            url: '/invoices/administrative-charges-panel',
            icon: DollarOutlined,
            breadcrumbs: false
        },
       
        {
            id: 'Services-management',
            title: 'Services and Invoices',
            type: 'item',
            url: '/services/service-and-invoices',
            icon: SolutionOutlined,
            breadcrumbs: false
        },
        {
            id: 'Bulk-Fee-Reminder',
            title: 'Bulk Fee Reminder',
            type: 'item',
            url: '',
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
