// assets
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
    CopyOutlined
};

const financeModule = {
    id: 'group-finance',
    title: 'Finance',
    type: 'group',
    children: [
        {
            id: 'income-management',
            title: 'Income Management',
            type: 'item',
            url: '/finance/income-management',
            icon: icons.DollarOutlined,
            breadcrumbs: false
        },
        {
            id: 'expense-management',
            title: 'Expense Management',
            type: 'item',
            url: '/finance/expense-management',
            icon: icons.HistoryOutlined,
            breadcrumbs: false
        },
        {
            id: 'financial-reports',
            title: 'Financial Reports',
            type: 'item',
            url: '/finance/financial-reports',
            icon: icons.FileDoneOutlined,
            breadcrumbs: false
        }
    ]
};
export default financeModule;