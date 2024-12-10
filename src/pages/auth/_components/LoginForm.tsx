import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { yupResolver } from '@hookform/resolvers/yup';

import { LoginFormValues, loginSchema } from '@/schema/auth.schema';
import { useLoginMutation } from '@/store/api/authApi';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/helpers/hooks/use-toast';
import { Form, FormControl, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { APP_URL } from '@/config/appPaths';

const LoginForm = () => {
  const { toast } = useToast();

  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const form = useForm<LoginFormValues>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      await login(data).unwrap();
      console.log('Login successful');
      toast({
        title: 'Login Successful',
        description: 'You have successfully logged in!',
      });

      navigate(APP_URL.profile);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error('Login error:', err);
      toast({
        title: 'Login Failed',
        description: err?.data?.message || 'An error occurred while logging in.',
        variant: 'destructive',
      });
      form.setValue('password', '');
    }
  };

  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} noValidate className="space-y-4">
        <FormItem>
          <FormLabel>Email</FormLabel>
          <FormControl>
            <Input placeholder="Enter your email" {...form.register('email')} />
          </FormControl>
          <FormMessage>{form.formState.errors.email?.message}</FormMessage>
        </FormItem>

        <FormItem>
          <FormLabel>Password</FormLabel>
          <FormControl>
            <div className="relative">
              <Input
                {...form.register('password')}
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
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
          <FormMessage>{form.formState.errors.password?.message}</FormMessage>
        </FormItem>

        <Button type="submit" className="w-full" disabled={!form.formState.isValid || isLoading}>
          {isLoading ? 'Logging in...' : 'Login'}
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
