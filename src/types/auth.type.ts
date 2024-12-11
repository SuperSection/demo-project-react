export enum Role {
  SUPER_ADMIN = 'SUPER_ADMIN',
  ADMIN = 'ADMIN',
  ASSOCIATE = 'ASSOCIATE',
}

export interface UserData {
  name: string;
  email: string;
  mobile: string;
  password: string;
  role?: Role;
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
