import Link from 'next/link';
import { User } from 'next-auth';

import { UserAccountNav } from '@/components/layout/UserAccountNav';
import { ModeToggle } from '@/components/layout/ModeToggle';

interface DashboardHeaderProps {
  user: User;
}

export function DashboardHeader({ user }: DashboardHeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="max-w-7xl mx-auto px-4 md:px-6 flex h-16 items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <Link
            href="/dashboard"
            className="flex items-center space-x-2 font-bold"
          >
            <span className="inline-block font-bold">SaturnRCC</span>
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <ModeToggle />
          <UserAccountNav user={user} />
        </div>
      </div>
    </header>
  );
}