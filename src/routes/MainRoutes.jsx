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
import AddTerm from "../pages/Registration/Academic Management/Academic calendar/Term/addterm";
import Classes from "../pages/Registration/Academic Management/classes";
import AddClasses from "../pages/Registration/Academic Management/classes/addclasses";
import Editclasses from "../pages/Registration/Academic Management/classes/editclasses";
import AcademicCalendar from "../pages/Registration/Academic Management/Academic calendar";
import PupilClassPromotion from "../pages/Registration/Academic Management/pupil class promotion";
import RegistrationAuto from "../pages/Registration/Student Information/registrationauto";
import AddRole from "../pages/Administration/User Management/Auth Branches/addrole";
import EditRole from "../pages/Administration/User Management/Auth Branches/editrole";
import AuthBranches from "../pages/Administration/User Management/Auth Branches";
import AddYear from "../pages/Registration/Academic Management/Academic calendar/Years/addyear";
import AddAcademicYear from "../pages/Registration/Academic Management/Academic calendar/Years/addyear";
import Term from "../pages/Registration/Academic Management/Academic calendar/Term";
import Gender from "../pages/Registration/Academic Management/Gender";
import AddGender from "../pages/Registration/Academic Management/Gender/addGender";
import AddCalendarYear from "../pages/Registration/Academic Management/Academic calendar/Years/calendar/addcalendaryear";
import Addacademicyearterm from "../pages/Registration/Academic Management/Academic calendar/Years/term/addacademicyearterm";
import Promotionterm from "../pages/Registration/Academic Management/pupil class promotion/promotionterm";
import StudentClassTerm from "../pages/Registration/Academic Management/Academic calendar/student class term";
import AddStudentClassTerm
  from "../pages/Registration/Academic Management/Academic calendar/student class term/addclassterm";
import InventoryManagement from "../pages/Registration/School Operations/inventory management";
import SchoolServiceDuration
  from "../pages/Registration/School Operations/school service/school service duration/schoolserviceduration";
import Addschoolserviceduration
  from "../pages/Registration/School Operations/school service/school service duration/addschoolserviceduration";
import TeachersOnDuty from "../pages/Registration/Academic Management/Teachers/teachers on duty";
import Addteachersonduty from "../pages/Registration/Academic Management/Teachers/teachers on duty/addteachersonduty";
import VisitorManagement from "../pages/Registration/School Operations/visitor management";
import VisitorType from "../pages/Registration/School Operations/visitor management/visitor type";
import AddVisitorType from "../pages/Registration/School Operations/visitor management/visitor type/addVisitorType";
import Addvisitor from "../pages/Registration/School Operations/visitor management/addvisitor";
import ClassDailyRecordings from "../pages/Registration/School Operations/class daily recordings";
import AddClassDailyRecordings
  from "../pages/Registration/School Operations/class daily recordings/addclassdailyrecordings";




const Color = Loadable(lazy(() => import('pages/component-overview/color')));
const Typography = Loadable(lazy(() => import('pages/component-overview/typography')));
const Shadow = Loadable(lazy(() => import('pages/component-overview/shadows')));
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard/index')));
const SamplePage = Loadable(lazy(() => import('pages/extra-pages/sample-page')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <Dashboard />,
  children: [
    {path: '/', element: <DashboardDefault />},
    {path: 'color',element: <Color />},
    {path: 'dashboard', element: <DashboardDefault />},
    {path: 'sample-page', element: <SamplePage />},
    {path: 'shadow', element: <Shadow />
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
      path: 'registration/automation',
      element: <RegistrationAuto />
    },
    {
      path: 'registration/academic-management',
      element: <AcademicManagementPanel />
    },
    {path: 'registration/school-operations', element: <SchoolOperationsPanel />},
    {path: 'administration/user-management', element: <UserManagement/>},
    {path: 'administration/system-settings', element: <SystemSettings />},
    {path: 'administration/audit-logs', element: <AuditLogs/>},
    {path: 'finance/income-management', element: <IncomeManagement/>},
    {path: 'finance/expense-management', element: <ExpenseManagement/>},
    {path: 'finance/financial-reports',element: <FinancialReports/>},
    {path: 'user-management/auth-branches', element: <AuthBranches/>},
    {path: 'user-management/add-user', element: <AddUser/>},
    {path: 'user-management/add-role', element: <AddRole/>},
    {path: 'user-management/edit-role/:id', element: <EditRole/>},
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
    {path: 'student-class-term', element: <StudentClassTerm />},
    {path: '/academic-years/add-student-class-term', element: <AddStudentClassTerm/>},
    {path: 'classes', element: <Classes />},
    {path: 'classes/add-class', element: <AddClasses />},
    {path: 'classes/edit-class/:id', element: <Editclasses />},
    {path: 'calendar', element: <AcademicCalendar />},
    {path: 'pupil-class-promotion', element: <PupilClassPromotion />},
    {path: 'promote-student', element: <Promotionterm />},
    {path: 'academic-years/add-terms', element: <AddTerm />},
    {path: '/academic-years/add-academic-years', element: <AddAcademicYear/>},
    {path: '/academic-years/add-calendar-years', element: <AddCalendarYear/>},
    {path: '/academic-years/add-academic-year-term', element: <Addacademicyearterm/>},
    {path: 'gender', element: <Gender/>},
    {path: 'add-gender', element: <AddGender/>},
    {path: 'inventory', element: <InventoryManagement/>},
    {path: 'school-services-durations', element: <SchoolServiceDuration/>},
    {path: 'school-services-durations/add', element: <Addschoolserviceduration/>},
    {path: 'teacher-on-duty', element: <TeachersOnDuty/>},
    {path: 'teacher-on-duty/add', element: <Addteachersonduty/>},
    {path: 'visitor', element: <VisitorManagement/>},
    {path: 'visitor/add-visitor', element: <Addvisitor/>},
    {path: 'visitor-type', element: <VisitorType/>},
    {path: 'visitor-type/add', element: <AddVisitorType/>},
    {path: 'class-daily-recording', element: <ClassDailyRecordings/>},
    {path: 'class-daily-recording/add', element: <AddClassDailyRecordings/>},
  ]
};

export default MainRoutes;
