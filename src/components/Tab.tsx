import { MouseEventHandler } from "react";

const Tab = ({
  label,
  isActive,
  onClick,
}: {
  label: string;
  isActive: boolean;
  onClick: () => void;
}): JSX.Element => {
  const handleClick = () => {
    onClick();
  };
  return (
      <div
        className={`flex justify-center hover:cursor-pointer text-3xl p-4 cursor-pointer${
          isActive ? " border-secondary border-b-2 text-secondary" : ""
        }`}
        onClick={handleClick}
      >
        <span>{label}</span>
      </div>
  );
};

export default Tab;
