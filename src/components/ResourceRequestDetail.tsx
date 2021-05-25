import { useState } from "react";
import { resourceList } from "../constants/constants";
import { AvailableResource, ResourceRequest } from "../interfaces/interface";

const ResourceRequestDetail = ({ resource }: { resource: ResourceRequest }) => {
  const [liked, setLiked] = useState<boolean | null>(null);
  const [totalLike, setTotalLike] = useState(resource.like);
  const handleClick = (liked: boolean) => {
    setLiked(liked);
    setTotalLike(totalLike + (liked ? 1 : -1));
  };
  return (
    <div className="p-4 border-b border-gray400">
      <h1 className="text-5xl font-medium">{resource.name}</h1>
      <div className="flex justify-between items-center -mt-4">
        <h2 className="text-4xl text-textgray">
          {resourceList[resource.type].label}
        </h2>
        <div className="flex justify-end gap-x-4 items-center flex-grow-0 p-4 gap-y-2">
          <div
            onClick={() => {
              handleClick(true);
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
              <div className="flex justify-center items-center bg-secondary rounded-full h-8 w-8 text-white absolute -top-4 left-8">
                <span className="text-lg">{totalLike}</span>
              </div>
            )}
          </div>
          <div
            onClick={() => {
              handleClick(false);
            }}
            className="relative mt-4"
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
              <div className="flex justify-center items-center bg-secondary rounded-full h-8 w-8 text-white text-xl absolute -bottom-4 left-8">
                <span className="text-lg">{totalLike}</span>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="mt-2">
        <div className="text-3xl text-textgray">Quantity Required</div>
        <div className="text-3xl">{resource.quantity}</div>
      </div>
      <div className="mt-2">
        <div className="text-3xl text-textgray">Address</div>
        <div className="text-3xl">{resource.address}</div>
      </div>
      <div className="flex justify-between mt-2">
        <div>
          <div className="text-3xl text-textgray">Contact Name</div>
          <div className="text-3xl">
            <span>{resource.contactName}</span>
          </div>
        </div>
      </div>
      <div className="flex justify-between mt-2">
        <div>
          <div className="text-3xl text-textgray">Contact no.</div>
          <div className="text-3xl">
            <span>{resource.phoneNumber}</span>
          </div>
        </div>
        <div className="rounded-full bg-gray400 p-3 h-12 w-12">
          <img src="/images/phone.svg" alt="phone" />
        </div>
      </div>
      {resource.description && (
        <div className="mt-2">
          <div className="text-3xl text-textgray">Description</div>
          <div className="text-2xl">{resource.description}</div>
        </div>
      )}
    </div>
  );
};

export default ResourceRequestDetail;
