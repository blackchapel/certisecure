import { createRoot } from 'react-dom/client';

// third party
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

// project imports
import * as serviceWorker from 'serviceWorker';
import App from 'App';
import { store } from 'store';

// style + assets
import 'assets/scss/style.scss';
import config from './config';

// web3
import { WagmiConfig, configureChains, createConfig, sepolia } from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { InjectedConnector } from 'wagmi/connectors/injected';

// ==============================|| REACT DOM RENDER  ||============================== //

const { chains, publicClient } = configureChains([sepolia], [alchemyProvider({ apiKey: 'wz0rM-QDUZ5Mkyxv4RLVpya1C8RgjfLy' })]);
const configs = createConfig({
    autoConnect: true,
    publicClient,
    connectors: [
        new InjectedConnector({
            chains,
            options: {
                name: 'Injected',
                shimDisconnect: true
            }
        })
    ]
});

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
    <Provider store={store}>
        <BrowserRouter basename={config.basename}>
            <WagmiConfig config={configs}>
                <App />
            </WagmiConfig>
        </BrowserRouter>
    </Provider>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
