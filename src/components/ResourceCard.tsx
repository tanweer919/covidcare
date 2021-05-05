import { useState } from "react";

const ResourceCard = (): JSX.Element => {
  const [liked, setLiked] = useState<boolean | null>(null);
  const [totalLike, setTotalLike] = useState(0)
  const handleClick = (liked: boolean) => {
    setLiked(liked);
    setTotalLike(totalLike + (liked ? 1 : -1))
  };
  return (
    <div className="flex px-4 py-8 rounded-3xl shadow-lg">
      <div className="flex flex-col flex-grow-0 border-r-2 border-gray300 p-4">
        <span className="text-xl">8 March</span>
        <span className="text-xl">8:00 PM</span>
      </div>
      <div className="flex items-center justify-start flex-grow p-4 gap-4">
        <div className="h-16 w-16 p-4 rounded-full icon-avatar flex-grow-0">
          <img
            src="/images/oxygen.svg"
            alt="blood"
            className="icon-avatar-color"
          />
        </div>
        <div className="flex flex-col flex-grow">
          <span className="text-3xl">Oxygen</span>
          <span className="text-2xl text-textgray">Koderma</span>
        </div>
      </div>
      <div className="flex flex-col flex-grow-0 border-l-2 border-gray300 p-4 gap-y-2">
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
            className={`h-10${!(liked === true) ? " icon-avatar-color" : ""}`}
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
          className="relative"
        >
          <img
            src={
              liked === false
                ? "/images/thumbs-down-filled.png"
                : "/images/thumbs-down.png"
            }
            alt="blood"
            className={`h-10${!(liked === false) ? " icon-avatar-color" : ""}`}
          />
          {totalLike < 0 && (
            <div className="flex justify-center items-center bg-secondary rounded-full h-8 w-8 text-white text-xl absolute -bottom-4 left-8">
              <span className="text-lg">{totalLike}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResourceCard;
