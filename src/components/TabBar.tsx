const TabBar = (): JSX.Element => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 border-b border-primary">
      <div className="flex justify-center text-3xl p-4 border-secondary border-b-2 text-secondary">
        <span>Available</span>
      </div>
      <div className="flex justify-center text-3xl p-4">
        <span>Request</span>
      </div>
    </div>
  );
};

export default TabBar;
