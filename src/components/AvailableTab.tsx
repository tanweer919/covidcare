import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AVAILABLERESOURCE } from "../constants/constants";
import { AvailableResource } from "../interfaces/interface";
import ResourceService from "../services/ResourceService";
import ResourceCard from "./ResourceCard";
import ResourceCardSkelton from "./ResourceCardSkelton";
const AvailableTab = (): JSX.Element => {
  const router = useRouter();
  const [loaded, setLoaded] = useState(false);
  const [availableResources, setAvailableResources] =
    useState<AvailableResource[] | null>(null);

  useEffect(() => {
    const fetchAllAvailableResource = async () => {
      const response = await ResourceService.fetchAllAvailableResources();
      setAvailableResources(response);
      setLoaded(true);
    };
    fetchAllAvailableResource();
  }, []);
  const items = new Array(10).fill(null);
  return (
    <div className="mt-4 min-h-full flex flex-col">
      <div className="flex justify-end px-4">
        <div
          className="rounded-full p-4 bg-secondary text-white text-xl hover:bg-secondaryHover hover:cursor-pointer div-cursor"
          onClick={() => {
            router.push("/available/add/");
          }}
        >
          Add available resource
        </div>
      </div>
      {loaded ? (
        availableResources ? (
          availableResources.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {availableResources.map((resource, i) => (
                <ResourceCard
                  key={i}
                  resource={resource}
                  type={AVAILABLERESOURCE}
                />
              ))}
            </div>
          ) : (
            <div className="flex justify-center items-center flex-col gap-y-4 flex-grow">
              <img
                src="/images/empty.svg"
                alt="empty"
                className="h-1/2 w-1/2"
              />
              <span className="text-4xl text-textgray text-center">
                Unable to find any available resources near you
              </span>
            </div>
          )
        ) : (
          <div className="flex justify-center items-center flex-col gap-y-4 flex-grow">
            <img src="/images/empty.svg" alt="empty" className="h-1/2 w-1/2" />
            <span className="text-4xl text-textgray text-center">
              Unable to find any available resources near you
            </span>
          </div>
        )
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((e, i) => (
            <ResourceCardSkelton key={i} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AvailableTab;
