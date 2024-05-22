// assets
import MobilePaymentIcon from '@mui/icons-material/PhoneAndroid';
import BankIcon from '@mui/icons-material/AccountBalance';

// icons
const paymentIcons = {
    MobilePaymentIcon,
    BankIcon,
};

// ==============================|| MODULE - PAYMENT ||==============================
const paymentModule = {
    id: 'payment',
    title: 'Payment',
    type: 'group',
    children: [
        {
            id: 'mpesa',
            title: 'M-Pesa',
            type: 'item',
            url: '/payment/mpesa',
            icon: paymentIcons.MobilePaymentIcon,
            breadcrumbs: false
        },
        {
            id: 'bank',
            title: 'Bank Transfer',
            type: 'item',
            url: '/payment/bank-transfer',
            icon: paymentIcons.BankIcon,
            breadcrumbs: false
        },
    ]
};

export default paymentModule;
