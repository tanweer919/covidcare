import Layout from "../src/components/Layout";
import SearchBox from "../src/components/SearchBox";
import SelectDropdown from "../src/components/SelectDropdown";
import SearchButton from "../src/components/SearchButton";
import TabBar from "../src/components/TabBar";
import TabView from "../src/components/TabView";
import AvailableTab from "../src/components/AvailableTab";
import RequestTab from "../src/components/RequestTab";
import { TabInterface, SelectOption } from "../src/interfaces/interface";
import { useState } from "react";
const Home = (): JSX.Element => {
  const resourceList: SelectOption[] = [
    { label: "Oxygen", value: 0, icon: "/images/oxygen.svg" },
    { label: "Hospital Beds", value: 1, icon: "/images/hospital-bed.svg" },
    { label: "Medicines/Injections", value: 2, icon: "/images/medicine.svg" },
    { label: "Testing", value: 3, icon: "/images/blood-test.svg" },
    { label: "Blood", value: 4, icon: "/images/blood-drop.svg" },
    { label: "Ambulance", value: 5, icon: "/images/ambulance.svg" },
  ];
  const [activeTab, setActiveTab] = useState(0);
  const handleClick = (tab: number) => {
    setActiveTab(tab);
  };
  const children = [<AvailableTab />, <RequestTab />];
  const tabs: TabInterface[] = [
    {
      label: "Available",
      onClick: () => {
        handleClick(0);
      },
    },
    {
      label: "Request",
      onClick: () => {
        handleClick(1);
      },
    },
  ];
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
            <label
              id="listbox-label"
              className="block text-3xl font-light text-primary mb-4"
            >
              What are you looking for
            </label>
            <SelectDropdown itemList={resourceList}/>
          </div>
          <div className="md:col-span-1">
            <SearchButton />
          </div>
        </div>
        <div className="mt-2">
          <TabBar tabs={tabs} activeTab={activeTab} />
        </div>
        <div>
          <TabView children={children} activeTab={activeTab} />
        </div>
      </section>
    </Layout>
  );
};

export default Home;
