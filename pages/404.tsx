import Layout from "../src/components/Layout";
import Error from "next/error";
import { Head } from "next/document";
const Custom404 = (): JSX.Element => {
  return (
    <>
    <Head>
      <title>
        Not Found
      </title>
    </Head>
    <Layout selectedKey={0}>
      <Error statusCode={404} />
    </Layout>
    </>
  );
};

export default Custom404;
