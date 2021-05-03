import Layout from "../src/components/Layout";
import SearchBox from "../src/components/SearchBox";
import ResourceSelect from "../src/components/ResourceSelect";
import SearchButton from "../src/components/SearchButton";
import TabBar from '../src/components/TabBar';
import TabView from '../src/components/TabView'
const Home = (): JSX.Element => {
  return (
    <Layout selectedKey={0}>
      <section>
        <div className="flex md:hidden logo-small-box">
          <img className="logo-small" src="/images/logo_large.png" alt="logo" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 items-end">
          <div className="md:col-start-2 md:col-span-2">
            <SearchBox />
          </div>
          <div className="md:col-span-3">
            <ResourceSelect />
          </div>
          <div className="md:col-span-1">
            <SearchButton />
          </div>
        </div>
        <div className="mt-2">
          <TabBar />
        </div>
        <div>
          <TabView />
        </div>
      </section>
    </Layout>
  );
};

export default Home;
