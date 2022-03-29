import type { AppProps } from "next/app";
import "../styles/globals.scss";

const RampUpApp = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />;
};

export default RampUpApp;
