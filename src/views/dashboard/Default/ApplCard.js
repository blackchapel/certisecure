import PropTypes from 'prop-types';
import { useState } from 'react';

// material-ui
import { styled, useTheme } from '@mui/material/styles';
import { Avatar, Box, Grid, Menu, MenuItem, Typography } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SkeletonEarningCard from 'ui-component/cards/Skeleton/EarningCard';

// assets
import EarningIcon from 'assets/images/icons/earning.svg';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import GetAppTwoToneIcon from '@mui/icons-material/GetAppOutlined';
import FileCopyTwoToneIcon from '@mui/icons-material/FileCopyOutlined';
import PictureAsPdfTwoToneIcon from '@mui/icons-material/PictureAsPdfOutlined';
import ArchiveTwoToneIcon from '@mui/icons-material/ArchiveOutlined';
import { QRCodeSVG } from 'qrcode.react';
// ===========================|| DASHBOARD DEFAULT - EARNING CARD ||=========================== //

const clientUrl = 'http://www.localhost:3000';
const ApplCard = ({ isLoading, application }) => {
    const theme = useTheme();

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const CardWrapper = styled(MainCard)(({ theme }) => ({
        // backgroundColor: theme.palette.secondary.dark,
        // color: '#fff',
        overflow: 'scroll',

        height: {
            xs: '100%',
            sm: '100%',
            md: '50%',
            lg: '50%'
        },
        width: {
            xs: '100%',
            sm: '100%',
            md: '90%',
            lg: '90%'
        },
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
        // '&:after': {
        //     content: '""',
        //     position: 'absolute',
        //     width: 210,
        //     height: 210,
        //     background: theme.palette.secondary[800],
        //     borderRadius: '50%',
        //     top: -85,
        //     right: -95,
        //     [theme.breakpoints.down('sm')]: {
        //         top: -105,
        //         right: -140
        //     }
        // },
        // '&:before': {
        //     content: '""',
        //     position: 'absolute',
        //     width: 210,
        //     height: 210,
        //     background: theme.palette.secondary[800],
        //     borderRadius: '50%',
        //     top: -125,
        //     right: -15,
        //     opacity: 0.5,
        //     [theme.breakpoints.down('sm')]: {
        //         top: -155,
        //         right: -70
        //     }
        // }
    }));

    return (
        <>
            {isLoading ? (
                <SkeletonEarningCard />
            ) : (
                <CardWrapper border={false} content={false}>
                    <Box sx={{ p: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Grid container direction="column" justifyContent={'center'} alignItems={'center'}>
                            <Grid
                                item
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                            >
                                <Grid container alignItems="center" justifyContent={'center'}>
                                    <Grid item xs={12}>
                                        <Typography
                                            sx={{
                                                fontSize: '1rem',
                                                marginBottom: '0.5rem'
                                            }}
                                            align="center"
                                            fontWeight={'bold'}
                                        >
                                            Scan to Verify
                                        </Typography>
                                    </Grid>
                                    <Grid
                                        item
                                        xs={12}
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }}
                                    >
                                        <QRCodeSVG value={`${clientUrl}/verify/${application && application.signature}`} size={250} />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item sx={{ my: 1.25 }}>
                                <Typography
                                    sx={{
                                        fontSize: '1rem',
                                        marginTop: '0.5rem'
                                    }}
                                    align="center"
                                    fontWeight={'bold'}
                                >
                                    Serial Number
                                </Typography>
                                <Typography
                                    sx={{
                                        fontSize: '1.5rem'
                                    }}
                                    align="center"
                                    textAlign={'center'}
                                >
                                    {application && application.signature ? application.signature : 'sgsdkjh545dsfsfd'}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Box>
                </CardWrapper>
            )}
        </>
    );
};

ApplCard.propTypes = {
    isLoading: PropTypes.bool
};

export default ApplCard;
