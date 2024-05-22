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

// ==============================|| MODULE - REGISTRATION ||==============================
const registrationModule = {
    id: 'group-registration',
    title: 'Registration',
    type: 'group',
    children: [
        {
            id: 'student-information',
            title: 'Student Information',
            type: 'item',
            url: '/registration/student-information',
            icon: icons.IdcardOutlined,
            breadcrumbs: false
        },
        {
            id: 'academic-management',
            title: 'Academic Management',
            type: 'item',
            url: '/registration/academic-management',
            icon: icons.ScheduleOutlined,
            breadcrumbs: false
        },
        {
            id: 'school-operations',
            title: 'School Operations',
            type: 'item',
            url: '/registration/school-operations',
            icon: icons.BankOutlined,
            breadcrumbs: false
        }
    ]
};

export default registrationModule;