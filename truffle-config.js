const ContractKit = require('@celo/contractkit');
const Web3 = require('web3');
require('dotenv').config();

const web3 = new Web3('https://alfajores-forno.celo-testnet.org');
const kit = ContractKit.newKitFromWeb3(web3);

kit.connection.addAccount(process.env.CELO_PRIVATE_KEY);

module.exports = {
    networks: {
        development: {
            host: '127.0.0.1',
            port: 8545,
            network_id: '*'
        },
        alfajores: {
            provider: kit.connection.web3.currentProvider,
            network_id: 44787
        }
    },

    contracts_directory: './src/contracts/',
    contracts_build_directory: './src/contracts/abis/',
    compilers: {
        solc: {
            version: '0.7.1',
            optimizer: {
                enabled: true,
                runs: 200
            }
        }
    }
};
