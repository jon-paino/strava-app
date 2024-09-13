'use client';
import Link from 'next/link';
import NavLinks from '@/app/ui/dashboard/nav-links';
import SignOutButton from '@/app/ui/dashboard/SignOutButton';
import { Activity } from 'lucide-react'; // Import the Activity icon
import { useSession } from 'next-auth/react';
import Image from 'next/image';

export default function SideNav() {
  const { data: session } = useSession();

  return (
    <div className="flex h-full flex-col px-3 py-4 bg-black md:px-2">
      {/* Adjusted height of the logo section */}
      <Link
        className="mb-2 flex h-16 items-center justify-start rounded-md bg-orange-600 p-4"
        href="/"
      >
        <div className="w-32 text-white md:w-40">
          <div className="flex items-center gap-2">
            <Activity className="h-6 w-6 text-white" />
            <span className="text-2xl font-bold text-white">FitFlow</span>
          </div>
        </div>
      </Link>

      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />

        {/* Display user info if session exists */}
        {session && (
          <div className="hidden h-auto w-full grow rounded-md bg-gray-100 p-4 md:flex flex-col items-center justify-center space-y-2">
            {session?.user?.image ? (
              <>
                <Image
                  src={session.user.image}
                  alt={`${session?.user?.name}'s profile picture`}
                  className="rounded-full"
                  width={50}
                  height={50}
                />
                <p className="text-lg text-white">{session.user.name}</p>
                <p className="text-sm text-gray-400">5 completed activities</p>
                <p className="text-sm text-gray-400">10 miles this week</p>
              </>
            ) : (
              <div className="rounded-full bg-gray-300" style={{ width: 50, height: 50 }} />
            )}
          </div>
        )}
        <form>
          <SignOutButton />
        </form>
      </div>
    </div>
  );
}
