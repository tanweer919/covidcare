import Layout from "../src/components/Layout";
const Home = (): JSX.Element => {
  return (
    <Layout selectedKey={0}>
      <section>
        <div className="flex md:hidden logo-small-box">
          <img className="logo-small" src="/images/logo_large.png" alt="logo"/>
        </div>
      </section>
    </Layout>
  );
};

export default Home;
