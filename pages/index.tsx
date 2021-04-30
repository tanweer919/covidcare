import Layout from "../src/components/Layout";
import SearchBox from "../src/components/SearchBox"
const Home = (): JSX.Element => {
  return (
    <Layout selectedKey={0}>
      <section>
        <div className="flex md:hidden logo-small-box">
          <img className="logo-small" src="/images/logo_large.png" alt="logo" />
        </div>
        <div>
          <div className="grid grid-cols1">
            <SearchBox/>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Home;
