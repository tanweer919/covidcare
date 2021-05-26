export interface SelectOption {
  label: string;
  value: number;
  icon: string;
}

export interface AvailableResourceData {
  name: string;
  type: number;
  description: string;
  contactName: string;
  phoneNumber: string;
  location: number[];
  city: string;
  address: string;
  available: number;
  source: string;
}

export interface ResourceRequestData {
  name: string;
  type: number;
  description: string;
  contactName: string;
  phoneNumber: string;
  location: number[];
  city: string;
  address: string;
  quantity: string;
}

export interface AvailableResource {
  _id: string;
  name: string;
  type: number;
  description: string;
  contactName: string;
  phoneNumber: string;
  city: string;
  address: string;
  available: number;
  verified: number;
  source: string;
  like: number;
  created: string;
}

export interface ResourceRequest {
  _id: string;
  name: string;
  type: number;
  description: string;
  contactName: string;
  phoneNumber: string;
  city: string;
  address: string;
  quantity: string;
  like: number;
  created: string;
}

export interface TabInterface {
  label: string;
  onClick: () => void;
}

export interface AutoComplete {
  term: string;
  placeId: string;
}

export interface FormErrors {
  [name: string]: string;
}
