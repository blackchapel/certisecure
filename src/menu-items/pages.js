// assets
import { IconCirclePlus, IconLoader, IconEye } from '@tabler/icons';
// constant
const icons = {
    IconCirclePlus,
    IconLoader,
    IconEye
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
    id: 'pages',
    title: 'Graduation Certificate',
    caption: 'Securely Access and Submit your Graduation Certificate',
    type: 'group',
    children: [
        {
            id: 'request',
            title: 'Issue a Certificate',
            type: 'item',
            icon: icons.IconCirclePlus,
            url: '/certificate/request'
        },
        {
            id: 'status',
            title: 'Status of Certificates',
            type: 'item',
            icon: icons.IconLoader,
            url: '/certificate/status'
        },
        {
            id: 'view',
            title: 'View All Certificates',
            type: 'item',
            icon: icons.IconEye,
            url: '/certificate/status'
        }
    ]
};

export default pages;
