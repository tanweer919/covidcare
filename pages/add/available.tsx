import AppBar from "../../src/components/AppBar";
import SelectDropdown from "../../src/components/SelectDropdown";
import { SelectOption } from "../../src/interfaces/interface";
import Layout from "../../src/components/Layout";
import { useEffect, useState } from "react";
import {
  AvailableResourceData,
  FormErrors,
} from "../../src/interfaces/interface";
import Joi from "joi";
const AvailableForm = () => {
  const [data, setData] = useState<AvailableResourceData>({
    name: "",
    type: 1,
    description: "",
    contactName: "",
    phoneNumber: "",
    location: [],
    city: "",
    address: "",
    available: 1,
    source: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const schema = {
    name: Joi.string().required().label("Name"),
    type: Joi.number().required().label("Resource type"),
    contactName: Joi.string().required().label("Contact Name"),
    phoneNumber: Joi.string().required().min(6).label("Phone Number"),
    address: Joi.string().required().label("Address"),
    available: Joi.number().required().label("Availiblity"),
    source: Joi.string().required().label("Information Source"),
  };

  useEffect(() => {}, []);
  const [isCurrentCity, setIsCurrentCity] = useState(true);
  const handleSwitchChange = () => {
    setIsCurrentCity(!isCurrentCity);
  };

  const resourceList: SelectOption[] = [
    { label: "Oxygen", value: 0, icon: "/images/oxygen.svg" },
    { label: "Hospital Beds", value: 1, icon: "/images/hospital-bed.svg" },
    { label: "Medicines/Injections", value: 2, icon: "/images/medicine.svg" },
    { label: "Testing", value: 3, icon: "/images/blood-test.svg" },
    { label: "Blood", value: 4, icon: "/images/blood-drop.svg" },
    { label: "Ambulance", value: 5, icon: "/images/ambulance.svg" },
  ];

  const availablityList: SelectOption[] = [
    { label: "Available", value: 1, icon: "/images/tick.svg" },
    { label: "Unavailable", value: 0, icon: "/images/cross.svg" },
  ];

  // const validateInput = (input: string): string | null => {
  //   let subSchema = {
  //     [input]: schema[input],
  //   };
  //   let validationObject = {
  //     [input]: data[input],
  //   };
  //   let { error: validationErrors } =
  //     Joi.object(subSchema).validate(validationObject);
  //   return validationErrors ? validationErrors.details[0].message : null;
  // };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let formData = { ...data };
    let input = e.currentTarget.name;
    formData[input] = e.currentTarget.value;
    setData(formData);
  };

  const validateForm = (): FormErrors | null => {
    let { error: validationErrors } = Joi.object(schema).validate(data, {
      abortEarly: true,
    });
    if (validationErrors) {
      let formErrors: FormErrors = {};
      let formValidationErrors = validationErrors.details;
      for (let i = 0; i < formValidationErrors.length; i++) {
        formErrors[formValidationErrors[i].path[0]] = formValidationErrors[
          i
        ].message.replace(/"/g, "");
      }
      return formErrors;
    }
    return null;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors = validateForm();
    if (errors === null) {
      console.log("Form submitted");
    } else {
      console.log(errors);
    }
  };

  return (
    <>
      <AppBar label="Add available resource" />
      <Layout selectedKey={0} displayBottomNavbar={false}>
        <>
          <div className="bg-primary p-12 md:p-20 mb-8 md:mx-80">
            <h1 className="text-white text-4xl mb-4 w-fit mx-auto text-center">
              Add Verified Information
            </h1>
            <span className="inline-block text-gray300 text-2xl text-center">
              The information being submitted by you could help save someone's
              life. Please fill the form below to add information. Our team of
              volunteers will verify the details before making it accessible to
              others.
            </span>
          </div>
          <form
            className="text-2xl grid grid-cols-1 md:w-1/2 mx-auto gap-4"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col gap-y-2">
              <label className="text-textgray" htmlFor="name">
                Name of the resource
              </label>
              <input
                className="w-full bg-gray300 p-4 rounded-md"
                type="text"
                name="name"
                id="name"
                value={data.name}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col gap-y-2">
              <label className="text-textgray" htmlFor="type">
                Resource type
              </label>
              <SelectDropdown itemList={resourceList} />
            </div>
            <div className="flex flex-col gap-y-2">
              <label className="text-textgray" htmlFor="availiblity">
                Availablity
              </label>
              <SelectDropdown itemList={availablityList} />
            </div>
            <div className="flex justify-between">
              <label className="text-textgray text-3xl" htmlFor="currentCity">
                Current city
              </label>
              <div
                className={`${
                  isCurrentCity ? "bg-primary" : "bg-gray400"
                } rounded-full w-16 transition-all duration-200 relative`}
                onClick={handleSwitchChange}
                id="currentCity"
              >
                <div
                  className={`absolute top-1 ${
                    isCurrentCity ? "right-1" : "left-1"
                  } rounded-full w-7 h-7 bg-white pt-1`}
                ></div>
              </div>
            </div>
            {!isCurrentCity && (
              <div className="flex flex-col gap-y-2">
                <label className="text-textgray" htmlFor="city">
                  City
                </label>
                <input
                  className="w-full bg-gray300 p-4 rounded-md"
                  type="text"
                  name="city"
                  id="city"
                  value={data.city}
                  onChange={handleChange}
                />
              </div>
            )}
            <div className="flex flex-col gap-y-2">
              <label className="text-textgray" htmlFor="address">
                Address
              </label>
              <input
                className="w-full bg-gray300 p-4 rounded-md"
                type="text"
                name="address"
                id="address"
                value={data.address}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col gap-y-2">
              <label className="text-textgray" htmlFor="contactName">
                Contact name
              </label>
              <input
                className="w-full bg-gray300 p-4 rounded-md"
                type="text"
                name="contactName"
                id="contactName"
                value={data.contactName}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col gap-y-2">
              <label className="text-textgray" htmlFor="phoneNumber">
                Phone number
              </label>
              <input
                className="w-full bg-gray300 p-4 rounded-md"
                type="text"
                name="phoneNumber"
                id="phoneNumber"
                value={data.phoneNumber}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col gap-y-2">
              <label className="text-textgray" htmlFor="source">
                Information Source
              </label>
              <input
                className="w-full bg-gray300 p-4 rounded-md"
                type="text"
                name="source"
                id="source"
                value={data.source}
                onChange={handleChange}
              />
            </div>
            <div>
              <button className="bg-primary rounded-md md:rounded-full w-full p-2 text-4xl text-white">
                Submit
              </button>
            </div>
          </form>
        </>
      </Layout>
    </>
  );
};

export default AvailableForm;
