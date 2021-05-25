import { SelectOption } from "../interfaces/interface";

export const FIRSTVISIT = "firstVisit";
export const LOCATIONPERMISSIONDENIED = "locationPermissionDenied";
export const LAT = "lat";
export const LONG = "long";
export const CITY = "city";
export const LOCATIONSET = "locationSet";
export const SUCCESS = "success";
export const INFO = "info";
export const ERROR = "error";
export const AVAILABLERESOURCE = "availableResource";
export const RESOURCEREQUEST = "resourceRequest";

export const resourceList: SelectOption[] = [
  { label: "Oxygen", value: 0, icon: "/images/oxygen.svg" },
  { label: "Hospital Beds", value: 1, icon: "/images/hospital-bed.svg" },
  { label: "Medicines/Injections", value: 2, icon: "/images/medicine.svg" },
  { label: "Testing", value: 3, icon: "/images/blood-test.svg" },
  { label: "Blood", value: 4, icon: "/images/blood-drop.svg" },
  { label: "Ambulance", value: 5, icon: "/images/ambulance.svg" },
];

export const resourceTypeList: SelectOption[] = [
  { label: "Available Resource", value: 0, icon: "/images/available.svg" },
  { label: "Resource Request", value: 1, icon: "/images/request.svg" },
];
