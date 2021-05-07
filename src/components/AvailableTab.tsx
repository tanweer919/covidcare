import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ResourceCard from "./ResourceCard";
import ResourceCardSkelton from "./ResourceCardSkelton";
const AvailableTab = (): JSX.Element => {
  const router = useRouter();
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoaded(true);
    }, 3000);
  }, []);
  const items = new Array(10).fill(null);
  return (
    <div className="mt-4">
      <div className="flex justify-end px-4">
        <div
          className="rounded-full p-4 bg-secondary text-white text-xl hover:bg-secondaryHover"
          onClick={() => {
            router.push("/add/available/");
          }}
        >
          Add available resource
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {loaded
          ? items.map((e, i) => <ResourceCard key={i} />)
          : items.map((e, i) => <ResourceCardSkelton key={i} />)}
      </div>
    </div>
  );
};

export default AvailableTab;
