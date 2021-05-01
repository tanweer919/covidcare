import Layout from "../src/components/Layout";
import SearchBox from "../src/components/SearchBox";
import ResourceSelect from "../src/components/ResourceSelect";
import SearchButton from "../src/components/SearchButton";
const Home = (): JSX.Element => {
  return (
    <Layout selectedKey={0}>
      <section>
        <div className="flex md:hidden logo-small-box">
          <img className="logo-small" src="/images/logo_large.png" alt="logo" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-5 gap-5">
          <SearchBox />
          <ResourceSelect />
          <SearchButton />
        </div>
      </section>
    </Layout>
  );
};

export default Home;
