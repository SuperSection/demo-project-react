import { APP_URL } from '@/config/appPaths';
import LoginForm from './_components/LoginForm';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const Login = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200 dark:bg-neutral-900">
      <Card className="w-full max-w-xl shadow-md">
        <CardHeader className="text-xl">
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
        <CardFooter>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Don't have an account?{' '}
            <a href={APP_URL.register} className="text-blue-500 hover:underline">
              Register
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
