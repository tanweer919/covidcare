import "../styles/globals.scss";
import "../styles/Sidebar.scss";
import "../styles/BottomNavbar.scss";
import "../styles/Home.scss";
import { AppProps } from "next/app";
import { useEffect } from "react";
import LocationService from "../src/services/LocationService";

const MyApp = ({ Component, pageProps }: AppProps) => {
  
  useEffect(() => {
    const locationService = new LocationService();
    locationService.getLocation();
  }, []);
  return <Component {...pageProps} />;
};

export default MyApp;
