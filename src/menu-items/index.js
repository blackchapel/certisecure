import dashboard from './dashboard';
import pages from './pages';
import utilities from './utilities';
import other from './other';

// ==============================|| MENU ITEMS ||============================== //

const menuItemsUser = {
    items: [pages]
};

const menuItemsOrg = {
    items: [dashboard]
};

const user = JSON.parse(localStorage.getItem('user'));
const menuItems = user && user.role == 'STUDENT' ? menuItemsUser : menuItemsOrg;

export default menuItems;
