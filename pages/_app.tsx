import "../styles/globals.scss";
import "../styles/Sidebar.scss";
import "../styles/BottomNavbar.scss";
import "../styles/Home.scss";
import { AppProps } from "next/app";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />;
};

export default MyApp;
