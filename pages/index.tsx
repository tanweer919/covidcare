import Layout from "../src/components/Layout";
import SearchBox from "../src/components/SearchBox";
import SelectDropdown from "../src/components/SelectDropdown";
import SearchButton from "../src/components/SearchButton";
import TabBar from "../src/components/TabBar";
import TabView from "../src/components/TabView";
import AvailableTab from "../src/components/AvailableTab";
import RequestTab from "../src/components/RequestTab";
import { TabInterface, SelectOption } from "../src/interfaces/interface";
import { useEffect, useState } from "react";
import CityModal from "../src/components/CityModal";
import LocationService from "../src/services/LocationService";
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
  const [currentCity, setCurrentCity] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
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
  useEffect(() => {
    const firstVisit: boolean = JSON.parse(localStorage.getItem("firstVisit"));
    const locationPermissionDenied: boolean = JSON.parse(
      localStorage.getItem("locationPermissionDenied")
    );
    const locationService = async () => {
      const locationService = new LocationService();
      try {
        const city = await locationService.getLocation();
        setCurrentCity(city);
      } catch (e) {
        console.log(e);
        if (e === GeolocationPositionError.PERMISSION_DENIED) {
          localStorage.setItem(
            "locationPermissionDenied",
            JSON.stringify(true)
          );
        }
        if (firstVisit !== false) {
          setShowModal(true);
        }
      }
    };
    if (locationPermissionDenied !== true) {
      locationService();
    }
    localStorage.setItem("firstVisit", JSON.stringify(false));
  }, []);
  return (
    <>
      <Layout selectedKey={0}>
        <section>
          <div className="flex md:hidden logo-small-box">
            <img
              className="logo-small"
              src="/images/logo_large.png"
              alt="logo"
            />
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
              <SelectDropdown itemList={resourceList} />
            </div>
            <div className="md:col-span-1">
              <SearchButton />
            </div>
          </div>
          {currentCity && (
            <div className="flex justify-start mt-4 items-center">
              <div className="text-textgray text-3xl">Current Location: </div>
              <div className="text-3xl flex justify-between items-center gap-x-1">
                <span>
                  <img
                    src="/images/location.svg"
                    alt="location"
                    className="h-6"
                  />
                </span>
                <span>{currentCity}</span>
              </div>
            </div>
          )}
          <div className="mt-2">
            <TabBar tabs={tabs} activeTab={activeTab} />
          </div>
          <div>
            <TabView children={children} activeTab={activeTab} />
          </div>
        </section>
      </Layout>
      {showModal && (
        <CityModal
          setShowModal={setShowModal}
          setCurrentCity={setCurrentCity}
        />
      )}
    </>
  );
};

export default Home;
