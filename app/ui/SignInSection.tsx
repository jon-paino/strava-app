import { Activity } from 'lucide-react';
import { StravaSignInButton } from '../ui/authButtons'; // Import your StravaSignInButton

export default function SignInSection() {
  return (
    <div className="flex flex-col justify-center items-center space-y-8">
      {/* Activity logo instead of the triangle */}
      <Activity className="h-10 w-10 text-orange-600 mx-auto" />
      {/* Sign In Title */}
      <h1 className="text-3xl font-bold text-center text-white">Sign In</h1>
      {/* Strava Sign In Button */}
      <div className="space-y-4 flex justify-center">
        <StravaSignInButton />
      </div>
    </div>
  );
}
