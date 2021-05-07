import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ResourceDetail from "../../src/components/ResourceDetail";
import { DiscussionEmbed } from "disqus-react";
import AppBar from "../../src/components/AppBar";
const Resource = (): JSX.Element => {
  const router = useRouter();
  const [resourceId, setResourceId] = useState<number | null>(null);
  const [url, setUrl] = useState("");
  useEffect(() => {
    if (router.isReady) {
      console.log(router.query);
      const { id } = router.query;
      setResourceId(+id);
      setUrl(`${process.env.NEXT_PUBLIC_BASE_URL}${router.asPath}`);
    }
  }, []);

  return (
    <div>
      <AppBar label="Available Resource" />
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
