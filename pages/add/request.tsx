import AppBar from "../../src/components/AppBar";
import SelectDropdown from "../../src/components/SelectDropdown";
import { SelectOption } from "../../src/interfaces/interface";
import Layout from "../../src/components/Layout"
const RequestForm = () => {
  const resourceList: SelectOption[] = [
    { label: "Oxygen", value: 0, icon: "/images/oxygen.svg" },
    { label: "Hospital Beds", value: 1, icon: "/images/hospital-bed.svg" },
    { label: "Medicines/Injections", value: 2, icon: "/images/medicine.svg" },
    { label: "Testing", value: 3, icon: "/images/blood-test.svg" },
    { label: "Blood", value: 4, icon: "/images/blood-drop.svg" },
    { label: "Ambulance", value: 5, icon: "/images/ambulance.svg" },
  ];

  return (
    <>
      <AppBar label="Request resource" />
      <Layout selectedKey={0}>
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
            <h2 className="text-textgray">Resource type</h2>
            <SelectDropdown itemList={resourceList} />
          </div>
          <div className="flex flex-col gap-y-2">
            <h2 className="text-textgray">Your address</h2>
            <input
              className="w-full bg-gray300 p-4 rounded-md"
              type="text"
              name=""
              id=""
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <h2 className="text-textgray">Contact name</h2>
            <input
              className="w-full bg-gray300 p-4 rounded-md"
              type="text"
              name=""
              id=""
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <h2 className="text-textgray">Phone number</h2>
            <input
              className="w-full bg-gray300 p-4 rounded-md"
              type="text"
              name=""
              id=""
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <h2 className="text-textgray">Quantity of the requirement</h2>
            <input
              className="w-full bg-gray300 p-4 rounded-md"
              type="text"
              name=""
              id=""
            />
          </div>
          <div>
            <button className="bg-primary rounded-md md:rounded-full w-full p-2 text-4xl text-white">
              Submit
            </button>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default RequestForm;
