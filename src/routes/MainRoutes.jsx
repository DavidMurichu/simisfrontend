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
import PupilClassPromotion from "../pages/Registration/Academic Management/pupil class promotion/promotion";
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
import Promotionterm from "../pages/Registration/Academic Management/pupil class promotion/promotion/promotionterm";
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
import Demotepromote from "../pages/Registration/Academic Management/pupil class promotion/demotion/demotepromote";
import Demoteview from "../pages/Registration/Academic Management/pupil class promotion/demotion/demoteview";
import PupilReporting
  from "../pages/Registration/Academic Management/pupil class promotion/student reporting/pupilreporting";
import ReportedPupils
  from "../pages/Registration/Academic Management/pupil class promotion/student reporting/reportedpupils";
import InvoiceManagementPanel from "../pages/Invoice/invoice management panel";
import ArrearManagement from "../pages/Invoice/invoice management panel/create arrear/createarrear";
import AddArrear from "../pages/Invoice/invoice management panel/create arrear/addarrear";
import AdministrativeCharges from "../pages/Invoice/administrative charges";
import AddAdministrativeCharge from "../pages/Invoice/administrative charges/addAdministrativeCharge";
import SchoolServiceManagement from "../pages/Registration/School Operations/school service/schoolservice";
import AddSchoolService from "../pages/Registration/School Operations/school service/addSchoolService";
import PupilFinancial from "../pages/Invoice/Pupil Financial";
import NotificationsAndReminder from "../pages/Invoice/Notifications and reminder";
import PupilServiceManagement from "../pages/Invoice/invoice management panel/Pupil Service";
import StudentInvoiced from "../pages/Invoice/invoice management panel/Student Invoiced";
import AddIndexed from "../pages/Invoice/invoice management panel/Student Invoiced/addIndexed";
import DeletedItems from "../pages/Invoice/Deleted Items";
import Incomes from "../pages/Payment/transactions list/transactionList";
import AddIncome from "../pages/Payment/transactions list/addIncome";
import AddExpense from "../pages/Payment/transactions list/addExpense";




const Color = Loadable(lazy(() => import('pages/component-overview/color')));
const Typography = Loadable(lazy(() => import('pages/component-overview/typography')));
const Shadow = Loadable(lazy(() => import('pages/component-overview/shadows')));
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard/index')));
const SamplePage = Loadable(lazy(() => import('pages/extra-pages/sample-page')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <Dashboard style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }} />,
  children: [
    {path: '/', element: <DashboardDefault style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }} />},
    {path: 'color',element: <Color style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }} />},
    {path: 'dashboard', element: <DashboardDefault style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }} />},
    {path: 'sample-page', element: <SamplePage style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }} />},
    {path: 'shadow', element: <Shadow style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }} />
    },
    {
      path: '/view-user',
      element: <ViewUser style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }} />
    },
    {
      path: '/edit-user',
      element: <EditUser style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }} />
    },
    {
      path: 'typography',
      element: <Typography style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }} />
    },
    {
      path: 'registration/student-information',
      element: <StudentInformation style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }} />
    },
    {
      path: 'registration/automation',
      element: <RegistrationAuto style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }} />
    },
    {
      path: 'registration/academic-management',
      element: <AcademicManagementPanel style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }} />
    },
    {path: 'registration/school-operations', element: <SchoolOperationsPanel style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }} />},
    {path: 'administration/user-management', element: <UserManagement style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }} />},
    {path: 'administration/system-settings', element: <SystemSettings style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }} />},
    {path: 'administration/audit-logs', element: <AuditLogs style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }} />},
    {path: 'finance/income-management', element: <IncomeManagement style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }} />},
    {path: 'finance/expense-management', element: <ExpenseManagement style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }} />},
    {path: 'finance/financial-reports',element: <FinancialReports style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }} />},
    {path: 'user-management/auth-branches', element: <AuthBranches style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }} />},
    {path: 'user-management/add-user', element: <AddUser style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }} />},
    {path: 'user-management/add-role', element: <AddRole style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }} />},
    {path: 'user-management/edit-role/:id', element: <EditRole style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }} />},
    {path: 'xi9d',element: <Xi9d />},
    { path: 'registration/add-pupil', element: <AddPupil style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }} /> },
    { path: 'registration/view-pupil/:id', element: <ViewPupil style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }} /> },
    { path: 'registration/edit-pupil/:id', element: <EditPupil style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }} /> },
    {path: 'user-management/edit/:id', element: <EditUser style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }} /> },
    {path: 'subjects', element: <Subjects /> },
    {path: 'subject-management/add-subject', element: <AddSubject style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }} /> },
    {path: 'subject-management/edit-subject/:id', element: <EditSubject style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }} /> },
    {path: 'teachers', element: <Teachers style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }} /> },
    {path: '/add-teacher', element: <AddTeachers style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }} /> },
    {path: '/edit-teacher/:id', element: <EditTeachers style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }} />},
    {path: 'student-class-term', element: <StudentClassTerm style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }} />},
    {path: '/academic-years/add-student-class-term', element: <AddStudentClassTerm style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }} />},
    {path: 'classes', element: <Classes style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }} />},
    {path: 'classes/edit-class/:id', element: <Editclasses style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }} />},
    {path: 'calendar', element: <AcademicCalendar style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }} />},
    {path: 'pupil-class-promotion', element: <PupilClassPromotion style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }} />},
    {path: 'pupil-class-demotion', element: <Demoteview style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }} />},
    {path: 'pupil-class-reporting', element: <ReportedPupils style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }} />},
    {path: 'promote-student', element: <Promotionterm style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }} />},
    {path: 'demote-student', element: <Demotepromote style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }} />},
    {path: 'report-student', element: <PupilReporting style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }} />},
    {path: 'academic-years/add-terms', element: <AddTerm style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }} />},
    {path: '/academic-years/add-academic-years', element: <AddAcademicYear style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }} />},
    {path: '/academic-years/add-calendar-years', element: <AddCalendarYear style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }} />},
    {path: '/academic-years/add-academic-year-term', element: <Addacademicyearterm style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }} />},
    {path: 'gender', element: <Gender style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }} />},
    {path: 'add-gender', element: <AddGender style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }} />},
    {path: 'inventory', element: <InventoryManagement style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }} />},
    {path: 'school-services-durations', element: <SchoolServiceDuration style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }} />},
    {path: 'school-services-durations/add', element: <Addschoolserviceduration style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }} />},
    {path: 'teacher-on-duty', element: <TeachersOnDuty style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }} />},
    {path: 'teacher-on-duty/add', element: <Addteachersonduty style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }} />},
    {path: 'visitor', element: <VisitorManagement style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }} />},
    {path: 'visitor/add-visitor', element: <Addvisitor style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }} />},
    {path: 'visitor-type', element: <VisitorType style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }} />},
    {path: 'visitor-type/add', element: <AddVisitorType style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }} />},
    {path: 'class-daily-recording', element: <ClassDailyRecordings style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }} />},
    {path: 'class-daily-recording/add', element: <AddClassDailyRecordings style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }} />},
    {path: 'school-services', element: <SchoolServiceManagement style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }} />},
    {path: 'add-school-service', element: <AddSchoolService style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }} />},
      //invoices routes
    {path: 'invoices/invoice-creation-and-management', element: <InvoiceManagementPanel style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }} />},
    {path: 'invoices/create-arrear', element: <ArrearManagement/>},
    {path: 'add-arrear', element: <AddArrear/>},
    {path: 'invoices/create-arrear', element: <ArrearManagement/>},
    {path: 'invoices/administrative-charges', element: <AdministrativeCharges/>},
    {path: 'add-administrative-charge', element:<AddAdministrativeCharge/>},
    {path: 'invoices/pupil-financials', element:<PupilFinancial/>},
    {path: 'invoices/notifications-and-reminders', element:<NotificationsAndReminder/>},
    {path: 'invoices/pupil-service', element:<PupilServiceManagement/>},
    {path: 'invoices/services-invoiced', element: <StudentInvoiced/>},
    {path: 'create-student-invoiced', element: <AddIndexed/>},
    {path: 'invoices/deleted-items', element: <DeletedItems/>},
      // payment routes
    {path:'payment/transaction-lists', element:<Incomes/>},
    {path:'payment/add-income', element:<AddIncome/>},
    {path:'payment/add-expense', element:<AddExpense/>}
  ]
};

export default MainRoutes;
