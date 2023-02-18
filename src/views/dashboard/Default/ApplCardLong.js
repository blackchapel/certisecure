import PropTypes from 'prop-types';
import { useState } from 'react';
// material-ui
import { useTheme, styled } from '@mui/material/styles';
import { Avatar, Box, Dialog, List, ListItem, ListItemAvatar, ListItemText, Tooltip, Typography } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
// project imports
import MainCard from 'ui-component/cards/MainCard';
import TotalIncomeCard from 'ui-component/cards/Skeleton/TotalIncomeCard';

// assets
import StorefrontTwoToneIcon from '@mui/icons-material/StorefrontTwoTone';
import AnimateButton from 'ui-component/extended/AnimateButton';
import ApplCard from './ApplCard';

// ==============================|| DASHBOARD - TOTAL INCOME LIGHT CARD ||============================== //

const ApplCardLong = ({ isLoading, application }) => {
    const theme = useTheme();
    const [status, setStatus] = useState(application?.isVerified);
    const [open, setOpen] = useState(false);
    const giveColor = (shade) => {
        if (shade == 'dark') {
            if (status == 'PENDING') {
                return theme.palette.warning.dark;
            } else if (status == 'APPROVED') {
                return theme.palette.success.dark;
            } else {
                return theme.palette.error.dark;
            }
        } else {
            if (status == 'PENDING') {
                return theme.palette.warning.light;
            } else if (status == 'APPROVED') {
                return theme.palette.success.light;
            } else {
                return theme.palette.error.light;
            }
        }
    };
    const CardWrapper = styled(MainCard)(({ theme }) => ({
        overflow: 'hidden',
        position: 'relative',
        width: '100%',
        '&:after': {
            content: '""',
            position: 'absolute',
            width: 210,
            height: 210,
            background: `linear-gradient(210.04deg, ${giveColor('dark')} -50.94%, rgba(144, 202, 249, 0) 83.49%)`,
            borderRadius: '50%',
            top: -30,
            right: -180
        },
        '&:before': {
            content: '""',
            position: 'absolute',
            width: 210,
            height: 210,
            background: `linear-gradient(140.9deg, ${giveColor('dark')} -14.02%, rgba(144, 202, 249, 0) 70.50%)`,
            borderRadius: '50%',
            top: -160,
            right: -130
        }
    }));

    const giveIcon = () => {
        if (status == 'PENDING') {
            return <AccessTimeFilledIcon fontSize="inherit" />;
        } else if (status == 'APPROVED') {
            return <CheckCircleIcon fontSize="inherit" />;
        } else {
            return <CancelIcon fontSize="inherit" />;
        }
    };

    return (
        <>
            {isLoading ? (
                <TotalIncomeCard />
            ) : (
                <AnimateButton
                    style={{
                        cursor: 'pointer'
                    }}
                >
                    <CardWrapper
                        border={false}
                        content={false}
                        sx={{
                            backgroundColor: giveColor('light')
                        }}
                        onClick={() => {
                            application.isVerified == 'APPROVED' && setOpen(true);
                        }}
                    >
                        <Box sx={{ p: 2 }}>
                            <List sx={{ py: 0 }}>
                                <ListItem alignItems="center" disableGutters sx={{ py: 0 }}>
                                    <Tooltip title={application?.isVerified}>
                                        <ListItemAvatar>
                                            <Avatar
                                                variant="rounded"
                                                sx={{
                                                    ...theme.typography.commonAvatar,
                                                    ...theme.typography.largeAvatar,
                                                    backgroundColor: giveColor('light'),
                                                    color: giveColor('dark')
                                                }}
                                            >
                                                {giveIcon()}
                                            </Avatar>
                                        </ListItemAvatar>
                                    </Tooltip>

                                    <ListItemText
                                        sx={{
                                            py: 0,
                                            mt: 0.45,
                                            mb: 0.45
                                        }}
                                        primary={<Typography variant="h4">{application?.institutionName}</Typography>}
                                        secondary={
                                            <Typography
                                                variant="subtitle2"
                                                sx={{
                                                    color: theme.palette.grey[500],
                                                    mt: 0.5
                                                }}
                                            >
                                                {`Passing Year: ${application?.studentYearOfGraduation}`}
                                            </Typography>
                                        }
                                    />
                                </ListItem>
                            </List>
                        </Box>
                    </CardWrapper>
                </AnimateButton>
            )}
            <Dialog open={open} onClose={() => setOpen(false)}>
                <ApplCard application={application} />
            </Dialog>
        </>
    );
};

ApplCardLong.propTypes = {
    isLoading: PropTypes.bool
};

export default ApplCardLong;
