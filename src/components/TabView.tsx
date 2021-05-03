import ResourceCard from "./ResourceCard";
const TabView = (): JSX.Element => {
  const items = new Array(10).fill(null);
  return (
    <div className="mt-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {items.map((e, i) => (
          <ResourceCard key={i} />
        ))}
      </div>
    </div>
  );
};

export default TabView;
