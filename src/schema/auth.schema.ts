import * as yup from 'yup';

// User Details Schema
export const userDetailsSchema = yup.object({
  name: yup.string().required('Full Name is required'),
  email: yup.string().email('Invalid email address').required('Email is required'),
  countryCode: yup.string().required('Country Code is required'),
  mobile: yup
    .string()
    .matches(/^\d{7,15}$/, 'Mobile number must be 7 to 15 digits')
    .required('Mobile number is required'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm Password is required'),
});

export type UserDetailsFormValues = yup.InferType<typeof userDetailsSchema>;

// Address Schema
export const addressSchema = yup.object({
  address: yup
    .array()
    .of(
      yup.object().shape({
        addressLine: yup.string().required('Address Line is required'),
        landmark: yup.string().required('Landmark is required'),
        city: yup.string().required('City is required'),
        pin: yup
          .string()
          .matches(/^\d{4,6}$/, 'PIN must be 4 to 6 digits')
          .required('PIN is required'),
        state: yup.string().required('State is required'),
        country: yup.string().required('Country is required'),
      }),
    )
    .required('At least one address is required'),
});

export type AddressDataSchemaType = yup.InferType<typeof addressSchema>;

// Registration Schema (Combines User Details and Address Array)
export const registrationSchema = yup.object({
  user: userDetailsSchema,
  address: yup.array(addressSchema).min(1, 'At least one address is required'),
});

export type RegistrationFormValues = yup.InferType<typeof registrationSchema>;

export const loginSchema = yup.object({
  email: yup.string().required('Email is required').email('Invalid email address'),
  password: yup.string().required('Provide your password'),
});

export type LoginFormValues = yup.InferType<typeof loginSchema>;
