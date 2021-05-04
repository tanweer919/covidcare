const ResourceCardSkelton = () => {
  return (
    <div className="flex px-4 py-8 rounded-3xl shadow-lg">
      <div className="flex flex-col flex-grow-0 border-r-2 border-gray400 w-24 p-4">
        <div className="animate-pulse h-16 bg-gray400"></div>
      </div>
      <div className="flex items-center justify-start flex-grow p-4 gap-4">
        <div className="animate-pulse h-16 w-16 rounded-full flex-grow-0 bg-gray400"></div>
        <div className="flex flex-col flex-grow gap-y-2">
          <div className="animate-pulse h-10 bg-gray400"></div>
          <div className="animate-pulse h-6 bg-gray400"></div>
        </div>
      </div>
      <div className="flex flex-col flex-grow-0 border-l-2 border-gray400 p-4 w-24">
        <div className="animate-pulse h-16 bg-gray400"></div>
      </div>
    </div>
  );
};

export default ResourceCardSkelton;
