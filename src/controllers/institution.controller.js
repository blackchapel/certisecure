const User = require('../models/user.schema');
const dotenv = require('dotenv').config();
const Web3 = require('web3');
const MyContract = require('../contracts/abis/certisecure.json');
const address = process.env.CELO_ADDRESS_KEY;
const privateText = process.env.CELO_PRIVATE_KEY;
const celoUrl = 'https://alfajores-forno.celo-testnet.org/';

const approveApplication = async (req, res) => {
    try {
        const institution = await User.findById(req.user.id);

        if (!institution) {
            res.status(404).json({
                message: 'Institution not found'
            });
        }

        const application = institution.applications.filter((item) => {
            if (item._id.toString() === req.query.applicationId.toString()) {
                return item;
            }
        });

        const student = await User.findById(application.studentId);

        const web3 = new Web3(celoUrl);
        const networkId = newweb3.eth.getId();
        const myContract = new web3.eth.net.Contract(
            MyContract.abi,
            MyContract.networks[networkId].address
        );

        const tx = myContract.methods.createUser(student.name, student.role);
        const gas = await tx.estimateGas({ from: institution.walletAddress });
        const gasPrice = await web3.eth.getGasPrice();
        const data = tx.encodeABI();
        const nonce = await web3.eth.getTransactionCount(address);

        const signedTx = await web3.eth.accounts.signTransaction(
            {
                to: myContract.options.address,
                data,
                gas,
                gasPrice,
                nonce,
                chainId: networkId
            },
            privateKey //sign w metamask wallet
        );

        institution.applications = institution.applications.forEach((item) => {
            if (item._id.toString() === req.query.applicationId.toString()) {
                item.isVerified = true;
            }
            return item;
        });

        await institution.save();

        res.status(200).json({
            message: 'Application Approved',
            data: institution
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            message: error.message
        });
    }
};

const verifyCertificate = async (req, res) => {
    try {
        const institution = await User.findById(req.user.id);

        if (!institution) {
            res.status(404).json({
                message: 'Institution not found'
            });
        }

        const status = institution.applications.forEach((item) => {
            if (
                item._id.toString() === req.query.applicationId.toString() &&
                item.isVerified === true
            ) {
                return true;
            }
            return false;
        });

        res.status(200).json({
            message: 'Certificate found',
            data: status
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            message: error.message
        });
    }
};

const searchSignature = async (req, res) => {
    try {
        const institutions = await User.find();

        if (institutions.length === 0) {
            res.status(404).json({
                message: 'no institutions found'
            });
        } else {
            let result;
            institutions.forEach((item) => {
                item.applications.forEach((itemInception) => {
                    if (itemInception.signature === req.query.signature) {
                        result['walletAddress'] = item.walletAddress;
                        result['hashedMessage'] = itemInception.hashedMessage;
                    }
                });
            });

            res.status(200).json({
                message: 'certificate details',
                data: result
            });
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    approveApplication,
    verifyCertificate,
    searchSignature
};

// approve, verify, view all
