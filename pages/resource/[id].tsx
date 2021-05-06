import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ResourceDetail from "../../src/components/ResourceDetail"
import {DiscussionEmbed} from "disqus-react"
const Resource = (): JSX.Element => {
  const router = useRouter();
  const [resourceId, setResourceId] = useState<number | null>(null);
  const [url, setUrl] = useState("");
  useEffect(() => {
    if (router.isReady) {
      console.log(router.query)
      const { id } = router.query;
      setResourceId(+id);
      setUrl(`${process.env.NEXT_PUBLIC_BASE_URL}${router.asPath}`);
    }
  }, []);

  const handleBackButtonClick = () => {
    router.push('/');
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
      <div className="px-4">
        {resourceId !== null && (
          <DiscussionEmbed
            shortname={process.env.NEXT_PUBLIC_DISCUSS_SHORT_NAME}
            config={{
              url: url,
              identifier: `${resourceId}`,
              title: "Oxygen",
              language: "en",
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Resource;
