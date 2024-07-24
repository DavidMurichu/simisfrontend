import MobilePaymentIcon from '@mui/icons-material/PhoneAndroid';
import BankIcon from '@mui/icons-material/AccountBalance';
import ListAltIcon from '@mui/icons-material/ListAlt';
import EditIcon from '@mui/icons-material/Edit';
import PaymentIcon from '@mui/icons-material/Payment';
import CompareIcon from '@mui/icons-material/Compare';
import GridOnIcon from '@mui/icons-material/GridOn';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';

// icons
const paymentIcons = {
    MobilePaymentIcon,
    BankIcon,
    ListAltIcon,
    EditIcon,
    PaymentIcon,
    CompareIcon
};

// ==============================|| MODULE - PAYMENT ||==============================
const paymentModule = {
    id: 'payment',
    title: 'Payment',
    type: 'group',
    children: [
        {
            id: 'transaction-lists',
            title: 'Transaction Lists',
            type: 'item',
            url: '/payment/transaction-lists',
            icon: paymentIcons.ListAltIcon,
            breadcrumbs: false
        },
        {
            id: 'transactions',
            title: 'Transactions',
            type: 'item',
            url: '/payment/transactions',
            icon: paymentIcons.PaymentIcon,
            breadcrumbs: false
        },
        {
            id: 'transaction-management',
            title: 'Transaction Management',
            type: 'item',
            url: '/payment/transaction-management',
            icon: paymentIcons.EditIcon,
            breadcrumbs: false
        },
        {
            id: 'comparison',
            title: 'Comparison',
            type: 'item',
            url: '/payment/comparison',
            icon: paymentIcons.CompareIcon,
            breadcrumbs: false
        },
        {
            id: 'fee-payment',
            title: 'fee-payment',
            type: 'item',
            url: '/payment/fee-payment',
            icon: paymentIcons.ListAltIcon,
            breadcrumbs: false
        },
        {
            id: 'base',
            title: 'Base Tables',
            type: 'item',
            url: '/payment/base',
            icon: GridOnIcon,
            breadcrumbs: false
        }
        ,
        {
            id: 'incomeinvoicecomparison',
            title: 'Income Invoice comparison',
            type: 'item',
            url: '/payment/income-invoice-comparison',
            icon: CompareArrowsIcon,
            breadcrumbs: false
        }
    ]
};

export default paymentModule;
