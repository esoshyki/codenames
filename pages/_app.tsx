import '../styles/globals.sass'
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store, persistor } from '../store';
import { PersistGate } from "redux-persist/integration/react";
import Chat from '../components/Chat';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <Chat />
                <Component {...pageProps} />
            </PersistGate>
        </Provider>

        )
}

export default MyApp
