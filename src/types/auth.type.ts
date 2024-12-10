export interface UserData {
  name: string;
  email: string;
  mobile: string;
  password: string;
}

export interface AddressData {
  id?: string;
  addressLine: string;
  landmark: string;
  city: string;
  pin: string;
  state: string;
  country: string;
}

export interface RegistrationData extends UserData {
  address: AddressData[];
}

export interface RefreshedAccessToken {
  token: string;
}
