import SelectItem from "./SelectItem";
import { ResourceList } from "../interfaces/interface";
import { useState } from "react";
const ResourceSelect = (): JSX.Element => {
  const resourceList: ResourceList[] = [
    { label: "Oxygen", value: 0, icon: "/images/oxygen.svg" },
    { label: "Hospital Beds", value: 1, icon: "/images/hospital-bed.svg" },
    { label: "Medicines/Injections", value: 2, icon: "/images/medicine.svg" },
    { label: "Testing", value: 3, icon: "/images/blood-test.svg" },
    { label: "Blood", value: 4, icon: "/images/blood-drop.svg" },
    { label: "Ambulance", value: 5, icon: "/images/ambulance.svg" },
  ];

  const [selectedResource, setSelectedResource] = useState(resourceList[0]);
  const [focus, setFocus] = useState(false);
  const onChange = (resource: ResourceList) => {
    setSelectedResource(resource);
    setFocus(false);
  };

  const onSelectClick = () => {
    setFocus(true);
  };
  return (
    <div>
      <label
        id="listbox-label"
        className="block text-2xl font-medium text-gray-700"
      >
        What are you looking for
      </label>
      <div className="mt-1 relative">
        <button
          type="button"
          className="h-14 relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
          aria-haspopup="listbox"
          aria-expanded="true"
          aria-labelledby="listbox-label"
          onClick={onSelectClick}
        >
          <span className="flex items-center">
            <img
              src={selectedResource.icon}
              alt={selectedResource.label}
              className="flex-shrink-0 h-8 w-8"
            />
            <span className="ml-3 block truncate text-2xl">
              {selectedResource.label}
            </span>
          </span>
          <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <svg
              className="h-5 w-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            </svg>
          </span>
        </button>

        {focus && <ul
          className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-70 rounded-md py-1 text-2xl ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
          tabIndex={-1}
          role="listbox"
          aria-labelledby="listbox-label"
          aria-activedescendant="listbox-option-3"
        >
          {resourceList.map((resource) => (
            <SelectItem
              resource={resource}
              key={resource.value}
              onChange={onChange}
              isSelected={selectedResource.value === resource.value}
            />
          ))}
        </ul>}
      </div>
    </div>
  );
};

export default ResourceSelect;