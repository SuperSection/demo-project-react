/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { useNavigate } from 'react-router';

import { useRegisterMutation } from '@/store/api/authApi';
import { resetForm, setStep } from '@/store/slices/registration-form.slice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { APP_URL } from '@/config/appPaths';
import { RootState } from '@/types/store.type';
import { AddressData, RegistrationData, UserData } from '@/types/auth.type';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import UserDetailsForm from './_components/UserDetailsForm';
import AddressForm from './_components/AddressForm';

const Registration = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const step = useAppSelector((state: RootState) => state.registration.step);

  const [userData, setUserData] = useState<UserData>({
    name: '',
    email: '',
    mobile: '',
    password: '',
  });
  // const [addressData, setAddressData] = useState<AddressData[]>([]);

  const [register, { isLoading, isError, error }] = useRegisterMutation();

  const handleUserDataSubmit = (data: UserData) => {
    setUserData((prev) => ({ ...prev, ...data }));
    dispatch(setStep(2));
  };

  const handleAddressDataSubmit = async (data: AddressData[]) => {
    console.log(data);

    const finalData: RegistrationData = { ...userData, address: data };
    console.log('Final registration data: ', finalData);

    try {
      const response = await register(finalData).unwrap();
      console.log('Registration Success:', response);
      navigate(APP_URL.login);
    } catch (error) {
      console.error('Registration Failed:', error);
      navigate(APP_URL.register);
    } finally {
      dispatch(resetForm());
    }
  };

  const goBack = () => dispatch(setStep(1));

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200 dark:bg-neutral-900">
      <Card className="w-full max-w-xl shadow-md">
        <CardHeader className="text-xl">
          <CardTitle>{step === 1 ? 'Register Your Details' : 'Add Address Details'}</CardTitle>
        </CardHeader>
        <CardContent>
          {step === 1 && <UserDetailsForm onNext={handleUserDataSubmit} />}
          {step === 2 && <AddressForm onSubmit={handleAddressDataSubmit} />}
        </CardContent>
        <CardFooter>
          {step === 2 && (
            <Button variant="outline" onClick={goBack} disabled={isLoading}>
              Back
            </Button>
          )}
          {isError && <p className="text-red-500 text-sm mt-2">{(error as any)?.data?.message}</p>}
        </CardFooter>
      </Card>
    </div>
  );
};

export default Registration;
