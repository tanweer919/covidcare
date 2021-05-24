import AppBar from "../../src/components/AppBar";
import SelectDropdown from "../../src/components/SelectDropdown";
import {
  AutoComplete,
  FormErrors,
  SelectOption,
} from "../../src/interfaces/interface";
import Layout from "../../src/components/Layout";
import { useEffect, useRef, useState } from "react";
import {
  CITY,
  LAT,
  LOCATIONSET,
  LONG,
  SUCCESS,
} from "../../src/constants/constants";
import Joi from "joi";
import { ResourceRequestData } from "../../src/interfaces/interface";
import FormInput from "../../src/components/FormInput";
import { useRouter } from "next/router";
import ResourceService from "../../src/services/ResourceService";
import LoadingSpinner from "../../src/components/LoadingSpinner";
import HttpService from "../../src/services/HttpService";
const RequestForm = () => {
  const [data, setData] = useState<ResourceRequestData>({
    name: "",
    type: 0,
    description: "",
    contactName: "",
    phoneNumber: "",
    location: [],
    city: "",
    address: "",
    quantity: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isCurrentCity, setIsCurrentCity] = useState(true);
  const [city, setCity] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<AutoComplete[]>([]);
  const box = useRef(null);
  const router = useRouter();
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
    description: Joi.string().allow("").optional(),
    city: Joi.string().allow("").optional(),
    location: Joi.array().optional(),
    quantity: Joi.string().required().messages({
      "string.required": "Quantity is required",
      "string.empty": "Quantity is required",
    }),
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
      const result = await ResourceService.createResourceRequest(data);
      setIsLoading(false);
      if (result) {
        router.push(
          {
            pathname: "/",
            query: {
              message:
                "Your request have been submitted. Keep checking your request for any update. Thanks for contributing to the project👏.",
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
        <>
          <div className="bg-primary p-12 md:p-20 mb-8 md:mx-80">
            <h1 className="text-white text-4xl mb-4 w-fit mx-auto text-center">
              Request any resource
            </h1>
            <span className="inline-block text-gray300 text-2xl text-center">
              Make a request for any resource that you are in need of. Make this
              request only if you are in urgent need of it.
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
              <label className="text-textgray">Resource type</label>
              <SelectDropdown itemList={resourceList} />
            </div>
            {city && (
              <div className="flex justify-between">
                <label className="text-textgray text-3xl">Current city</label>
                <div
                  className={`${
                    isCurrentCity ? "bg-primary" : "bg-gray400"
                  } rounded-full w-16 transition-all duration-200 relative`}
                  onClick={handleSwitchChange}
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
              name="quantity"
              label="
            Quantity Required"
              value={data.quantity}
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

export default RequestForm;
