import { useState } from "react";
import { useRouter } from "next/router";
import { AvailableResource, ResourceRequest } from "../interfaces/interface";
import {
  AVAILABLERESOURCE,
  resourceList,
  RESOURCEREQUEST,
} from "../constants/constants";
const ResourceCard = ({
  resource,
  type,
}: {
  resource: AvailableResource | ResourceRequest;
  type: string;
}): JSX.Element => {
  const router = useRouter();
  const [liked, setLiked] = useState<boolean | null>(null);
  const [totalLike, setTotalLike] = useState(0);
  const handleClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    liked: boolean
  ) => {
    e.stopPropagation();
    setLiked(liked);
    setTotalLike(totalLike + (liked ? 1 : -1));
  };
  const handleCardClick = () => {
    if (type === AVAILABLERESOURCE) {
      router.push(`/available/${resource._id}`);
    }
    if (type === RESOURCEREQUEST) {
      router.push(`/request/${resource._id}`);
    }
  };
  return (
    <div
      className="flex px-4 py-4 rounded-3xl shadow-lg cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="flex flex-col flex-grow-0 border-r-2 border-gray300 p-4">
        <span className="text-xl">8 March</span>
        <span className="text-xl">8:00 PM</span>
      </div>
      <div className="flex items-center justify-start flex-grow p-4 gap-4">
        <div className="h-16 w-16 p-4 rounded-full icon-avatar flex-grow-0">
          <img
            src={resourceList[resource.type].icon}
            alt={resourceList[resource.type].label}
            className="icon-avatar-color"
          />
        </div>
        <div className="flex flex-col flex-grow">
          <span className="text-3xl">{resource.name}</span>
          <span className="text-2xl text-textgray">{resource.city}</span>
          <div className="text-2xl text-textgray flex justify-start mt-2 gap-x-2">
            <div className="rounded-full bg-gray400 p-2 h-8 w-8">
              <img src="/images/phone.svg" alt="phone" />
            </div>
            <span>{resource.phoneNumber}</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col flex-grow-0 border-l-2 border-gray300 p-4 gap-y-4">
        <div
          onClick={(e) => {
            handleClick(e, true);
          }}
          className="relative"
        >
          <img
            src={
              liked === true
                ? "/images/thumbs-up-filled.png"
                : "/images/thumbs-up.png"
            }
            alt="blood"
            className={`h-8${!(liked === true) ? " icon-avatar-color" : ""}`}
          />
          {totalLike > 0 && (
            <div className="flex justify-center items-center bg-secondary rounded-full h-6 w-6 text-white absolute -top-4 left-8">
              <span className="text-lg">{totalLike}</span>
            </div>
          )}
        </div>
        <div
          onClick={(e) => {
            handleClick(e, false);
          }}
          className="relative"
        >
          <img
            src={
              liked === false
                ? "/images/thumbs-down-filled.png"
                : "/images/thumbs-down.png"
            }
            alt="blood"
            className={`h-8${!(liked === false) ? " icon-avatar-color" : ""}`}
          />
          {totalLike < 0 && (
            <div className="flex justify-center items-center bg-secondary rounded-full h-6 w-6 text-white text-xl absolute -bottom-4 left-8">
              <span className="text-lg">{totalLike}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResourceCard;
