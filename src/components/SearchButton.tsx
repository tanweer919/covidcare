import { useRouter } from "next/router";
import { useState } from "react";
import { AVAILABLERESOURCE, RESOURCEREQUEST } from "../constants/constants";
import LoadingSpinner from "./LoadingSpinner";
const SearchButton = ({
  searchData,
}: {
  searchData: {
    searchCity: string;
    type: number;
    resourceType: number;
    placeId: string;
  };
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const handleClick = () => {
    setIsLoading(true);
    router.push(
      {
        pathname: "/search",
        query: {
          city: searchData.searchCity,
          type: searchData.type,
          resourceType:
            searchData.resourceType === 0 ? AVAILABLERESOURCE : RESOURCEREQUEST,
          placeId: searchData.placeId,
        },
      },
      "/search"
    );
    setIsLoading(false);
  };
  return (
    <div>
      <button
        className="bg-primary rounded-md md:rounded-full w-full p-2 text-4xl text-white flex justify-center"
        onClick={handleClick}
        disabled={searchData.searchCity === ""}
      >
        {isLoading ? <LoadingSpinner /> : <span>Search</span>}
      </button>
    </div>
  );
};

export default SearchButton;
