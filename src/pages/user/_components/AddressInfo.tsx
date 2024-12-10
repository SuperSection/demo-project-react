import { useState } from 'react';

import { AddressData } from '@/types/auth.type';
import { UpdateAddressData } from '@/types/user.type';
import useUser from '@/helpers/hooks/useUser';
import { useGetUserQuery, useUpdateAddressMutation } from '@/store/api/userApi';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';

const AddressInfo = () => {
  const user = useUser();

  const { refetch } = useGetUserQuery();

  const [updateAddress] = useUpdateAddressMutation();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<string>('');
  const [newAddress, setNewAddress] = useState<UpdateAddressData>({});

  const handleUpdateAddress = (address: AddressData) => {
    setSelectedAddress(address.id ?? '');
    if (selectedAddress.length > 0) {
      setNewAddress({
        addressLine: address.addressLine,
        landmark: address.landmark,
        city: address.city,
        state: address.state,
        country: address.country,
        pin: address.pin,
      });
      setDialogOpen(true);
    }
  };

  const handleSaveChanges = async () => {
    console.log('Updated Address:', newAddress);
    await updateAddress({ addressId: selectedAddress, address: newAddress });
    refetch();
    setDialogOpen(false);
  };

  if (!user) {
    return (
      <div className="p-8 w-[640px] min-h-screen mx-auto">
        <Card className="">
          <CardHeader>
            <CardTitle className="text-2xl">📍 Manage Your Addresses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Skeleton className="h-9 w-full" />
              <Skeleton className="h-9 w-full" />
              <Skeleton className="h-9 w-full" />
              <Skeleton className="h-9 w-full" />
              <Skeleton className="h-9 w-full" />
              <Skeleton className="h-9 w-full" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-8 w-[640px] min-h-screen mx-auto">
      <Card className="">
        <CardHeader>
          <CardTitle className="text-2xl">📍 Manage Your Addresses</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {user.address.map((address: AddressData, index: number) => (
              <div key={address.id} className="flex items-end justify-between">
                <div className="flex flex-col space-y-3">
                  <div>
                    <Label htmlFor={`address-${index}-addressLine`}>Address Line {index + 1}</Label>
                    <Input
                      id={`address-${index}-addressLine`}
                      value={address.addressLine}
                      readOnly
                      className="cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`address-${index}-landmark`}>Landmark</Label>
                    <Input
                      id={`address-${index}-landmark`}
                      value={address.landmark}
                      readOnly
                      className="cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`address-${index}-city`}>City</Label>
                    <Input
                      id={`address-${index}-city`}
                      value={address.city}
                      readOnly
                      className="cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`address-${index}-pin`}>Pin</Label>
                    <Input
                      id={`address-${index}-pin`}
                      value={address.pin}
                      readOnly
                      className="cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`address-${index}-state`}>State</Label>
                    <Input
                      id={`address-${index}-state`}
                      value={address.state}
                      readOnly
                      className="cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`address-${index}-country`}>Country</Label>
                    <Input
                      id={`address-${index}-country`}
                      value={address.country}
                      readOnly
                      className="cursor-not-allowed"
                    />
                  </div>
                </div>
                <Button
                  onClick={() => {
                    handleUpdateAddress(address);
                  }}
                >
                  Update Address {index + 1}
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Dialog for Editing Address */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Address</DialogTitle>
            <DialogDescription>Make changes to the fields of your address</DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <div>
              <Label>Address Line</Label>
              <Input
                value={newAddress.addressLine}
                onChange={(e) => setNewAddress({ ...newAddress, addressLine: e.target.value })}
              />
            </div>
            <div>
              <Label>Landmark</Label>
              <Input
                value={newAddress.landmark}
                onChange={(e) => setNewAddress({ ...newAddress, landmark: e.target.value })}
              />
            </div>
            <div>
              <Label>City</Label>
              <Input
                value={newAddress.city}
                onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
              />
            </div>
            <div>
              <Label>Pin Code</Label>
              <Input
                value={newAddress.pin}
                onChange={(e) => setNewAddress({ ...newAddress, pin: e.target.value })}
              />
            </div>
            <div>
              <Label>State</Label>
              <Input
                value={newAddress.state}
                onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
              />
            </div>
            <div>
              <Label>Country</Label>
              <Input
                value={newAddress.country}
                onChange={(e) => setNewAddress({ ...newAddress, country: e.target.value })}
              />
            </div>
            <Button className="w-full" onClick={handleSaveChanges}>
              Save Changes
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddressInfo;
