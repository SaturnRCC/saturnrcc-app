import { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export const metadata: Metadata = {
  title: 'SaturnRCC | Settings',
  description: 'Manage your account settings',
};

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences
        </p>
      </div>

      <Separator />

      <Card>
        <CardHeader>
          <CardTitle>Account Settings</CardTitle>
          <CardDescription>
            Update your account information
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Account settings functionality will be implemented in a future update.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Security</CardTitle>
          <CardDescription>
            Manage your security preferences
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Security settings functionality will be implemented in a future update.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}