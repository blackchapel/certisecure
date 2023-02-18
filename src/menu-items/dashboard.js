// assets
import { IconDashboard, IconClipboardPlus } from '@tabler/icons';

// constant
const icons = { IconDashboard, IconClipboardPlus };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
    id: 'dashboard',
    title: 'Dashboard',
    type: 'group',
    children: [
        {
            id: 'default',
            title: 'Certificate Requests',
            type: 'item',
            url: '/dashboard',
            icon: icons.IconDashboard,
            breadcrumbs: false
        }
        // {
        //     id: 'admission',
        //     title: 'Admission Applications',
        //     type: 'item',
        //     url: '/applications',
        //     icon: icons.IconClipboardPlus,
        //     breadcrumbs: false
        // }
    ]
};

export default dashboard;
