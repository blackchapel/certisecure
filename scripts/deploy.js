// imports
const { ethers, run, network } = require('hardhat');

// async main
async function main() {
    const CertiSecureFactory = await ethers.getContractFactory('CertiSecure');
    console.log('Deploying contract...');
    const certisecure = await CertiSecureFactory.deploy();
    await certisecure.deployed();
    console.log(`Deployed contract to: ${certisecure.address}`);
    // what happens when we deploy to our hardhat network?
    if (network.config.chainId === 11155111 && process.env.ETHERSCAN_API_KEY) {
        console.log('Waiting for block confirmations...');
        await certisecure.deployTransaction.wait(6);
        await verify(certisecure.address, []);
    }

    // const currentValue = await certisecure.retrieve();
    // console.log(`Current Value is: ${currentValue}`);

    // Update the current value
    // const transactionResponse = await certisecure.store(7);
    // await transactionResponse.wait(1);
    // const updatedValue = await certisecure.retrieve();
    // console.log(`Updated Value is: ${updatedValue}`);
}

// async function verify(contractAddress, args) {
const verify = async (contractAddress, args) => {
    console.log('Verifying contract...');
    try {
        await run('verify:verify', {
            address: contractAddress,
            constructorArguments: args
        });
    } catch (e) {
        if (e.message.toLowerCase().includes('already verified')) {
            console.log('Already Verified!');
        } else {
            console.log(e);
        }
    }
};

// main
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
