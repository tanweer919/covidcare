import Layout from "../src/components/Layout";
import AppBar from "../src/components/AppBar";
import ResourceCard from "../src/components/ResourceCard";
import {
  AvailableResource,
  ResourceRequest,
} from "../src/interfaces/interface";
import { GetServerSideProps } from "next";
import ResourceService from "../src/services/ResourceService";
import {
  AVAILABLERESOURCE,
  resourceList,
  RESOURCEREQUEST,
} from "../src/constants/constants";
import Error from "next/error";
const SearchPage = ({
  resources,
  city,
  type,
  resourceType,
}: {
  resources: AvailableResource[] | ResourceRequest[];
  city: string;
  type: number;
  resourceType: string;
}): JSX.Element => {
  return (
    <>
      <AppBar label="Search Result" />
      <Layout selectedKey={0} displayBottomNavbar={false}>
        {city !== null && type != null && resourceType != null ? (
          <>
            <div className="my-4">
              <h2 className="text-4xl text-textgray flex flex-row justify-start gap-x-2 items-center">
                <span>Search</span>
                <span>result</span>
                <span>for</span>
                <div className="text-3xl text-black p-2 bg-gray400">
                  {resourceList[type].label}
                </div>
                <span>around</span>
                <div className="text-3xl text-black p-2 bg-gray400">{city}</div>
              </h2>
            </div>
            <div className="text-textgray text-3xl">
              {resources.length} results returned
            </div>
            {resources.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {resources.map((resource, i) => (
                  <ResourceCard
                    key={i}
                    resource={resource}
                    type={resourceType}
                  />
                ))}
              </div>
            ) : (
              <div className="h-full flex justify-center items-center flex-col gap-y-4">
                <img
                  src="/images/empty.svg"
                  alt="empty"
                  className="h-1/2 w-1/2"
                />
                <span className="text-4xl text-textgray text-center">
                  No result matched your query
                </span>
              </div>
            )}
          </>
        ) : (
          <Error statusCode={400} />
        )}
      </Layout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  query,
  res,
}) => {
  const city: string = query?.city
    ? Array.isArray(query?.city)
      ? query?.city[0]
      : query?.city
    : null;
  const placeId: string = query?.placeId
    ? Array.isArray(query?.placeId)
      ? query?.placeId[0]
      : query?.placeId
    : null;
  const type: string = query?.type
    ? Array.isArray(query?.type)
      ? query?.type[0]
      : query?.type
    : null;
  const resourceType: string = query?.resourceType
    ? Array.isArray(query?.resourceType)
      ? query?.resourceType[0]
      : query?.resourceType
    : null;
  try {
    let response: AvailableResource[] | ResourceRequest[] = [];
    if (resourceType === AVAILABLERESOURCE) {
      response = await ResourceService.searchAvailableResources(placeId, +type);
    }
    if (resourceType === RESOURCEREQUEST) {
      response = await ResourceService.searchResourceRequests(placeId, +type);
    }
    return {
      props: { type: +type, city, resources: response, resourceType },
    };
  } catch (e) {
    res.statusCode = 404;
    return {
      props: { type: +type, city, resources: [], resourceType },
    };
  }
};

export default SearchPage;
