import "../styles/globals.sass";
import { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store, persistor } from "../store";
import { PersistGate } from "redux-persist/integration/react";
import { ThemeProvider } from "styled-components";
import { myTheme } from "@/theme/theme";

function MyApp({ Component, pageProps }: AppProps) {

    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <ThemeProvider theme={myTheme}>
                    <Component {...pageProps} />
                </ThemeProvider>
            </PersistGate>
        </Provider>
    );
}

export default MyApp;
