import "@styles/globals.css";
import "@styles/home.module.css";
import { appWithTranslation } from "next-i18next";
import { AppProps } from "next/app";


const App = ({ Component, pageProps}: AppProps) => {
    return <Component {...pageProps} />;
};

export default appWithTranslation(App);