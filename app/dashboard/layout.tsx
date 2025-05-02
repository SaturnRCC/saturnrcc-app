import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth/next';

import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { authOptions } from '@/lib/auth';

export const metadata: Metadata = {
  title: 'SaturnRCC | Dashboard',
  description: 'User dashboard',
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login');
  }

  return (
    <div className="flex min-h-screen flex-col items-center">
      <DashboardHeader user={session.user} />
      <main className="flex-1 container py-6">
        {children}
      </main>
    </div>
  );
}