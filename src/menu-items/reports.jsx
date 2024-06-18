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
import NumberOutlined from '@ant-design/icons/NumberOutlined'
import FileDoneOutlined from '@ant-design/icons/FileDoneOutlined';
import ExceptionOutlined from '@ant-design/icons/ExceptionOutlined';
import DiffOutlined from '@ant-design/icons/DiffOutlined';
import CopyOutlined from '@ant-design/icons/CopyOutlined';
import PieChartOutlined from '@ant-design/icons/PieChartOutlined';
import UploadOutlined from '@ant-design/icons/UploadOutlined';
import UserSwitchOutlined from '@ant-design/icons/UserSwitchOutlined';
import BookOutlined from '@ant-design/icons/BookOutlined';
import ReportOutlined from '@ant-design/icons/UploadOutlined';
import ProfileOutlined from '@ant-design/icons/ProfileOutlined';
import SummaryOutlined from '@ant-design/icons/DiffOutlined';
import FileSearchOutlined from '@ant-design/icons/FileSearchOutlined';
import IdcardOutlined from '@ant-design/icons/IdcardOutlined';

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
    PieChartOutlined,
    UploadOutlined,
    UserSwitchOutlined,
    BookOutlined,
    ReportOutlined,
    ProfileOutlined,
    SummaryOutlined,
    FileSearchOutlined
};

const reportsModule = {
    id: 'group-reports',
    title: 'Reports',
    type: 'group',
    children: [
        {
            id: 'financial-reports',
            title: 'Financial Reports',
            type: 'item',
            url: '/reports/financial-reports',
            icon: icons.FileDoneOutlined,
            breadcrumbs: false
        },
        {
            id: 'pupil-reports',
            title: 'Pupil Reports',
            type: 'item',
            url: '/reports/pupil-reports',
            icon: icons.FileOutlined,
            breadcrumbs: false
        },
        {
            id: 'administrative-reports',
            title: 'Administrative Reports',
            type: 'item',
            url: '/reports/administrative-reports',
            icon: icons.AuditOutlined,
            breadcrumbs: false
        }
    ]
};

export default reportsModule;
