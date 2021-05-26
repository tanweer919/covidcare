import Document, { Html, Head, Main, NextScript } from "next/document";
export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <meta name="application-name" content="Covid Care" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="default"
          />
          <meta name="apple-mobile-web-app-title" content="Covid Care" />
          <meta
            name="keywords"
            content="Covid, Covid Care, Covid Resource, Oxygen Cylinder, Covid Medicines, Covid Hospitals Beds"
          ></meta>
          <meta
            name="description"
            content="Platform to search, share and request for covid related resources"
          />
          <meta name="format-detection" content="telephone=no" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="msapplication-TileColor" content="#57c6ac" />
          <meta name="msapplication-tap-highlight" content="no" />
          <meta name="theme-color" content="#57c6ac" />

          <link
            rel="apple-touch-icon"
            sizes="128x128"
            href="/images/icons/android-icon-128x128.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/images/icons/android-icon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="64x64"
            href="/images/icons/android-icon-64x64.png"
          />
          <link rel="manifest" href="/manifest.json" />
          <link rel="shortcut icon" href="/favicon.ico" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content="Covid Care" />
          <meta
            property="og:description"
            content="Platform to search, share and request for covid related resources"
          />
          <meta property="og:site_name" content="Covid Care" />
          <meta property="og:url" content={process.env.NEXT_PUBLIC_BASE_URL} />
          <meta
            property="og:image"
            content="/images/icons/android-icon-128x128.png"
          />
          <title>Covid Care</title>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
