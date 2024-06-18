// material-ui
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// project import
import MainCard from 'components/MainCard';
import AnalyticEcommerce from 'components/cards/statistics/AnalyticEcommerce';
import MonthlyBarChart from './MonthlyBarChart';
import ReportAreaChart from './ReportAreaChart';
import UniqueVisitorCard from './UniqueVisitorCard';
import SaleReportCard from './SaleReportCard';
import OrdersTable from './OrdersTable';
import { GeneralJournalReport, UpcomingEvents } from './info';
import StudentPopulationPieChart from './studentpopulationpiechart';
import ArrearsPaidPieChart from './arrearspaidchart'; // Adjust the path as necessary

// assets
import GiftOutlined from '@ant-design/icons/GiftOutlined';
import MessageOutlined from '@ant-design/icons/MessageOutlined';
import SettingOutlined from '@ant-design/icons/SettingOutlined';
import avatar1 from 'assets/images/users/avatar-1.png';
import avatar2 from 'assets/images/users/avatar-2.png';
import avatar3 from 'assets/images/users/avatar-3.png';
import avatar4 from 'assets/images/users/avatar-4.png';

// avatar style
const avatarSX = {
    width: 36,
    height: 36,
    fontSize: '1rem'
};

// action style
const actionSX = {
    mt: 0.75,
    ml: 1,
    top: 'auto',
    right: 'auto',
    alignSelf: 'flex-start',
    transform: 'none'
};

// ==============================|| DASHBOARD - DEFAULT ||============================== //

export default function DashboardDefault() {
    return (
        <Grid container spacing={2.75}>
            {/* row 1 */}
            <Grid item xs={12} sm={6} md={4} lg={2.25}>
                <AnalyticEcommerce title="Sms Balance" count="Ksh 4,710" percentage={59.3} />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={2.25}>
                <AnalyticEcommerce title="Todays Payment" count="Ksh 8,250" percentage={70.5} extra="8,900" />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={2.25}>
                <AnalyticEcommerce title="This months arrears" count="Ksh 18,800" percentage={27.4} isLoss color="warning" extra="1,943" />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={2.25}>
                <AnalyticEcommerce title="Total Expenses" count="Ksh 35,078" percentage={27.4} isLoss color="warning" extra="$20,395" />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={2.25}>
                <AnalyticEcommerce title="Payment This month" count="Ksh 35,078" percentage={27.4} isLoss color="warning" extra="$20,395" />
            </Grid>

            {/* row 2 */}
            <Grid item xs={12} md={5} lg={4}>
                <StudentPopulationPieChart />
            </Grid>
            <Grid item xs={12} md={5} lg={4}>
                <UniqueVisitorCard />
            </Grid>
            <Grid item xs={12} md={5} lg={4}>
                <ArrearsPaidPieChart />
            </Grid>

            {/* row 3 */}
            <GeneralJournalReport />
            <UpcomingEvents />
        </Grid>
    );
}
