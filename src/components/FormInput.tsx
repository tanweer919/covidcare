import { FormErrors } from "../interfaces/interface";
const FormInput = ({
  name,
  label,
  value,
  handleChange,
  errors,
}: {
  name: string;
  label: string;
  value: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errors: FormErrors;
}): JSX.Element => {
  return (
    <div className="flex flex-col gap-y-2">
      <label className="text-textgray" htmlFor={name}>
        {label}
      </label>
      <input
        className="w-full bg-gray300 p-4 rounded-md"
        type="text"
        name={name}
        id={name}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};

export default FormInput;
