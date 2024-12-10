import LoginForm from './_components/LoginForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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
      </Card>
    </div>
  );
};

export default Login;
