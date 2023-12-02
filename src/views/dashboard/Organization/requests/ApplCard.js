import PropTypes from 'prop-types';
import { useState } from 'react';

// blockchain
import * as ipfsClient from 'ipfs-http-client';
import { Buffer } from 'buffer';
import { abi } from './../../../../abis';
import { useConnect, useContractWrite } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';

// material-ui
import { styled, useTheme } from '@mui/material/styles';
import { Avatar, Box, Grid, Menu, MenuItem, Typography, Button, FormControl, Input, InputLabel, OutlinedInput } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SkeletonEarningCard from 'ui-component/cards/Skeleton/EarningCard';

// assets
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import GetAppTwoToneIcon from '@mui/icons-material/GetAppOutlined';
import FileCopyTwoToneIcon from '@mui/icons-material/FileCopyOutlined';
import PictureAsPdfTwoToneIcon from '@mui/icons-material/PictureAsPdfOutlined';
import ArchiveTwoToneIcon from '@mui/icons-material/ArchiveOutlined';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import axios from 'axios';
import loadingImg from 'assets/images/loading-lock.gif';
const CardWrapper = styled(MainCard)(({ theme }) => ({
    backgroundColor: theme.palette.secondary.dark,
    color: '#fff',
    overflow: 'hidden',
    position: 'relative',
    '&:after': {
        content: '""',
        position: 'absolute',
        width: 210,
        height: 210,
        background: theme.palette.secondary[800],
        borderRadius: '50%',
        top: -85,
        right: -95,
        [theme.breakpoints.down('sm')]: {
            top: -105,
            right: -140
        }
    },
    '&:before': {
        content: '""',
        position: 'absolute',
        width: 210,
        height: 210,
        background: theme.palette.secondary[800],
        borderRadius: '50%',
        top: -125,
        right: -15,
        opacity: 0.5,
        [theme.breakpoints.down('sm')]: {
            top: -155,
            right: -70
        }
    }
}));

// ===========================|| DASHBOARD DEFAULT - EARNING CARD ||=========================== //

const ApplCard = ({ isLoading, application, setReload, reload }) => {
    const theme = useTheme();

    const [anchorEl, setAnchorEl] = useState(null);
    const [open, setOpen] = useState(false);
    const [file, setFile] = useState('');
    const [loadData, setLoadData] = useState(false);

    const handleClickOpenModal = () => {
        setOpen(true);
    };

    const handleCloseModal = () => {
        setOpen(false);
    };
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const { connectAsync } = useConnect({
        connector: new InjectedConnector()
    });

    const { writeAsync, data } = useContractWrite({
        address: '0x15210f16449A088D2F696866d9B72aEFB6b3685C',
        abi: abi,
        functionName: 'issueCertificate'
    });

    return (
        <>
            {isLoading ? (
                <SkeletonEarningCard />
            ) : (
                <>
                    <CardWrapper
                        border={false}
                        content={false}
                        onClick={(e) => handleClickOpenModal()}
                        sx={{
                            cursor: 'pointer',
                            '&:hover': {
                                boxShadow: 3
                            }
                        }}
                    >
                        <Box sx={{ p: 2.25 }}>
                            <Grid container direction="column">
                                <Grid item>
                                    <Grid container justifyContent="space-between">
                                        {/* <Grid item>
                                        <Avatar
                                            variant="rounded"
                                            sx={{
                                                ...theme.typography.commonAvatar,
                                                ...theme.typography.largeAvatar,
                                                backgroundColor: theme.palette.secondary[800],
                                                mt: 1
                                            }}
                                        >
                                            <img src={EarningIcon} alt="Notification" />
                                        </Avatar>
                                    </Grid> */}
                                        <Grid item>
                                            <Avatar
                                                variant="rounded"
                                                sx={{
                                                    ...theme.typography.commonAvatar,
                                                    ...theme.typography.mediumAvatar,
                                                    backgroundColor: theme.palette.secondary.dark,
                                                    color: theme.palette.secondary[200],
                                                    zIndex: 1
                                                }}
                                                aria-controls="menu-earning-card"
                                                aria-haspopup="true"
                                                onClick={handleClick}
                                            >
                                                <MoreHorizIcon fontSize="inherit" />
                                            </Avatar>
                                            <Menu
                                                id="menu-earning-card"
                                                anchorEl={anchorEl}
                                                keepMounted
                                                open={Boolean(anchorEl)}
                                                onClose={handleClose}
                                                variant="selectedMenu"
                                                anchorOrigin={{
                                                    vertical: 'bottom',
                                                    horizontal: 'right'
                                                }}
                                                transformOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'right'
                                                }}
                                            >
                                                <MenuItem onClick={handleClose}>
                                                    <GetAppTwoToneIcon sx={{ mr: 1.75 }} /> Import Card
                                                </MenuItem>
                                                <MenuItem onClick={handleClose}>
                                                    <FileCopyTwoToneIcon sx={{ mr: 1.75 }} /> Copy Data
                                                </MenuItem>
                                                <MenuItem onClick={handleClose}>
                                                    <PictureAsPdfTwoToneIcon sx={{ mr: 1.75 }} /> Export
                                                </MenuItem>
                                                <MenuItem onClick={handleClose}>
                                                    <ArchiveTwoToneIcon sx={{ mr: 1.75 }} /> Archive File
                                                </MenuItem>
                                            </Menu>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item>
                                    <Grid container alignItems="center">
                                        <Grid item>
                                            <Typography sx={{ fontSize: '2.125rem', fontWeight: 500, mr: 1, mt: 1.75, mb: 0.75 }}>
                                                {application?.studentName}
                                            </Typography>
                                        </Grid>
                                        {/* <Grid item>
                                        <Avatar
                                            sx={{
                                                cursor: 'pointer',
                                                ...theme.typography.smallAvatar,
                                                backgroundColor: theme.palette.secondary[200],
                                                color: theme.palette.secondary.dark
                                            }}
                                        >
                                            <ArrowUpwardIcon fontSize="inherit" sx={{ transform: 'rotate3d(1, 1, 1, 45deg)' }} />
                                        </Avatar>
                                    </Grid> */}
                                    </Grid>
                                </Grid>
                                <Grid item sx={{ mb: 1.25 }}>
                                    <Typography
                                        sx={{
                                            fontSize: '1rem',
                                            fontWeight: 500,
                                            color: theme.palette.secondary[200]
                                        }}
                                    >
                                        Year of Graduation: {application?.studentYearOfGraduation}
                                    </Typography>
                                    {/* <Typography
                                    sx={{
                                        fontSize: '1rem',
                                        fontWeight: 500,
                                        color: theme.palette.secondary[200]
                                    }}
                                >
                                    Date of Birth: {application?.studentDob}
                                </Typography> */}
                                </Grid>
                            </Grid>
                        </Box>
                    </CardWrapper>
                    <Dialog
                        open={open}
                        onClose={handleCloseModal}
                        sx={{
                            padding: 5,
                            '& .MuiDialog-paper': {
                                width: '70%',
                                borderRadius: 2,
                                boxShadow: 3,
                                padding: 5
                            }
                        }}
                    >
                        {loadData ? (
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    height: '100%',
                                    flexDirection: 'column'
                                }}
                            >
                                <img src={loadingImg} alt="loading" style={{ width: '70%', height: '70%' }} />
                                <Typography sx={{ fontWeight: 500, fontSize: '1.5rem' }}>Please wait..</Typography>
                            </div>
                        ) : (
                            <>
                                <DialogContent
                                    sx={{
                                        width: '100%'
                                    }}
                                >
                                    <DialogContentText color="secondary">
                                        <Grid container spacing={2}>
                                            <Grid item xs={12}>
                                                <Typography sx={{ fontWeight: 500, fontSize: '1.5rem' }}>
                                                    {application?.studentName}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={6} md={4}>
                                                <Typography sx={{ fontWeight: 500 }}>Date of Birth:</Typography>
                                                <Typography sx={{ fontWeight: 500, fontSize: '1.2rem' }}>
                                                    {application?.studentDob}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={6} md={4}>
                                                <Typography sx={{ fontWeight: 500 }}>Year of Graduation:</Typography>
                                                <Typography sx={{ fontWeight: 500, fontSize: '1.2rem' }}>
                                                    {application?.studentYearOfGraduation}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={6} md={4}>
                                                <Typography sx={{ fontWeight: 500 }}>Roll Number:</Typography>
                                                <Typography sx={{ fontWeight: 500, fontSize: '1.2rem' }}>
                                                    {application?.studentRollNo}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={6} md={4}>
                                                <Typography sx={{ fontWeight: 500 }}>CGPA:</Typography>
                                                <Typography sx={{ fontWeight: 500, fontSize: '1.2rem' }}>
                                                    {application?.studentCgpa}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12} md={8}>
                                                <InputLabel htmlFor="outlined-adornment">Upload Certificate</InputLabel>
                                                <OutlinedInput
                                                    id="outlined-adornment"
                                                    type="file"
                                                    onChange={(e) => setFile(e.target.files[0])}
                                                />
                                            </Grid>
                                        </Grid>
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            width: '100%'
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                width: '50%'
                                            }}
                                        >
                                            <Button onClick={handleCloseModal}>Cancel</Button>
                                        </Box>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'flex-end',
                                                width: '50%'
                                            }}
                                        >
                                            <Button
                                                color="error"
                                                variant="contained"
                                                onClick={async () => {
                                                    setLoadData(true);
                                                    const res = await axios.post(
                                                        `https://certisecure-backend.onrender.com/api/institution/reject-application?applicationId=${application._id}`,
                                                        {
                                                            vidhita: 'kc love'
                                                        },
                                                        {
                                                            headers: {
                                                                Authorization: 'Bearer ' + localStorage.getItem('dvkitoken')
                                                            }
                                                        }
                                                    );
                                                    console.log(res.data.data);
                                                    localStorage.setItem('user', JSON.stringify(res.data.data));
                                                    setLoadData(false);
                                                    setReload(!reload);
                                                }}
                                                sx={{
                                                    boxShadow: 0,
                                                    mr: 1
                                                }}
                                            >
                                                Reject
                                            </Button>
                                            <Button
                                                color="success"
                                                variant="contained"
                                                sx={{
                                                    boxShadow: 0
                                                }}
                                                onClick={async () => {
                                                    setLoadData(true);
                                                    const auth =
                                                        'Basic ' +
                                                        Buffer.from(
                                                            '2LrLRI8Ul7yT6Go7nbnCuFNVAqF' + ':' + 'a099e44fb1b99b82f48b12f4dc1e5af8'
                                                        ).toString('base64');
                                                    const client = ipfsClient.create({
                                                        host: 'ipfs.infura.io',
                                                        port: 5001,
                                                        protocol: 'https',
                                                        headers: {
                                                            authorization: auth
                                                        }
                                                    });

                                                    let result = await client.add(file);
                                                    let url = 'https://dvki.infura-ipfs.io/ipfs/' + result.path;

                                                    await connectAsync();
                                                    await writeAsync({
                                                        args: [url]
                                                    });

                                                    const res = await axios.post(
                                                        `https://certisecure-backend.onrender.com/api/institution/approve-application?applicationId=${application._id}`,
                                                        {
                                                            certificateUrl: url,
                                                            hashedMessage: `0x${result.path}`,
                                                            signature: `0x${result.path}`
                                                        },
                                                        {
                                                            headers: {
                                                                Authorization: 'Bearer ' + localStorage.getItem('dvkitoken')
                                                            }
                                                        }
                                                    );

                                                    localStorage.setItem('user', JSON.stringify(res.data.data));
                                                    setLoadData(false);
                                                    setReload(!reload);
                                                }}
                                            >
                                                Approve
                                            </Button>
                                        </Box>
                                    </Box>
                                </DialogActions>
                            </>
                        )}
                    </Dialog>
                </>
            )}
        </>
    );
};

ApplCard.propTypes = {
    isLoading: PropTypes.bool
};

export default ApplCard;
