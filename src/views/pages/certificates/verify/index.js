import React from 'react';
import ProtectedRoute from 'routes/ProtectedRoute';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function VerifyCertificate() {
    const navigate = useNavigate();
    const { signature } = useParams();
    const verifyCertificateFn = async () => {
        console.log(signature);
    };
    useEffect(() => {
        verifyCertificateFn();
    }, []);

    return (
        <ProtectedRoute>
            <div>hello</div>
        </ProtectedRoute>
    );
}

export default VerifyCertificate;
