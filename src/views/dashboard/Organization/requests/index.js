import { useEffect, useState } from 'react';

// material-ui
import { Grid } from '@mui/material';

// project imports
import EarningCard from './ApplCard';
import PopularCard from '../PopularCard';
import TotalOrderLineChartCard from '../TotalOrderLineChartCard';
import TotalIncomeDarkCard from '../TotalIncomeDarkCard';
import TotalIncomeLightCard from '../TotalIncomeLightCard';
import TotalGrowthBarChart from '../TotalGrowthBarChart';
import { gridSpacing } from 'store/constant';
import { getAllApplications, sendRequest } from 'data/api';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const OrganizationRequests = () => {
    const [isLoading, setLoading] = useState(true);
    const [applications, setApplications] = useState([]);
    const [reload, setReload] = useState(false);
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
        setLoading(false);
    }, [reload]);

    return (
        <Grid container spacing={gridSpacing}>
            {applications &&
                applications.map(
                    (application) =>
                        application.isVerified == 'PENDING' && (
                            <Grid item lg={4} md={6} sm={6} xs={12} key={application._id}>
                                <EarningCard isLoading={isLoading} application={application} reload={reload} setReload={setReload} />
                            </Grid>
                        )
                )}
            {/* <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item lg={4} md={6} sm={6} xs={12}>
                        <EarningCard isLoading={isLoading} />
                    </Grid>
                    <Grid item lg={4} md={6} sm={6} xs={12}>
                        <TotalOrderLineChartCard isLoading={isLoading} />
                    </Grid>
                    <Grid item lg={4} md={12} sm={12} xs={12}>
                        <Grid container spacing={gridSpacing}>
                            <Grid item sm={6} xs={12} md={6} lg={12}>
                                <TotalIncomeDarkCard isLoading={isLoading} />
                            </Grid>
                            <Grid item sm={6} xs={12} md={6} lg={12}>
                                <TotalIncomeLightCard isLoading={isLoading} />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid> */}
            {/* <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12} md={8}>
                        <TotalGrowthBarChart isLoading={isLoading} />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <PopularCard isLoading={isLoading} />
                    </Grid>
                </Grid>
            </Grid> */}
        </Grid>
    );
};

export default OrganizationRequests;
