import { userApi } from '../api/userApi';

export const refreshUserMiddleware = (store) => (next) => (action) => {
  const result = next(action);

  if (action.type.endsWith('/fulfilled') && action.meta.arg.endpointName.startsWith('update')) {
    store.dispatch(userApi.endpoints.getUser.initiate()); // Refetch user data
  }

  return result;
};
