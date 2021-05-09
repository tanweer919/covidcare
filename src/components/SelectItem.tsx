import { SelectOption } from "../interfaces/interface";

const SelectItem = ({
  option,
  onChange,
  isSelected,
}: {
  option: SelectOption;
  onChange: (option: SelectOption) => void;
  isSelected: boolean;
}): JSX.Element => {
  const onClick = () => {
    onChange(option);
  };
  return (
    <li
      className="text-gray-900 cursor-default select-none relative py-4 pl-3 pr-9"
      id="listbox-option-0"
      role="option"
      onClick={onClick}
    >
      <div className="flex items-center">
        <img
          src={option.icon}
          alt={option.label}
          className="flex-shrink-0 h-8 w-8"
        />
        <span className="font-normal ml-3 block truncate md:text-2xl">{option.label}</span>
      </div>

      {isSelected && (
        <span className="text-secondary absolute inset-y-0 right-0 flex items-center pr-4">
          <svg
            className="h-8 w-8"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clip-rule="evenodd"
            />
          </svg>
        </span>
      )}
    </li>
  );
};

export default SelectItem;
