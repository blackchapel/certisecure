import { useEffect, useState } from 'react';

// material-ui
import { Grid } from '@mui/material';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const RequestCertificate = () => {
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(false);
    }, []);

    return <div>Request</div>;
};

export default RequestCertificate;
