import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import Dashboard from 'layout/Dashboard';
import StudentInformation from "../pages/Registration/Student Information/Pupils";
import AddPupil from "../pages/Registration/Student Information/add-pupil";
import ViewPupil from "../pages/Registration/Student Information/view-pupil";
import EditPupil from "../pages/Registration/Student Information/edit-pupil";
import AcademicManagementPanel from "../pages/Registration/Academic Management";
import SchoolOperationsPanel from "../pages/Registration/School Operations";
import Xi9d from "../pages/extra-pages/xi9d";
import UserManagement from "../pages/Administration/User Management";
import SystemSettings from "../pages/Administration/System Settings";
import AuditLogs from "../pages/Administration/Audit Logs";
import IncomeManagement from "../pages/Finance/Income Management";
import ExpenseManagement from "../pages/Finance/Expense Management";
import FinancialReports from "../pages/Finance/Financial Reports";
import AddUser from "../pages/Administration/User Management/add-user";
import EditUser from "../pages/Administration/User Management/edit-user";
import ViewUser from "../pages/Administration/User Management/view-user";
import Subjects from "../pages/Registration/Academic Management/subjects";
import AddSubject from "../pages/Registration/Academic Management/subjects/addsubject";
import EditSubject from "../pages/Registration/Academic Management/subjects/editsubject";
import Teachers from "../pages/Registration/Academic Management/Teachers";
import AddTeachers from "../pages/Registration/Academic Management/Teachers/addteachers";
import EditTeachers from "../pages/Registration/Academic Management/Teachers/editteachers";



const Color = Loadable(lazy(() => import('pages/component-overview/color')));
const Typography = Loadable(lazy(() => import('pages/component-overview/typography')));
const Shadow = Loadable(lazy(() => import('pages/component-overview/shadows')));
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard/index')));

// render - sample page
const SamplePage = Loadable(lazy(() => import('pages/extra-pages/sample-page')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <Dashboard />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: 'color',
      element: <Color />
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <DashboardDefault />
        }
      ]
    },
    {
      path: 'sample-page',
      element: <SamplePage />
    },
    {
      path: 'shadow',
      element: <Shadow />
    },
    {
      path: '/view-user',
      element: <ViewUser/>
    },
    {
      path: '/edit-user',
      element: <EditUser />
    },
    {
      path: 'typography',
      element: <Typography />
    },
    {
      path: 'registration/student-information',
      element: <StudentInformation />
    },
    {
      path: 'registration/academic-management',
      element: <AcademicManagementPanel />
    },
    {
      path: 'registration/school-operations',
      element: <SchoolOperationsPanel />
    },
    {
      path: 'administration/user-management',
      element: <UserManagement/>
    },

    {
      path: 'administration/system-settings',
      element: <SystemSettings />
    },
    {path: 'administration/audit-logs', element: <AuditLogs/>},
    {path: 'finance/income-management', element: <IncomeManagement/>},
    {path: 'finance/expense-management', element: <ExpenseManagement/>},
    {path: 'finance/financial-reports',element: <FinancialReports/>},
    {path: 'user-management/add-user', element: <AddUser/>},
    {path: 'xi9d',element: <Xi9d />},
    { path: 'registration/add-pupil', element: <AddPupil /> },
    { path: 'registration/view-pupil/:id', element: <ViewPupil /> },
    { path: 'registration/edit-pupil/:id', element: <EditPupil /> },
    {path: 'user-management/edit/:id', element: <EditUser /> },
    {path: 'subjects', element: <Subjects /> },
    {path: 'subject-management/add-subject', element: <AddSubject /> },
    {path: 'subject-management/edit-subject/:id', element: <EditSubject /> },
    {path: 'teachers', element: <Teachers /> },
    {path: '/add-teacher', element: <AddTeachers /> },
    {path: '/edit-teacher/:id', element: <EditTeachers />},
  ]
};

export default MainRoutes;
