const ResourceCard = (): JSX.Element => {
  return (
    <div className="flex px-4 py-8 rounded-3xl shadow-lg">
      <div className="flex flex-col flex-grow-0 border-r-2 border-gray300 p-4">
        <span className="text-2xl">8 March</span>
        <span className="text-2xl">8:00 PM</span>
      </div>
      <div className="flex align-middle justify-start flex-grow p-4 gap-4">
        <div className="p-4 rounded-full icon-avatar">
          <img
            src="/images/oxygen.svg"
            alt="blood"
            className="h-8 icon-avatar-color"
          />
        </div>
        <div className="flex flex-col">
          <span className="text-3xl">Oxygen</span>
          <span className="text-2xl">Koderma</span>
        </div>
      </div>
      <div className="flex flex-col flex-grow-0 border-l-2 border-gray300 p-4">
        <span className="text-2xl">8 March</span>
        <span className="text-2xl">8:00 PM</span>
      </div>
    </div>
  );
};

export default ResourceCard;
