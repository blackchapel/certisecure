import React from 'react';
import ProtectedRoute from 'routes/ProtectedRoute';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Web3 from 'web3';
import axios from 'axios';
import Verification from 'abis/Verification.json';
import { Document, Page } from 'react-pdf';
import loadingImg from 'assets/images/loading-lock.gif';
import { Button, Typography } from '@mui/material';

function VerifyCertificate() {
    const [data, setData] = React.useState({});
    const navigate = useNavigate();
    const { signature } = useParams();
    const verifyCertificateFn = async () => {
        try {
            const celoUrl = 'https://alfajores-forno.celo-testnet.org/';
            const web3 = new Web3(celoUrl);

            const SmartContractAbi = Verification.abi;
            const SmartContractAddress = '0xF2114cdFFcFcc88aba06e42cE232C00eFb04EE54'; // Instantiate an object that "encapsulates" the smart contract
            const SmartContractObject = new web3.eth.Contract(SmartContractAbi, SmartContractAddress);

            const res = await axios.get(
                'https://certisecure-backend.onrender.com/api/institution/search-signature?signature=' + signature,
                {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('dvkitoken')
                    }
                }
            );
            console.log(res.data.data.certificateUrl);
            setData(res.data.data);
            SmartContractObject.methods.recover(res.data.data.hashedMessage, signature); // replace signature
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        verifyCertificateFn();
    }, []);

    return (
        <>
            {Object.keys(data).length > 0 ? (
                <div>
                    {data.certificateUrl ? (
                        // <Document file={'https://dvki.infura-ipfs.io/ipfs/QmUf9j8SQiSAEMSr6fNMo1vZD2eyUNA4BqZaB7PnY3wx3D'} />
                        // <img src="https://dvki.infura-ipfs.io/ipfs/QmUf9j8SQiSAEMSr6fNMo1vZD2eyUNA4BqZaB7PnY3wx3D.jpg" alt="certificate" />
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: '100%',
                                flexDirection: 'column'
                            }}
                        >
                            <Typography variant="h4" gutterBottom>
                                Certificate Verified!
                            </Typography>
                            <Button href={data.certificateUrl} variant="contained" color="secondary">
                                View Document
                            </Button>
                        </div>
                    ) : (
                        <div>
                            <Typography variant="h4" gutterBottom>
                                Invalid Certificate!
                            </Typography>
                        </div>
                    )}{' '}
                </div>
            ) : (
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100%',
                        flexDirection: 'column'
                    }}
                >
                    <img src={loadingImg} alt="loading" style={{ height: '70%' }} />
                    <Typography sx={{ fontWeight: 500, fontSize: '1.5rem' }}>Please wait..</Typography>
                </div>
            )}
        </>
    );
}

export default VerifyCertificate;
