import AcmeLogo from '@/app/ui/acme-logo';
import Link from 'next/link';
import { lusitana } from '@/app/ui/fonts';
import Image from 'next/image';
import { GoogleSignInButton } from "./ui/authButtons";
import { getServerSession } from "next-auth";
import { authOptions } from "./lib/authOptions";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getServerSession(authOptions);
  console.log("Session : ", session);
  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className="flex h-20 shrink-0 items-end rounded-lg bg-blue-500 p-4 md:h-52">
        {<AcmeLogo />}
      </div>
      <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
        <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-20">
          <div
            className="relative w-0 h-0 border-l-[15px] border-r-[15px] border-b-[26px] border-l-transparent border-r-transparent border-b-black"
          />
          <div className="w-full flex flex-col items-center justify-center min-h-screen py-2">
            <div className="flex flex-col items-center mt-10 p-10 shadow-md">
              <h1 className="mt-10 mb-4 text-4xl font-bold">Sign In</h1>
              <GoogleSignInButton />
            </div>
          </div>
        </div>
          <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12">
            {/* Add Hero Images Here */}
            <Image
              src="/hero-desktop.png"
              width={1000}
              height={760}
              className="hidden md:block"
              alt="Screenshots of the dashboard project showing desktop version"
            />
            <Image
              src="/hero-mobile.png"
              width={560}
              height={620}
              className="block md:hidden"
              alt="Screenshot of the dashboard project showing mobile version"
            />
          </div>
        </div>
    </main>
  );
}
