import { useEffect } from "react";
import { FormErrors } from "../interfaces/interface";
const FormInput = ({
  name,
  label,
  value,
  handleChange,
  isRequired,
  errors,
}: {
  name: string;
  label: string;
  value: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isRequired: boolean;
  errors: FormErrors;
}): JSX.Element => {
  return (
    <div className="flex flex-col">
      <label className="text-textgray mb-2" htmlFor={name}>
        {label}
        {isRequired && <span className="text-2xl text-textred">*</span>}
      </label>
      <input
        className={`w-full bg-gray300 p-4 rounded-md border ${
          errors[name] ? "border-textred" : "border-gray400"
        }`}
        type="text"
        name={name}
        id={name}
        value={value}
        onChange={handleChange}
      />
      {errors[name] && <div className="text-textred">{errors[name]}</div>}
    </div>
  );
};

export default FormInput;
