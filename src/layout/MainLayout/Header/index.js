import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Avatar, Box, ButtonBase, Button } from '@mui/material';

// project imports
import LogoSection from '../LogoSection';
import SearchSection from './SearchSection';
import ProfileSection from './ProfileSection';
import NotificationSection from './NotificationSection';

import { useNavigate } from 'react-router';
// assets
import { IconMenu2, IconWallet } from '@tabler/icons';

// ==============================|| MAIN NAVBAR / HEADER ||============================== //

const Header = ({ handleLeftDrawerToggle }) => {
    const theme = useTheme();
    const [wallet, setWallet] = React.useState(window.ethereum);
    const [connected, setConnected] = React.useState(false);

    const navigate = useNavigate();
    return (
        <>
            {/* logo & toggler button */}
            <Box
                sx={{
                    width: 228,
                    display: 'flex',
                    [theme.breakpoints.down('md')]: {
                        width: 'auto'
                    }
                }}
            >
                <Box component="span" sx={{ display: { xs: 'none', md: 'block' }, flexGrow: 1 }}>
                    <LogoSection />
                </Box>
                {localStorage.getItem('dvkitoken') && (
                    <ButtonBase sx={{ borderRadius: '12px', overflow: 'hidden' }}>
                        <Avatar
                            variant="rounded"
                            sx={{
                                ...theme.typography.commonAvatar,
                                ...theme.typography.mediumAvatar,
                                transition: 'all .2s ease-in-out',
                                background: theme.palette.secondary.light,
                                color: theme.palette.secondary.dark,
                                '&:hover': {
                                    background: theme.palette.secondary.dark,
                                    color: theme.palette.secondary.light
                                }
                            }}
                            onClick={handleLeftDrawerToggle}
                            color="inherit"
                        >
                            <IconMenu2 stroke={1.5} size="1.3rem" />
                        </Avatar>
                    </ButtonBase>
                )}
            </Box>

            {/* header search */}
            {/* <SearchSection /> */}
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ flexGrow: 1 }} />

            {/* notification & profile */}
            {localStorage.getItem('dvkitoken') ? (
                wallet ? (
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => {
                            window.ethereum.request({ method: 'eth_requestAccounts' }).then((res) => {
                                setConnected(true);
                                axios.patch(
                                    'https://dvki-production.up.railway.app/api/user/wallet-address',
                                    {
                                        walletAddress: res[0]
                                    },
                                    {
                                        headers: {
                                            Authorization: 'Bearer ' + localStorage.getItem('dvkitoken')
                                        }
                                    }
                                );
                            });
                        }}
                        sx={{
                            boxShadow: 'none'
                        }}
                        startIcon={<IconWallet stroke={1.5} size="1.3rem" />}
                    >
                        {connected ? 'connected' : 'Connect Wallet'}
                    </Button>
                ) : (
                    <Button
                        variant="contained"
                        color="secondary"
                        sx={{
                            boxShadow: 'none'
                        }}
                        onClick={() => {
                            window.open(
                                'https://metamask.io/',
                                '_blank' // <- This is what makes it open in a new window.
                            );
                        }}
                        startIcon={<IconWallet stroke={1.5} size="1.3rem" />}
                    >
                        Install Metamask
                    </Button>
                )
            ) : null}
            {localStorage.getItem('dvkitoken') && <NotificationSection />}

            {localStorage.getItem('dvkitoken') ? (
                <ProfileSection />
            ) : (
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    {/* login button */}

                    <Button
                        sx={{
                            marginRight: '10px'
                        }}
                        onClick={() => {
                            window.location.href = '/login';
                        }}
                    >
                        Login
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                            window.location.href = '/register';
                        }}
                    >
                        Register
                    </Button>
                </Box>
            )}

            {/* <ProfileSection /> */}
        </>
    );
};

Header.propTypes = {
    handleLeftDrawerToggle: PropTypes.func
};

export default Header;
