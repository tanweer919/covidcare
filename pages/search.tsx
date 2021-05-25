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
        <>
          <div className="m-4">
            <h2 className="text-4xl text-textgray flex flex-row justify-start gap-x-2 items-center">
              <span>Search result for</span>
              <div className="text-3xl text-black p-2 bg-gray400">
                {resourceList[type].label}
              </div>
              <span>around</span>
              <div className="text-3xl text-black p-2 bg-gray400">{city}</div>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {resources ? (
              resources.map((resource, i) => (
                <ResourceCard key={i} resource={resource} type={resourceType} />
              ))
            ) : (
              <div></div>
            )}
          </div>
        </>
      </Layout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  console.log(context.query);
  const city: string = Array.isArray(context.query?.city)
    ? context.query?.city[0]
    : context.query?.city;
  const placeId: string = Array.isArray(context.query?.placeId)
    ? context.query?.placeId[0]
    : context.query?.placeId;
  const type: string = Array.isArray(context.query?.type)
    ? context.query?.type[0]
    : context.query?.type;
  const resourceType: string = Array.isArray(context.query?.resourceType)
    ? context.query?.resourceType[0]
    : context.query?.resourceType;
  let response: AvailableResource[] | ResourceRequest[];
  if (resourceType === AVAILABLERESOURCE) {
    response = await ResourceService.searchAvailableResources(placeId, +type);
  }
  if (resourceType === RESOURCEREQUEST) {
    response = await ResourceService.searchResourceRequests(placeId, +type);
  }
  return {
    props: { type: +type, city, resources: response, resourceType },
  };
};

export default SearchPage;
