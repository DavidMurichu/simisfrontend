import BankOutlined from '@ant-design/icons/BankOutlined';
import TeamOutlined from '@ant-design/icons/TeamOutlined';
import StarOutlined from '@ant-design/icons/StarOutlined';
import ScheduleOutlined from '@ant-design/icons/ScheduleOutlined';
import FileOutlined from '@ant-design/icons/FileOutlined';
import CalendarOutlined from '@ant-design/icons/CalendarOutlined';
import AuditOutlined from '@ant-design/icons/AuditOutlined';
import OrderedListOutlined from '@ant-design/icons/OrderedListOutlined';
import ContainerOutlined from '@ant-design/icons/ContainerOutlined';
import PlusCircleOutlined from '@ant-design/icons/PlusCircleOutlined';
import DollarOutlined from '@ant-design/icons/DollarOutlined';
import HistoryOutlined from '@ant-design/icons/HistoryOutlined';
import SolutionOutlined from '@ant-design/icons/SolutionOutlined';
import NumberOutlined from '@ant-design/icons/NumberOutlined';
import IdcardOutlined from '@ant-design/icons/IdcardOutlined';
import FileDoneOutlined from '@ant-design/icons/FileDoneOutlined';
import ExceptionOutlined from '@ant-design/icons/ExceptionOutlined';
import DiffOutlined from '@ant-design/icons/DiffOutlined';
import CopyOutlined from '@ant-design/icons/CopyOutlined';
import MailOutlined from '@ant-design/icons/MailOutlined';
import ContactsOutlined from '@ant-design/icons/ContactsOutlined';
import ContactsFilled from '@ant-design/icons/ContactsFilled';
import FileTextOutlined from '@ant-design/icons/FileTextOutlined';
import WalletOutlined from '@ant-design/icons/WalletOutlined';
import FileProtectOutlined from '@ant-design/icons/FileProtectOutlined';
import FileSearchOutlined from '@ant-design/icons/FileSearchOutlined';
import BlockOutlined from '@ant-design/icons/BlockOutlined';
import BookOutlined from '@ant-design/icons/BookOutlined';
import AppstoreOutlined from '@ant-design/icons/AppstoreOutlined';

// icons
const icons = {
    BankOutlined,
    TeamOutlined,
    StarOutlined,
    ScheduleOutlined,
    FileOutlined,
    CalendarOutlined,
    AuditOutlined,
    OrderedListOutlined,
    ContainerOutlined,
    PlusCircleOutlined,
    DollarOutlined,
    HistoryOutlined,
    SolutionOutlined,
    NumberOutlined,
    IdcardOutlined,
    FileDoneOutlined,
    ExceptionOutlined,
    DiffOutlined,
    CopyOutlined,
    MailOutlined,
    ContactsOutlined,
    ContactsFilled,
    FileTextOutlined,
    WalletOutlined,
    FileProtectOutlined,
    FileSearchOutlined,
    BlockOutlined,
    BookOutlined,
    AppstoreOutlined
};

const smsModule = {
    id: 'group-sms',
    title: 'SMS',
    type: 'group',
    children: [
        {
            id: 'messaging',
            title: 'Messaging',
            type: 'item',
            url: '/sms/messaging',
            icon: icons.MailOutlined,
            breadcrumbs: false
        },
        {
            id: 'contacts-management',
            title: 'Contacts Management',
            type: 'item',
            url: '/sms/contacts-management',
            icon: icons.ContactsOutlined,
            breadcrumbs: false
        },
        {
            id: 'billing-and-payments',
            title: 'Billing and Payments',
            type: 'item',
            url: '/sms/billing-and-payments',
            icon: icons.DollarOutlined,
            breadcrumbs: false
        },
        {
            id: 'transactions',
            title: 'Transactions',
            type: 'item',
            url: '/sms/transactions',
            icon: icons.HistoryOutlined,
            breadcrumbs: false
        },
        {
            id: 'blacklist-management',
            title: 'Blacklist Management',
            type: 'item',
            url: '/sms/blacklist-management',
            icon: icons.BlockOutlined,
            breadcrumbs: false
        },
        {
            id: 'sms-configuration',
            title: 'SMS Configuration',
            type: 'item',
            url: '/sms/sms-configuration',
            icon: icons.AppstoreOutlined,
            breadcrumbs: false
        }
    ]
};

export default smsModule;
