import SelectItem from "./SelectItem";
import { SelectOption } from "../interfaces/interface";
import { MutableRefObject, useEffect, useRef, useState } from "react";
const SelectDropdown = ({itemList}: {itemList: SelectOption[]}): JSX.Element => {
  const box = useRef(null);

  const [selectedOption, setSelectedOption] = useState(itemList[0]);
  const [focus, setFocus] = useState(false);
  const handleChange = (option: SelectOption) => {
    setSelectedOption(option);
    setFocus(false);
  };

  const handleSelectClick = () => {
    setFocus(true);
  };

  const handleFocusOut = (ref: MutableRefObject<any>) => {
    useEffect(() => {
      // Function for click event
      function handleOutsideClick(event: MouseEvent): any {
        if (ref.current && !ref.current.contains(event.target)) {
          setFocus(false);
        }
      }

      // Adding click event listener
      document.addEventListener("click", handleOutsideClick);
    }, [ref]);
  };
  handleFocusOut(box);
  return (
    <div className="mt-1 relative" ref={box}>
      <button
        type="button"
        className="h-14 relative w-full bg-white border border-gray300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-secondary"
        aria-haspopup="listbox"
        aria-expanded="true"
        aria-labelledby="listbox-label"
        onClick={handleSelectClick}
      >
        <span className="flex items-center">
          <img
            src={selectedOption.icon}
            alt={selectedOption.label}
            className="flex-shrink-0 h-8 w-8"
          />
          <span className="ml-3 block truncate text-2xl">
            {selectedOption.label}
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

      {focus && (
        <ul
          className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-70 rounded-md py-1 text-2xl ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
          tabIndex={-1}
          role="listbox"
          aria-labelledby="listbox-label"
          aria-activedescendant="listbox-option-3"
        >
          {itemList.map((option, i) => (
            <SelectItem
              option={option}
              key={option.value}
              onChange={handleChange}
              isSelected={selectedOption.value === option.value}
              key={i}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default SelectDropdown;
