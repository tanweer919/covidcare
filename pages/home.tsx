import Layout from "../src/components/Layout";
import SearchBox from "../src/components/SearchBox";
import SelectDropdown from "../src/components/SelectDropdown";
import SearchButton from "../src/components/SearchButton";
import TabBar from "../src/components/TabBar";
import TabView from "../src/components/TabView";
import AvailableTab from "../src/components/AvailableTab";
import RequestTab from "../src/components/RequestTab";
import {
  TabInterface,
  SelectOption,
  AvailableResource,
} from "../src/interfaces/interface";
import { useEffect, useState } from "react";
import CityModal from "../src/components/CityModal";
import LocationService from "../src/services/LocationService";
import {
  FIRSTVISIT,
  LOCATIONPERMISSIONDENIED,
  SUCCESS,
  INFO,
  ERROR,
  resourceList,
  resourceTypeList,
} from "../src/constants/constants";
import { useRouter } from "next/router";
import { toast, ToastOptions } from "react-toastify";
const Home = (): JSX.Element => {
  const [activeTab, setActiveTab] = useState(0);
  const [currentCity, setCurrentCity] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [searchData, setSearchData] = useState({
    searchCity: "",
    type: 0,
    resourceType: 0,
    placeId: "",
  });
  const handleClick = (tab: number) => {
    setActiveTab(tab);
  };

  const router = useRouter();
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
    const firstVisit: boolean = JSON.parse(localStorage.getItem(FIRSTVISIT));
    const locationPermissionDenied: boolean = JSON.parse(
      localStorage.getItem(LOCATIONPERMISSIONDENIED)
    );
    const locationService = async () => {
      const locationService = new LocationService();
      try {
        const city = await locationService.getLocation();
        setCurrentCity(city);
      } catch (e) {
        console.log(e);
        if (e === GeolocationPositionError.PERMISSION_DENIED) {
          localStorage.setItem(LOCATIONPERMISSIONDENIED, JSON.stringify(true));
        }
        if (firstVisit !== false) {
          setShowModal(true);
        }
      }
    };
    if (locationPermissionDenied !== true) {
      locationService();
    }
    localStorage.setItem(FIRSTVISIT, JSON.stringify(false));
    const { message, type } = router.query;
    if (message) {
      const toastOption: ToastOptions = {
        position: "top-right",
        autoClose: 8000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
      };
      if (type === SUCCESS) {
        toast.dark(message, toastOption);
      } else if (type === ERROR) {
        toast.error(message, toastOption);
      } else {
        toast.info(message, toastOption);
      }
    }
  }, []);
  const handleSelectChange = (key: string, value: number) => {
    const newData = { ...searchData };
    newData[key] = value;
    setSearchData(newData);
  };

  const handleCitySelection = (city: string, placeId: string) => {
    setSearchData({ ...searchData, searchCity: city, placeId });
  };
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
              <SearchBox handleCitySelection={handleCitySelection} />
            </div>
            <div className="md:col-span-2">
              <label
                id="listbox-label"
                className="block text-3xl font-light text-primary mb-4"
              >
                What are you looking for
              </label>
              <SelectDropdown
                itemList={resourceList}
                keyName="type"
                handleSelectChange={handleSelectChange}
              />
            </div>
            <div className="md:col-span-1">
              <label
                id="listbox-label"
                className="block text-3xl font-light text-primary mb-4"
              >
                Resource Type
              </label>
              <SelectDropdown
                itemList={resourceTypeList}
                keyName="resourceType"
                handleSelectChange={handleSelectChange}
              />
            </div>
            <div className="md:col-span-1">
              <SearchButton searchData={searchData} />
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
