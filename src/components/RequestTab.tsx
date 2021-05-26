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
    <div className="mt-4">
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {loaded ? (
          resourceRequests ? (
            resourceRequests.length > 0 ? (
              resourceRequests.map((resource, i) => (
                <ResourceCard
                  key={i}
                  resource={resource}
                  type={RESOURCEREQUEST}
                />
              ))
            ) : (
              <div className="h-screen w-screen flex justify-center items-center flex-col gap-y-4">
                <img
                  src="/images/empty.svg"
                  alt="empty"
                  className="h-2/5 w-2/5"
                />
                <span className="text-4xl text-textgray text-center">
                  Unable to find any resource requests near you
                </span>
              </div>
            )
          ) : (
            <div>
              <div className="h-screen w-screen flex justify-center items-center flex-col gap-y-4">
                <img
                  src="/images/empty.svg"
                  alt="empty"
                  className="h-2/5 w-2/5"
                />
                <span className="text-4xl text-textgray text-center">
                  Unable to find any resource requests near you
                </span>
              </div>
            </div>
          )
        ) : (
          items.map((e, i) => <ResourceCardSkelton key={i} />)
        )}
      </div>
    </div>
  );
};

export default RequestTab;
