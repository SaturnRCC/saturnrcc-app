import Link from 'next/link';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth/next';

import { LoginForm } from '@/components/auth/LoginForm';
import { SocialLogin } from '@/components/auth/SocialLogin';
import { Separator } from '@/components/ui/separator';
import { authOptions } from '@/lib/auth';

export const metadata: Metadata = {
  title: 'SaturnRCC | Login',
  description: 'Login to your account',
};

export default async function LoginPage() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect('/dashboard');
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-background to-muted p-4 sm:p-8">
      <div className="w-full max-w-md space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Welcome back</h1>
          <p className="text-muted-foreground">
            Sign in to your account to continue
          </p>
        </div>
        
        <LoginForm />
        
        <div className="relative flex items-center justify-center">
          <Separator />
          <span className="absolute bg-background px-2 text-xs text-muted-foreground">
            OR CONTINUE WITH
          </span>
        </div>
        
        <SocialLogin />
        
        <div className="text-center text-sm">
          Don&apos;t have an account?{' '}
          <Link href="/register" className="font-medium underline underline-offset-4 hover:text-primary">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}