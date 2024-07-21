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
import AddAdministrativeCharge from "../pages/Invoice/administrative charges/voteheads/addAdministrativeCharge";
import SchoolServiceManagement from "../pages/Registration/School Operations/school service/schoolservice";
import AddSchoolService from "../pages/Registration/School Operations/school service/addSchoolService";
import PupilFinancial from "../pages/Invoice/Pupil Financial";
import NotificationsAndReminder from "../pages/Invoice/Notifications and reminder";
import PupilServiceManagement from "../pages/services/Pupil Service";
import StudentInvoiced from "../pages/services/Service Invoiced";
import AddIndexed from "../pages/services/Service Invoiced/addIndexed";
import DeletedItems from "../pages/Invoice/Deleted Items";
import Incomes from "../pages/Payment/transactions list/transactionList";
import AddIncome from "../pages/Payment/transactions list/addIncome";
import AddExpense from "../pages/Payment/transactions list/addExpense";
import AdminChargesPanel from '../pages/Invoice/administrative charges';
import BulkArearCreation from 'pages/Invoice/invoice management panel/create arrear/bulk_arear';
import AddAdministrativeChargeValue from 'pages/Invoice/administrative charges/voteheadsvalues/addAdministrativeChargeValue';
import AdministrativeChargesManagement from 'pages/Invoice/administrative charges/voteheads';
import AdministrativeChargesValuesManagement from 'pages/Invoice/administrative charges/voteheadsvalues';
import SchoolFeeManagement from 'pages/Invoice/invoice management panel/process schoolfeeinvoice';
import StudentInvoice from 'pages/Invoice/invoice management panel/process schoolfeeinvoice/schoolfeeinvoce';
import DemotePromoteTest from 'pages/Registration/Academic Management/pupil class promotion/demotion/text';
import StudentServiceManagemant from '../pages/services/Pupil Service';
import AddStudentService from 'pages/services/Pupil Service/addService';
import ServicesManagementPanel from 'pages/services';
import BaseTablePanel from 'pages/Payment/base';
import PaymentAccountTypes from 'pages/Payment/base/AccountTypes';
import PaymentSubAccountTypes from 'pages/Payment/base/SubAccountTypes';
import AddSubAccountType from 'pages/Payment/base/SubAccountTypes/add';
import AddAccountType from 'pages/Payment/base/AccountTypes/add';
import PaymentPaymentMode from 'pages/Payment/base/paymentmodes';
import AddPaymentMode from 'pages/Payment/base/paymentmodes/add';
import AddFeePayment from 'pages/Payment/Payments/FeePayment/add';
import FeePaymentsManagementPanel from 'pages/Payment/Payments/FeePayment';
import BanksManagement from 'pages/Payment/base/bank';
import AddBank from 'pages/Payment/base/bank/add';




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
    {path: 'classes/add-class', element: <AddClasses style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }} />},
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
    {path: 'bulk-arrear', element: <BulkArearCreation/>},

    // services 
    
    {path: 'services/service-and-invoices', element: <ServicesManagementPanel/>},
    {path: 'student-services', element: <StudentServiceManagemant/>},
    {path: 'add-student-services', element: <AddStudentService/>},
    {path: 'invoices/services-invoiced', element: <StudentInvoiced/>},


    
    //admin charges routes
    {path: 'invoices/administrative-charges-panel', element: <AdminChargesPanel/>},
    {path: 'invoices/administrative-charge-management', element: <AdministrativeChargesManagement/>},
    {path: 'invoices/administrative-charge-values-management', element: <AdministrativeChargesValuesManagement/>},
    {path: 'add-administrative-charge', element:<AddAdministrativeCharge/>},
    {path: 'add-administrative-charge-value', element:<AddAdministrativeChargeValue/>},
    {path: 'invoices/school-fee-management', element: <SchoolFeeManagement/>},
    {path: 'school-fee-invoice', element: <StudentInvoice/>},

    {path: 'invoices/pupil-financials', element:<PupilFinancial/>},
    {path: 'invoices/notifications-and-reminders', element:<NotificationsAndReminder/>},
    {path: 'invoices/pupil-service', element:<PupilServiceManagement/>},
    {path: 'create-student-invoiced', element: <AddIndexed/>},
    {path: 'invoices/deleted-items', element: <DeletedItems/>},
      // payment routes
    {path:'payment/transaction-lists', element:<Incomes/>},
    {path:'payment/add-income', element:<AddIncome/>},
    {path:'payment/add-expense', element:<AddExpense/>},
    {path:'test', element:<DemotePromoteTest/>},

    // payment base
    
    {path:'payment/base', element:<BaseTablePanel/>},
    
    {path:'payment/account-types', element:<PaymentAccountTypes/>},
    {path:'payment/add-account-type', element:<AddAccountType/>},
    {path:'/payment/sub-account-types', element:<PaymentSubAccountTypes/>},
    {path:'/payment/add-sub-account-types', element:<AddSubAccountType/>},
    {path:'payment/payment-modes', element:<PaymentPaymentMode/>},
    {path:'payment/add-payment-mode', element:<AddPaymentMode/>},
    //fee paymenr
    {path:'/payment/add-fee-payment', element:<AddFeePayment/>},
    {path:'payment/fee-payment', element:<FeePaymentsManagementPanel/>},

    {path:'payment/banks', element:<BanksManagement/>},
    {path:'payment/add-bank', element:<AddBank/>},
    

  ]
};

export default MainRoutes;
