import Link from 'next/link';
import { getServerSession } from 'next-auth/next';
import { Button } from '@/components/ui/button';
import { authOptions } from '@/lib/auth';

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <div className="flex min-h-screen flex-col items-center"> {/* Added items-center */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur"> {/* Removed mx-auto */}
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex h-16 items-center justify-between py-4"> {/* Replaced container with manual centering */}
          <div>
            <Link href="/" className="font-bold">SaturnRCC</Link>
          </div>
          <div className="flex items-center gap-2">
            {session ? (
              <Button asChild>
                <Link href="/dashboard">Dashboard</Link>
              </Button>
            ) : (
              <>
                <Button asChild variant="outline">
                  <Link href="/login">Sign in</Link>
                </Button>
                <Button asChild>
                  <Link href="/register">Get Started</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Secure Authentication for Applications
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  A complete authentication solution with multiple sign-in methods and secure session management.
                </p>
              </div>
              <div className="space-x-4">
                <Button asChild size="lg">
                  <Link href={session ? '/dashboard' : '/register'}>
                    {session ? 'Go to Dashboard' : 'Get Started'}
                  </Link>
                </Button>
                {!session && (
                  <Button asChild variant="outline" size="lg">
                    <Link href="/login">Sign In</Link>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Multiple Auth Methods</h3>
                <p className="text-muted-foreground">
                  Sign in with email/password, Google OAuth, or connect your own custom OAuth provider.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Secure by Default</h3>
                <p className="text-muted-foreground">
                  Built with security best practices including password hashing, CSRF protection, and secure sessions.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Modern Stack</h3>
                <p className="text-muted-foreground">
                  Built with Next.js 14, Tailwind CSS, and PostgreSQL for a scalable, performant application.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} SaturnRCC. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}