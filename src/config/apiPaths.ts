const API_VERSION = 'v1';

export const BASE_API_URL = `http://localhost:5000/api/${API_VERSION}`;

export const AUTH_API_URL = `${BASE_API_URL}/auth`;

export const USER_API_URL = `${BASE_API_URL}/user`;

export const API_URL = {
  login: `${AUTH_API_URL}/login`,
  register: `${AUTH_API_URL}/register`,
  refreshToken: `${AUTH_API_URL}/refresh-token`,

  profile: `${USER_API_URL}/profile`,
  updateName: `${USER_API_URL}/name`,
  updatePassword: `${USER_API_URL}/password`,
  updateMobile: `${USER_API_URL}/mobile`,
  updateAddress: `${USER_API_URL}/address`,

  logout: `${USER_API_URL}/logout`,
};
