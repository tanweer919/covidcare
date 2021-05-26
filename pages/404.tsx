import Layout from "../src/components/Layout";
import Error from "next/error";
const Custom404 = (): JSX.Element => {
  return (
    <Layout selectedKey={0}>
      <Error statusCode={404} />
    </Layout>
  );
};

export default Custom404;
