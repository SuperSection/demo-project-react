import { Navigate } from 'react-router';
import { useLayoutEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import useUser from '@/helpers/hooks/useUser';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  userApi,
  useUpdateMobileMutation,
  useUpdateNameMutation,
  useUpdatePasswordMutation,
} from '@/store/api/userApi';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import LogoutButton from './LogoutButton';
import { useAppDispatch } from '@/store/hooks';
import {
  updateNameSchema,
  updatePasswordSchema,
  updateUserMobileNumberSchema,
} from '@/schema/user.schema';
import { UpdateMobileNumberData, UpdateNameData, UpdatePasswordData } from '@/types/user.type';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/helpers/hooks/use-toast';
import { Role } from '@/types/auth.type';
import { APP_URL } from '@/config/appPaths';

const UserProfile = () => {
  const { toast } = useToast();

  const user = useUser();

  const dispatch = useAppDispatch();

  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [passwordDialogOpen, setPasswordDialogOpen] = useState<boolean>(false);

  const [fieldToEdit, setFieldToEdit] = useState<'name' | 'mobile' | null>(null);

  const [updateName] = useUpdateNameMutation();
  const [updateMobile] = useUpdateMobileMutation();
  const [updatePassword] = useUpdatePasswordMutation();

  useLayoutEffect(() => {
    dispatch(userApi.endpoints.getUser.initiate(undefined, { forceRefetch: true }));
  }, [dispatch]);

  const nameForm = useForm({
    resolver: yupResolver(updateNameSchema),
    defaultValues: { name: user?.name || '' },
  });

  const mobileForm = useForm({
    resolver: yupResolver(updateUserMobileNumberSchema),
    defaultValues: {
      countryCode: user?.mobile.split('-')[0] || '+1',
      mobile: user?.mobile.split('-')[1] || '',
    },
  });

  const passwordForm = useForm({
    resolver: yupResolver(updatePasswordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
    },
  });

  const handleOpenDialog = (field: 'name' | 'mobile') => {
    setFieldToEdit(field);
    setDialogOpen(true);
  };

  const handleSaveName = async (data: UpdateNameData) => {
    try {
      await updateName(data.name);
      toast({
        title: 'Name Updated',
        description: 'Your name has been updated successfully.',
      });
    } catch (error) {
      console.error(error);
      toast({
        title: 'Failed to update name',
        description: 'An error occurred while updating your name.',
        variant: 'destructive',
      });
    } finally {
      setDialogOpen(false);
    }
  };

  const handleSaveMobile = async (data: UpdateMobileNumberData) => {
    try {
      await updateMobile(`${data.countryCode}-${data.mobile}`);
      toast({
        title: 'Mobile Number Updated',
        description: 'Your mobile number has been updated successfully.',
      });
    } catch (error) {
      console.error(error);
      toast({
        title: 'Failed to update mobile number',
        description: 'An error occurred while updating your mobile number.',
        variant: 'destructive',
      });
    } finally {
      setDialogOpen(false);
    }
  };

  const handleUpdatePassword = async (data: UpdatePasswordData) => {
    try {
      await updatePassword(data);
      toast({
        title: 'Password Updated',
        description: 'Your password has been updated successfully.',
      });
    } catch (error) {
      console.error(error);
      toast({
        title: 'Failed to update password',
        description: 'An error occurred while updating your password.',
        variant: 'destructive',
      });
    } finally {
      setPasswordDialogOpen(false);
    }
  };

  
  if (user?.role === Role.ASSOCIATE) {
    return <Navigate to={APP_URL.address} />;
  }

  if (!user) {
    // Render the skeleton while user data is being fetched
    return (
      <div className="p-8 w-[640px] min-h-screen mx-auto">
        <Card className="max-w-5xl">
          <CardHeader>
            <CardTitle className="text-2xl">
              <Skeleton className="h-6 w-40" />
            </CardTitle>
            <div className="text-sm text-muted-foreground">
              <Skeleton className="h-4 w-60" />
            </div>
          </CardHeader>
          <Separator className="mb-6" />
          <CardContent>
            <div className="grid gap-6">
              {/* Skeleton for Full Name */}
              <div className="flex items-end justify-between">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Skeleton className="h-10 w-full" />
                </div>
                <Skeleton className="h-10 w-20" />
              </div>

              {/* Skeleton for Email */}
              <div>
                <Label htmlFor="email">Email</Label>
                <Skeleton className="h-10 w-full" />
              </div>

              {/* Skeleton for Mobile Number */}
              <div className="flex items-end justify-between">
                <div>
                  <Label htmlFor="mobile">Mobile Number</Label>
                  <div className="grid grid-cols-3 gap-3">
                    <Skeleton className="h-10" />
                    <Skeleton className="h-10 col-span-2 w-full" />
                  </div>
                </div>
                <Skeleton className="h-10 w-20" />
              </div>

              {/* Skeleton for Update Password Button */}
              <Skeleton className="h-10 w-40 mx-auto mt-4" />

              {/* Skeleton for Logout */}
              <Skeleton className="h-10 w-40 mx-auto mt-4" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-8 w-[640px] min-h-screen mx-auto">
      <Card className="max-w-5xl">
        <CardHeader>
          <CardTitle className="text-2xl">👋 Hello, {user.name.split(' ')[0]}</CardTitle>
          <p className="text-sm text-muted-foreground">Manage your account settings here.</p>
        </CardHeader>
        <Separator className="mb-6" />
        <CardContent>
          <div className="grid gap-6">
            {/* Full Name */}
            <div className="flex items-end justify-between">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" value={user.name} readOnly className="cursor-not-allowed" />
              </div>
              <Button onClick={() => handleOpenDialog('name')} variant="outline">
                Change
              </Button>
            </div>

            {/* Email */}
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" value={user.email} readOnly className="w-auto cursor-not-allowed" />
            </div>

            {/* Mobile Number */}
            <div className="flex items-end justify-between">
              <div>
                <Label htmlFor="mobile">Mobile Number</Label>
                <div className="grid grid-cols-6 gap-3">
                  <Input
                    id="country-code"
                    value={user.mobile.split('-')[0]}
                    readOnly
                    className="cursor-not-allowed"
                  />
                  <Input
                    id="mobile"
                    value={user.mobile.split('-')[1]}
                    readOnly
                    className="col-span-2 cursor-not-allowed"
                  />
                </div>
              </div>
              <Button onClick={() => handleOpenDialog('mobile')} variant="outline">
                Change
              </Button>
            </div>

            {/* Update Button */}
            <Button className="mx-auto mt-4" onClick={() => setPasswordDialogOpen(true)}>
              Update Password
            </Button>
          </div>
        </CardContent>
        <CardFooter>
          <LogoutButton />
        </CardFooter>
      </Card>

      {/* Dialog for Name */}
      <Dialog open={dialogOpen && fieldToEdit === 'name'} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change Full Name</DialogTitle>
          </DialogHeader>
          <form onSubmit={nameForm.handleSubmit(handleSaveName)}>
            <div className="space-y-4">
              <Label>Full Name</Label>
              <Input {...nameForm.register('name')} placeholder="Enter new name" />
              <p className="text-sm text-red-500">{nameForm.formState.errors.name?.message}</p>
              <Button className="w-full" type="submit">
                Save Changes
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Dialog for Mobile */}
      <Dialog open={dialogOpen && fieldToEdit === 'mobile'} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change Mobile Number</DialogTitle>
          </DialogHeader>
          <form onSubmit={mobileForm.handleSubmit(handleSaveMobile)}>
            <div className="space-y-4">
              <Label>Country Code</Label>
              <Controller
                control={mobileForm.control}
                name="countryCode"
                render={({ field }) => (
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="+1">+1</SelectItem>
                      <SelectItem value="+44">+44</SelectItem>
                      <SelectItem value="+91">+91</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              <p className="text-sm text-red-500">
                {mobileForm.formState.errors.countryCode?.message}
              </p>
              <Label>Mobile Number</Label>
              <Input {...mobileForm.register('mobile')} placeholder="Enter new mobile number" />
              <p className="text-sm text-red-500">{mobileForm.formState.errors.mobile?.message}</p>
              <Button className="w-full" type="submit">
                Save Changes
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Dialog for Password Update */}
      <Dialog open={passwordDialogOpen} onOpenChange={setPasswordDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Password</DialogTitle>
            <DialogDescription>
              Set your new password by providing the current password
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={passwordForm.handleSubmit(handleUpdatePassword)}>
            <div className="space-y-4">
              <div>
                <Label>Current Password</Label>
                <Input
                  type="password"
                  {...passwordForm.register('currentPassword')}
                  placeholder="Enter current password"
                />
              </div>
              <div>
                <Label>New Password</Label>
                <Input
                  type="password"
                  {...passwordForm.register('newPassword')}
                  placeholder="Enter new password"
                />
              </div>
              <p className="text-sm text-red-500">
                {passwordForm.formState.errors.newPassword?.message}
              </p>
              <Button className="w-full" type="submit">
                Save Password
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserProfile;
