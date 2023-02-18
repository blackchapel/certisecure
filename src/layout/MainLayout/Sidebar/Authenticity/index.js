import PropTypes from 'prop-types';
import { useState } from 'react';
import Web3 from 'web3';
import axios from 'axios';
import Verification from '../../../../abis/Verification';
// material-ui
import { styled, useTheme } from '@mui/material/styles';
import {
    Avatar,
    Card,
    CardContent,
    Grid,
    LinearProgress,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Typography,
    linearProgressClasses,
    TextField,
    Button
} from '@mui/material';

// assets
import SafetyCheckIcon from '@mui/icons-material/SafetyCheck';
import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';
import { TimeToLeave } from '@mui/icons-material';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import AnimateButton from 'ui-component/extended/AnimateButton';
// styles
const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 30,
    [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor: '#fff'
    },
    [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 5,
        backgroundColor: theme.palette.primary.main
    }
}));

const CardStyle = styled(Card)(({ theme }) => ({
    background: theme.palette.primary.light,
    marginBottom: '22px',
    overflow: 'hidden',
    position: 'relative',
    '&:after': {
        content: '""',
        position: 'absolute',
        width: '140px',
        height: '140px',
        background: theme.palette.primary[200],
        borderRadius: '50%',
        top: '-105px',
        right: '-96px'
    }
}));

// ==============================|| PROGRESS BAR WITH LABEL ||============================== //

function LinearProgressWithLabel({ value, ...others }) {
    const theme = useTheme();

    return (
        <Grid container direction="column" spacing={1} sx={{ mt: 1.5 }}>
            <Grid item>
                <Grid container justifyContent="space-between">
                    <Grid item>
                        <Typography variant="h6" sx={{ color: theme.palette.primary[800] }}>
                            Progress
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="h6" color="inherit">{`${Math.round(value)}%`}</Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item>
                <BorderLinearProgress variant="determinate" value={value} {...others} />
            </Grid>
        </Grid>
    );
}

LinearProgressWithLabel.propTypes = {
    value: PropTypes.number
};

// ==============================|| SIDEBAR MENU Card ||============================== //

const Authenticity = () => {
    const theme = useTheme();
    const [serial, setSerial] = useState('');

    const verifyCertificate = async () => {
        const celoUrl = 'https://alfajores-forno.celo-testnet.org/';
        const web3 = new Web3(celoUrl);

        const SmartContractAbi = Verification.abi;
        const SmartContractAddress = '0xF2114cdFFcFcc88aba06e42cE232C00eFb04EE54'; // Instantiate an object that "encapsulates" the smart contract
        const SmartContractObject = new web3.eth.Contract(SmartContractAbi, SmartContractAddress);

        const res = await axios.get('https://dvki-production.up.railway.app/api/institution/search-signature?signature=', //add after = {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('dvkitoken')
            }
        });

        SmartContractObject.methods.recover(res.data.data.hashedMessage, signature); // replace signature
    };

    return (
        <CardStyle>
            <CardContent sx={{ p: 2 }}>
                <List sx={{ p: 0, m: 0 }}>
                    <ListItem alignItems="flex-start" disableGutters sx={{ p: 0 }}>
                        <ListItemAvatar sx={{ mt: 0 }}>
                            <Avatar
                                variant="rounded"
                                sx={{
                                    ...theme.typography.commonAvatar,
                                    ...theme.typography.largeAvatar,
                                    color: theme.palette.primary.main,
                                    border: 'none',
                                    borderColor: theme.palette.primary.main,
                                    background: '#fff',
                                    marginRight: '12px'
                                }}
                            >
                                <SafetyCheckIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            sx={{ mt: 0 }}
                            primary={
                                <Typography variant="subtitle1" sx={{ color: theme.palette.primary[800] }}>
                                    Check Authenticity
                                </Typography>
                            }
                            secondary={<Typography variant="caption"> Of Certificate </Typography>}
                        />
                    </ListItem>
                </List>
                <TextField
                    label="Enter Certificate ID"
                    variant="outlined"
                    size="small"
                    sx={{ mt: 2 }}
                    onChange={(e) => setSerial(e.target.value)}
                />
                <AnimateButton>
                    <Button variant="contained" sx={{ mt: 2 }} size="small" fullWidth onClick={() => verifyCertificate()}>
                        Check
                    </Button>
                </AnimateButton>

                {/* <LinearProgressWithLabel value={66} /> */}
            </CardContent>
        </CardStyle>
    );
};

export default Authenticity;
