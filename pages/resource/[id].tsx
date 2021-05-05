import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ResourceDetail from "../../src/components/ResourceDetail"
const Resource = (): JSX.Element => {
  const router = useRouter();
  const [resourceId, setResourceId] = useState<number | null>(null);
  useEffect(() => {
    if (router.isReady) {
      const { id } = router.query;
      setResourceId(+id);
    }
  }, []);

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
      <ResourceDetail />
    </div>
  );
};

export default Resource;
