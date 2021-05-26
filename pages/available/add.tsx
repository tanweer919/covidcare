import AppBar from "../../src/components/AppBar";
import SelectDropdown from "../../src/components/SelectDropdown";
import { AutoComplete, SelectOption } from "../../src/interfaces/interface";
import Layout from "../../src/components/Layout";
import { useEffect, useRef, useState } from "react";
import {
  LAT,
  LONG,
  CITY,
  LOCATIONSET,
  SUCCESS,
  resourceList,
} from "../../src/constants/constants";
import {
  AvailableResourceData,
  FormErrors,
} from "../../src/interfaces/interface";
import FormInput from "../../src/components/FormInput";
import Joi from "joi";
import ResourceService from "../../src/services/ResourceService";
import { useRouter } from "next/router";
import LoadingSpinner from "../../src/components/LoadingSpinner";
import HttpService from "../../src/services/HttpService";
import Head from "next/head";

const AvailableForm = () => {
  const [data, setData] = useState<AvailableResourceData>({
    name: "",
    type: 0,
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
  const [isCurrentCity, setIsCurrentCity] = useState(true);
  const [city, setCity] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<AutoComplete[]>([]);
  const box = useRef(null);
  const schema = {
    name: Joi.string().required().messages({
      "string.empty": "Name is required",
      "string.required": "Name is required",
    }),
    type: Joi.number().required().messages({
      "string.required": "Resource type is required",
      "string.empty": "Resource type is required",
    }),
    address: Joi.string().required().messages({
      "string.required": "Address is required",
      "string.empty": "Address is required",
    }),
    contactName: Joi.string().required().messages({
      "string.required": "Contact name is required",
      "string.empty": "Contact name is required",
    }),
    phoneNumber: Joi.string().required().min(10).messages({
      "string.required": "Phone number is required",
      "string.empty": "Phone number is required",
      "string.min": "Invalid phone number",
    }),
    available: Joi.number().required().messages({
      "string.required": "Availiblity is required",
      "string.empty": "Availiblity is required",
    }),
    source: Joi.string().required().messages({
      "string.required": "Information source is required",
      "string.empty": "Information source is required",
    }),
    description: Joi.string().allow("").optional(),
    city: Joi.string().allow("").optional(),
    location: Joi.array().optional(),
  };

  useEffect(() => {
    const city = localStorage.getItem(CITY);
    setCity(city);
    const locationSet = JSON.parse(localStorage.getItem(LOCATIONSET));
    if (locationSet) {
      const lat: number = JSON.parse(localStorage.getItem(LAT));
      const long: number = JSON.parse(localStorage.getItem(LONG));
      if (city) {
        setData({ ...data, location: [lat, long], city });
      } else {
        setData({ ...data, location: [lat, long] });
      }
    }
  }, []);
  const handleSwitchChange = () => {
    setIsCurrentCity(!isCurrentCity);
  };

  const router = useRouter();

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
      abortEarly: false,
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors = validateForm();
    if (errors === null) {
      setIsLoading(true);
      const result = await ResourceService.createAvailableResource(data);
      setIsLoading(false);
      if (result) {
        router.push(
          {
            pathname: "/",
            query: {
              message:
                "Data provided by you is submitted for verification. You can view the data once it is verified. Thanks for contributing to the project👏.",
              type: SUCCESS,
            },
          },
          "/"
        );
      }
    } else {
      setErrors(errors);
    }
  };

  const handleCityChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const client = HttpService.getHttpClient();
    const value = e.currentTarget.value;
    setCity(value);
    if (value !== "") {
      const { data }: { data: AutoComplete[] } = await client.post(
        "/autocomplete",
        {
          input: value,
        }
      );
      setSuggestions(data);
    }
  };

  const handleSuggestionItemClick = (item: AutoComplete) => {
    setData({ ...data, city: item.term });
    setCity(item.term);
    setSuggestions([]);
  };

  const handleSelectChange = (key: string, value: number) => {
    const newData = { ...data };
    newData[key] = value;
    setData(newData);
  };

  const handleFocusOut = (ref: React.MutableRefObject<any>) => {
    useEffect(() => {
      // Function for click event
      function handleOutsideClick(event: MouseEvent): any {
        if (ref.current && !ref.current.contains(event.target)) {
          setSuggestions([]);
        }
      }

      // Adding click event listener
      document.addEventListener("click", handleOutsideClick);
    }, [ref]);
  };

  handleFocusOut(box);

  return (
    <>
      <Head>
        <title>Add available resource</title>
      </Head>
      <AppBar label="Add available resource" />
      <Layout selectedKey={0} displayBottomNavbar={false}>
        <>
          <div className="bg-primary p-12 md:p-20 mb-12 md:mx-80">
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
            <FormInput
              name="name"
              label="
            Name of the resource"
              value={data.name}
              handleChange={handleChange}
              errors={errors}
              isRequired={true}
            />
            <div className="flex flex-col gap-y-2">
              <label className="text-textgray" htmlFor="type">
                Resource type
              </label>
              <SelectDropdown
                keyName="type"
                itemList={resourceList}
                handleSelectChange={handleSelectChange}
              />
            </div>
            <div className="flex flex-col gap-y-2">
              <label className="text-textgray" htmlFor="availiblity">
                Availablity
              </label>
              <SelectDropdown
                keyName="available"
                itemList={availablityList}
                handleSelectChange={handleSelectChange}
              />
            </div>
            {city && (
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
            )}
            {(!city || !isCurrentCity) && (
              <div className="flex flex-col gap-y-2">
                <label className="text-textgray" htmlFor="city">
                  City
                </label>
                <div className="w-full searchbox-container" ref={box}>
                  <input
                    className="w-full bg-gray300 p-4 rounded-md border-gray400 border-2"
                    type="text"
                    id="city"
                    name="city"
                    value={city}
                    onChange={handleCityChange}
                  />
                  <div className="autocomplete-container">
                    {suggestions.map((suggestion, i) => (
                      <div
                        className="autocomplete-item"
                        key={i}
                        onClick={() => {
                          handleSuggestionItemClick(suggestion);
                        }}
                      >
                        <img
                          src="/images/location.svg"
                          alt="location_pin"
                          className="h-6 mr-2"
                        />
                        <span>{suggestion.term}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            <FormInput
              name="address"
              label="
            Address"
              value={data.address}
              handleChange={handleChange}
              errors={errors}
              isRequired={true}
            />
            <FormInput
              name="contactName"
              label="
            Contact Name"
              value={data.contactName}
              handleChange={handleChange}
              errors={errors}
              isRequired={true}
            />
            <FormInput
              name="phoneNumber"
              label="
            Phone Number"
              value={data.phoneNumber}
              handleChange={handleChange}
              errors={errors}
              isRequired={true}
            />
            <FormInput
              name="source"
              label="
            Information Source"
              value={data.source}
              handleChange={handleChange}
              errors={errors}
              isRequired={true}
            />
            <FormInput
              name="description"
              label="
            Description"
              value={data.description}
              handleChange={handleChange}
              errors={errors}
              isRequired={false}
            />
            <div className="flex items-center">
              <div className="text-textred text-4xl pt-3">*</div>{" "}
              <div>- Required</div>
            </div>
            <div>
              <button className="bg-primary rounded-md md:rounded-full w-full p-2 text-4xl text-white flex justify-center">
                {isLoading ? <LoadingSpinner /> : "Submit"}
              </button>
            </div>
          </form>
        </>
      </Layout>
    </>
  );
};

export default AvailableForm;
