import * as yup from 'yup';

export const updatePasswordSchema = yup.object().shape({
  currentPassword: yup.string().required('Current password is required'),
  newPassword: yup
    .string()
    .required('New password is required')
    .min(6, 'Password must be at least 6 characters'),
});

export const updateNameSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
});

export const updateUserMobileNumberSchema = yup.object().shape({
  countryCode: yup.string().required('Country code is required'),
  mobile: yup
    .string()
    .required('Mobile number is required')
    .matches(/^\d{7,15}$/, 'Mobile number must be between 7 and 15 digits'),
});

export const updateAddressSchema = yup.object().shape({
  addressLine: yup.string().optional(),
  landmark: yup.string().optional(),
  city: yup.string().optional(),
  pin: yup
    .string()
    .matches(/^\d{4,6}$/, 'PIN must be between 4 and 6 digits')
    .optional(),
  state: yup.string().optional(),
  country: yup.string().optional(),
});
