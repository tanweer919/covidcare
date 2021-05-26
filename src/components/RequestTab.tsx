import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { RESOURCEREQUEST } from "../constants/constants";
import { ResourceRequest } from "../interfaces/interface";
import ResourceService from "../services/ResourceService";
import ResourceCard from "./ResourceCard";
import ResourceCardSkelton from "./ResourceCardSkelton";
const RequestTab = (): JSX.Element => {
  const router = useRouter();
  const [loaded, setLoaded] = useState(false);
  const [resourceRequests, setAvailableResources] =
    useState<ResourceRequest[] | null>(null);

  useEffect(() => {
    const fetchAllResourceRequests = async () => {
      const response = await ResourceService.fetchAllResourceRequests();
      setAvailableResources(response);
      setLoaded(true);
    };
    fetchAllResourceRequests();
  }, []);
  const items = new Array(10).fill(null);
  return (
    <div className="mt-4 min-h-full flex flex-col">
      <div className="flex justify-end px-4">
        <div
          className="rounded-full p-4 bg-secondary text-white text-xl hover:bg-secondaryHover hover:cursor-pointer div-cursor"
          onClick={() => {
            router.push("/request/add/");
          }}
        >
          Request resource
        </div>
      </div>
      {loaded ? (
        resourceRequests ? (
          resourceRequests.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {resourceRequests.map((resource, i) => (
                <ResourceCard
                  key={i}
                  resource={resource}
                  type={RESOURCEREQUEST}
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
                Unable to find any resource requests near you
              </span>
            </div>
          )
        ) : (
          <div className="flex justify-center items-center flex-col gap-y-4 flex-grow">
            <img src="/images/empty.svg" alt="empty" className="h-1/2 w-1/2" />
            <span className="text-4xl text-textgray text-center">
              Unable to find any resource requests near you
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

export default RequestTab;
