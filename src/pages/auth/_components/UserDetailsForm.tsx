import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Eye, EyeOff } from 'lucide-react';
import { yupResolver } from '@hookform/resolvers/yup';

import { UserData } from '@/types/auth.type';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { UserDetailsFormValues, userDetailsSchema } from '@/schema/auth.schema';
import { saveUserDetails, setStep } from '@/store/slices/registration-form.slice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { RootState } from '@/types/store.type';

const countryCodes = ['+1', '+91', '+44', '+61']; // Example country codes

export default function UserDetailsForm({ onNext }: { onNext: (data: UserData) => void }) {
  const dispatch = useAppDispatch();
  const userDetails = useAppSelector((state: RootState) => state.registration.userDetails);

  const form = useForm<UserDetailsFormValues>({
    resolver: yupResolver(userDetailsSchema),
    defaultValues: userDetails
      ? {
          ...userDetails,
          countryCode: userDetails.mobile?.split('-')[0] || '+1',
          mobile: userDetails.mobile?.split('-')[1] || '',
        }
      : {
          name: '',
          email: '',
          countryCode: '+1',
          mobile: '',
          password: '',
          confirmPassword: '',
        },
  });

  function onSubmit(values: UserDetailsFormValues) {
    dispatch(
      saveUserDetails({
        name: values.name,
        email: values.email,
        mobile: `${values.countryCode}-${values.mobile}`,
        password: '',
      }),
    );
    dispatch(setStep(2));
    onNext({
      name: values.name,
      email: values.email,
      mobile: `${values.countryCode}-${values.mobile}`,
      password: values.password,
    });
  }

  const [showPassword, setShowPassword] = useState<boolean>(false);

  // Watch form values to save them on change
  useEffect(() => {
    const subscription = form.watch((data) =>
      dispatch(
        saveUserDetails({
          name: data.name ?? '',
          email: data.email ?? '',
          mobile: data.mobile ? `${data.countryCode}-${data.mobile}` : '+1-',
          password: '',
        }),
      ),
    );
    return () => subscription.unsubscribe();
  }, [dispatch, form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        {/* Full Name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input {...form.register('name')} placeholder="Enter your full name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  {...form.register('email')}
                  placeholder="Enter your email"
                  type="email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Mobile Number */}
        <div className="grid grid-cols-3 gap-4">
          {/* Country Code */}
          <FormField
            control={form.control}
            name="countryCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country Code</FormLabel>
                <FormControl>
                  <Select
                    {...form.register('countryCode')}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Country Code" />
                    </SelectTrigger>
                    <SelectContent>
                      {countryCodes.map((code) => (
                        <SelectItem key={code} value={code}>
                          {code}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Mobile Number */}
          <FormField
            control={form.control}
            name="mobile"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Mobile Number</FormLabel>
                <FormControl>
                  <Input
                    {...form.register('mobile')}
                    placeholder="Enter your mobile number"
                    type="tel"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Password */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    {...form.register('password')}
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    {...field}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    className="absolute right-2 top-0 hover:bg-transparent"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Confirm Password */}
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    {...form.register('confirmPassword')}
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Re-enter your password"
                    {...field}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    className="absolute right-2 top-0 hover:bg-transparent"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit */}
        <Button type="submit" className="w-full" disabled={!form.formState.isValid}>
          Next
        </Button>
      </form>
    </Form>
  );
}
