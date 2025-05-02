import { Metadata } from 'next';
import { getServerSession } from 'next-auth/next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { authOptions } from '@/lib/auth';

export const metadata: Metadata = {
  title: 'SaturnRCC | Dashboard',
  description: 'Your dashboard overview',
};

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  const providerDisplay = () => {
    switch (user?.provider) {
      case 'google':
        return 'Google';
      case 'saturnrcc':
        return 'SaturnRCC';
      case 'credentials':
        return 'Email & Password';
      default:
        return user?.provider || 'Unknown';
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to your dashboard, {user?.name || 'User'}!
        </p>
      </div>

      <Separator />

      <Card>
        <CardHeader>
          <CardTitle>User Information</CardTitle>
          <CardDescription>
            Your account details
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Name</h3>
              <p className="text-lg">{user?.name || 'Not provided'}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Email</h3>
              <p className="text-lg">{user?.email}</p>
            </div>
            {/* <div>
              <h3 className="text-sm font-medium text-muted-foreground">Authentication Provider</h3>
              <p className="text-lg">{providerDisplay()}</p>
            </div> */}
            {/* <div>
              <h3 className="text-sm font-medium text-muted-foreground">User ID</h3>
              <p className="text-lg truncate">{user?.id}</p>
            </div> */}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}