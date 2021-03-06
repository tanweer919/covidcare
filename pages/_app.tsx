import "../styles/globals.scss";
import "../styles/Sidebar.scss";
import "../styles/BottomNavbar.scss";
import "../styles/Home.scss";
import "react-toastify/dist/ReactToastify.css";
import "nprogress/nprogress.css";
import { AppProps } from "next/app";
import NProgress from "nprogress";
import Router from "next/router";
import Head from "next/head";
NProgress.configure({
  minimum: 0.3,
  easing: "ease",
  speed: 800,
  showSpinner: false,
});

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>Covid Care</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
};

export default MyApp;
