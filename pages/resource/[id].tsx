import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Resource = (): JSX.Element => {
  const router = useRouter();
  const [resourceId, setResourceId] = useState<number | null>(null);
  const [liked, setLiked] = useState<boolean | null>(null);
  const [totalLike, setTotalLike] = useState(0);
  useEffect(() => {
    if (router.isReady) {
      const { id } = router.query;
      setResourceId(+id);
    }
  }, []);

  const handleClick = (liked: boolean) => {
    setLiked(liked);
    setTotalLike(totalLike + (liked ? 1 : -1));
  };

  return (
    <div>
      <div className="flex justify-start items-center p-4 relative border-b border-gray400">
        <div className="bg-gray400 p-2 rounded-2xl absolute">
          <img
            src="/images/chevron-left.svg"
            alt="chevron-left"
            className="h-8"
          />
        </div>
        <div className="text-3xl flex-grow flex justify-center">
          Available Resource
        </div>
      </div>
      <div className="px-4 mt-4">
        <div className="flex justify-end">
          <div className="p-2 px-4 text-white text-xl rounded-full bg-secondary flex justify-center items-center gap-x-2">
            <span>
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
            </span>
            <span>Verified</span>
          </div>
        </div>
        <h1 className="text-5xl font-medium">Oxygen Cylinder</h1>
        <div className="flex justify-between items-center -mt-4">
          <h2 className="text-4xl text-textgray">Oxygen</h2>
          <div className="flex justify-end gap-x-4 items-center flex-grow-0 border-l-2 border-gray300 p-4 gap-y-2">
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
                className={`h-8${
                  !(liked === true) ? " icon-avatar-color" : ""
                }`}
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
                className={`h-8${
                  !(liked === false) ? " icon-avatar-color" : ""
                }`}
              />
              {totalLike < 0 && (
                <div className="flex justify-center items-center bg-secondary rounded-full h-8 w-8 text-white text-xl absolute -bottom-4 left-8">
                  <span className="text-lg">{totalLike}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resource;
