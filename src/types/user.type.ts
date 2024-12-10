export interface UpdatePasswordData {
  currentPassword: string;
  newPassword: string;
}

export interface UpdateNameData {
  name: string;
}

export interface UpdateMobileNumberData {
  countryCode: string;
  mobile: string;
}

export interface UpdateAddressData {
  addressLine?: string;
  landmark?: string;
  city?: string;
  pin?: string;
  state?: string;
  country?: string;
}
