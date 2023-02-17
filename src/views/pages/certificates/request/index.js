import { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';
// material-ui
import {
    Box,
    Button,
    Checkbox,
    Divider,
    FormControl,
    FormControlLabel,
    FormHelperText,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Select,
    Menu,
    MenuItem,
    Stack,
    TextField,
    Typography,
    useMediaQuery
} from '@mui/material';
import CertificatesWrapper from '../CertificatesWrapper';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Autocomplete from '@mui/material/Autocomplete';
import AnimateButton from 'ui-component/extended/AnimateButton';
import moment from 'moment';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// ==============================|| DEFAULT DASHBOARD ||============================== //
import Logo from 'ui-component/Logo';
import { getInstitutions, sendRequest } from 'data/api';
const RequestCertificate = () => {
    const [isLoading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [institutions, setInstitutions] = useState([
        {
            _id: 1,
            name: 'University of Lagos',
            code: 'UNILAG',
            logo: 'https://www.unilag.edu.ng/wp-content/uploads/2019/03/UNILAG-Logo-1.png'
        },
        {
            _id: 2,
            name: 'University of Ibadan',
            code: 'UI',
            logo: 'https://www.unilag.edu.ng/wp-content/uploads/2019/03/UNILAG-Logo-1.png'
        },
        {
            _id: 3,
            name: 'University of Abuja',
            code: 'UNIABUJA',
            logo: 'https://www.unilag.edu.ng/wp-content/uploads/2019/03/UNILAG-Logo-1.png'
        },
        {
            _id: 4,
            name: 'University of Lagos',
            code: 'UNILAG',
            logo: 'https://www.unilag.edu.ng/wp-content/uploads/2019/03/UNILAG-Logo-1.png'
        },
        {
            _id: 5,
            name: 'University of Ibadan',
            code: 'UI',
            logo: 'https://www.unilag.edu.ng/wp-content/uploads/2019/03/UNILAG-Logo-1.png'
        }
    ]);
    const [data, setData] = useState({
        institutionId: '',
        institutionName: '',
        studentRollNo: '',
        studentCgpa: '',
        studentYearOfGraduation: '',
        studentDob: ''
    });
    const setInstituitionsFn = async () => {
        try {
            const response = await getInstitutions();
            setInstitutions(response.data);
        } catch (err) {
            console.log(err);
        }
    };

    const sendRequestFn = async () => {
        try {
            const response = await sendRequest(localStorage.getItem('dvkitoken'), data);
            if (response && response.data) {
                navigate('/certificates/status');
            } else {
                console.log(response);
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        setLoading(false);
        setInstituitionsFn();
    }, []);
    const theme = useTheme();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
    return (
        <div
            style={{
                minHeight: '100vh'
            }}
        >
            <Grid container direction="column" justifyContent="flex-end" sx={{ minHeight: '100vh' }}>
                <Grid item xs={12}>
                    <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: 'calc(100vh - 68px)' }}>
                        <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
                            <CertificatesWrapper>
                                <Grid container spacing={2} alignItems="center" justifyContent="center">
                                    <Grid item sx={{ mb: 3 }}>
                                        <Link to="#">
                                            <Logo />
                                        </Link>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Grid
                                            container
                                            alignItems="center"
                                            justifyContent="center"
                                            direction={matchDownSM ? 'column-reverse' : 'row'}
                                        >
                                            <Grid item>
                                                <Stack alignItems="center" justifyContent="center" spacing={1}>
                                                    <Typography
                                                        color={theme.palette.secondary.main}
                                                        gutterBottom
                                                        variant={matchDownSM ? 'h3' : 'h2'}
                                                    >
                                                        Request Certificate
                                                    </Typography>
                                                    <Typography
                                                        variant="caption"
                                                        fontSize="16px"
                                                        textAlign={matchDownSM ? 'center' : 'inherit'}
                                                    >
                                                        Request a Certificate from your issuing Institution
                                                    </Typography>
                                                </Stack>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Grid container spacing={2} justifyContent="center">
                                            <Grid item xs={12}>
                                                <FormControl fullWidth>
                                                    <InputLabel id="select-institution-label">Name of the Instution</InputLabel>
                                                    <Select
                                                        labelId="select-institution-label"
                                                        id="institution-select"
                                                        value={data.institutionId}
                                                        label="Name of the Instution"
                                                        onChange={(e) => {
                                                            setData({
                                                                ...data,
                                                                institutionId: e.target.value,
                                                                institutionName: institutions.find(
                                                                    (institution) => institution._id === e.target.value
                                                                ).name
                                                            });
                                                        }}
                                                    >
                                                        {institutions &&
                                                            institutions.map((institution) => (
                                                                <MenuItem key={institution._id} value={institution._id}>
                                                                    {institution.name}
                                                                </MenuItem>
                                                            ))}
                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    fullWidth
                                                    id="outlined-basic"
                                                    label="Roll Number"
                                                    variant="outlined"
                                                    onChange={(e) => {
                                                        setData({
                                                            ...data,
                                                            studentRollNo: e.target.value
                                                        });
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <LocalizationProvider dateAdapter={AdapterMoment} fullWidth>
                                                    <DatePicker
                                                        label="Date of Birth"
                                                        value={data.studentDob}
                                                        onChange={(newValue) => {
                                                            setData({
                                                                ...data,
                                                                studentDob: moment(newValue).format('DD/MM/YYYY')
                                                            });
                                                        }}
                                                        renderInput={(params) => <TextField {...params} fullWidth error={false} />}
                                                        fullWidth
                                                    />
                                                </LocalizationProvider>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    fullWidth
                                                    id="outlined-basic"
                                                    label="CGPA"
                                                    variant="outlined"
                                                    onChange={(e) => {
                                                        setData({
                                                            ...data,
                                                            studentCgpa: e.target.value
                                                        });
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    fullWidth
                                                    id="outlined-basic"
                                                    label="Year of Graduation"
                                                    variant="outlined"
                                                    onChange={(e) => {
                                                        setData({
                                                            ...data,
                                                            studentYearOfGraduation: e.target.value
                                                        });
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Box sx={{ mt: 2 }}>
                                                    <AnimateButton>
                                                        <Button
                                                            disableElevation
                                                            fullWidth
                                                            size="large"
                                                            type="submit"
                                                            variant="contained"
                                                            color="secondary"
                                                            onClick={() => {
                                                                setLoading(true);
                                                                console.log(data);
                                                                sendRequestFn();
                                                            }}
                                                        >
                                                            Submit Request
                                                        </Button>
                                                    </AnimateButton>
                                                </Box>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </CertificatesWrapper>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
};

export default RequestCertificate;
