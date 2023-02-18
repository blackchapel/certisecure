import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    if (!localStorage.getItem('user') || !(JSON.parse(localStorage.getItem('user')).role === 'INSTITUTION')) {
        console.log(localStorage.getItem('user'));
        return <Navigate to="/login" replace />;
    }
    return children;
};
export default ProtectedRoute;
