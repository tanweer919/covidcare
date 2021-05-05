export interface ResourceOption {
  label: string;
  value: number;
  icon: string;
}

export interface Resource {
  type: number;
  contact: string;
  description:string;
  verified: number;
  source: string;
  address: string;
  location: string;
  like: number;
}

export interface TabInterface {
  label: string;
  onClick: () => void;
}
