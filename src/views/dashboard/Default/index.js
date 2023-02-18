import { useEffect, useState } from 'react';

// material-ui
import { Grid } from '@mui/material';
import ApplCard from './ApplCard';
import { getAllApplications } from 'data/api';
import ApplCardLong from './ApplCardLong';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
    const [isLoading, setLoading] = useState(true);
    const [applications, setApplications] = useState([]);

    const setApplicationsFn = async () => {
        try {
            const response = await getAllApplications(localStorage.getItem('dvkitoken'));
            console.log(response);
            setApplications(response.data);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        setApplicationsFn();
    }, []);

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            <Grid container spacing={2}>
                {applications &&
                    applications.map((application) => (
                        <Grid
                            item
                            xs={12}
                            sx={{
                                cursor: application.isVerified == 'APPROVED' ? 'pointer' : 'default'
                            }}
                        >
                            <ApplCardLong isLoading={isLoading} application={application} />
                        </Grid>
                    ))}
            </Grid>
        </div>
    );
};

export default Dashboard;
