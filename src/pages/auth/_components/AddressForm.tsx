import { useEffect } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { RootState } from '@/types/store.type';
import { AddressData } from '@/types/auth.type';
import { addressSchema } from '@/schema/auth.schema';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { saveAddress } from '@/store/slices/registration-form.slice';

export default function AddressForm({ onSubmit }: { onSubmit: (data: AddressData[]) => void }) {
  const dispatch = useAppDispatch();
  const addressData = useAppSelector((state: RootState) => state.registration.address);

  const form = useForm<{ address: AddressData[] }>({
    resolver: yupResolver(addressSchema),
    defaultValues: {
      address:
        addressData.length > 0
          ? addressData // Use existing data
          : [{ addressLine: '', landmark: '', city: '', state: '', country: '', pin: '' }],
    },
    mode: 'onChange',
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'address',
  });

  const handleFormSubmit = (data: { address: AddressData[] }) => {
    console.log(data.address);
    onSubmit(data.address); // Pass only the address array to the parent function
  };

  const handleAddAddress = () => {
    append({ addressLine: '', landmark: '', city: '', state: '', country: '', pin: '' });
  };

  const handleRemoveAddress = (index: number) => {
    remove(index);
  };

  // Watch form values to save them on change
  useEffect(() => {
    const subscription = form.watch((data) => {
      if (data.address) {
        const updatedAddressArray = data.address.map((address) => ({
          addressLine: address?.addressLine || '',
          landmark: address?.landmark || '',
          city: address?.city || '',
          state: address?.state || '',
          country: address?.country || '',
          pin: address?.pin || '',
        }));

        // Dispatch the entire updated array of addresses
        dispatch(saveAddress(updatedAddressArray));
      }
    });

    return () => subscription.unsubscribe();
  }, [dispatch, form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
        {fields.map((address, index) => (
          <div key={address.id} className="border p-4 rounded-md space-y-3">
            <FormField
              control={form.control}
              name={`address.${index}.addressLine`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address Line {index + 1}</FormLabel>
                  <FormControl>
                    <Input
                      {...form.register(`address.${index}.addressLine`)}
                      placeholder="Address Line"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={`address.${index}.landmark`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Landmark</FormLabel>
                  <FormControl>
                    <Input
                      {...form.register(`address.${index}.landmark`)}
                      placeholder="Landmark"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name={`address.${index}.city`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input
                        {...form.register(`address.${index}.city`)}
                        placeholder="City"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`address.${index}.pin`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pin</FormLabel>
                    <FormControl>
                      <Input
                        {...form.register(`address.${index}.pin`)}
                        placeholder="PIN Code"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name={`address.${index}.state`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>State</FormLabel>
                  <FormControl>
                    <Input
                      {...form.register(`address.${index}.state`)}
                      placeholder="State"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={`address.${index}.country`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <FormControl>
                    <Input
                      {...form.register(`address.${index}.country`)}
                      placeholder="Country"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {fields.length > 1 && (
              <Button variant="destructive" onClick={() => handleRemoveAddress(index)}>
                Remove Address
              </Button>
            )}
          </div>
        ))}

        <Button variant="secondary" onClick={handleAddAddress} type="button">
          Add More Address
        </Button>

        <Button type="submit" className="w-full" disabled={!form.formState.isValid}>
          Submit
        </Button>
      </form>
    </Form>
  );
}
