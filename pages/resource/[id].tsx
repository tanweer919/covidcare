import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ResourceDetail from "../../src/components/ResourceDetail"
import {DiscussionEmbed} from "disqus-react"
const Resource = (): JSX.Element => {
  const router = useRouter();
  const [resourceId, setResourceId] = useState<number | null>(null);
  useEffect(() => {
    if (router.isReady) {
      console.log(router.query)
      const { id } = router.query;
      setResourceId(+id);
    }
  }, []);

  const handleBackButtonClick = () => {
    router.back();
  };

  return (
    <div>
      <div className="flex justify-start items-center p-4 relative border-b border-gray400">
        <div
          className="bg-gray400 p-2 rounded-2xl absolute"
          onClick={handleBackButtonClick}
        >
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
      <ResourceDetail />
      <DiscussionEmbed
        shortname={process.env.DISCUSS_SHORT_NAME}
        config={{
          url: `http://localhost:3000${router.asPath}`,
          identifier: `${resourceId}`,
          title: "Oxygen",
          language: "en",
        }}
      />
    </div>
  );
};

export default Resource;
