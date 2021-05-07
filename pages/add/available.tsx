import AppBar from "../../src/components/AppBar";

const AvailableForm = () => {
  return (
    <div>
      <AppBar label="Add available resource" />
      <div className="p-4 text-2xl grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-y-2">
          <h2 className="text-textgray">Name of the resource</h2>
          <input
            className="w-full bg-gray300 p-4 rounded-md"
            type="text"
            name=""
            id=""
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <h2 className="text-textgray">Name of the resource</h2>
          <input
            className="w-full bg-gray300 p-4 rounded-md"
            type="text"
            name=""
            id=""
          />
        </div>
      </div>
    </div>
  );
};

export default AvailableForm;
