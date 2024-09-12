import Header from './ui/header';
import { getServerSession } from "next-auth";
import { authOptions } from "./lib/authOptions";
import { redirect } from "next/navigation";
import DynamicGraph from './ui/DynamicGraph';
import DynamicText from './ui/DynamicText';
import SignInSection from './ui/SignInSection'; // Import the new SignInSection component
import DynamicMap from './ui/HomeMap';

export default async function Page() {
  const session = await getServerSession(authOptions);
  console.log("Session: ", session);
  if (session) {
    redirect("/dashboard");
  }

  return (
    <main className="flex min-h-screen flex-col bg-gray-900">
  {/* Header Section */}
  <div className="flex h-16 items-center justify-center bg-orange-600 px-4 md:px-6 md:h-20">
    <Header />
  </div>

  {/* Main Section */}
  <div className="flex grow flex-col md:flex-row overflow-hidden">
    {/* Left Section */}
    <div className="flex flex-col justify-center items-center md:w-2/5 p-6">
      <div className="w-full max-w-md space-y-12">
        <DynamicText />
        <SignInSection />
      </div>
    </div>

    {/* Right Section with Graph */}
    <div className="flex items-center justify-center md:w-3/5 p-6">
      <div className="w-full max-w-3xl h-[500px] flex flex-col space-y-6 overflow-auto">
        <DynamicGraph />
        <DynamicMap />
      </div>
    </div>
  </div>
</main>

  );
}
