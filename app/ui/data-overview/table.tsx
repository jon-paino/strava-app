import Image from 'next/image';
import { lusitana } from '@/app/ui/fonts';
import Search from '@/app/ui/search';
import { FormattedActivity } from '@/app/lib/definitions';
import { useSession } from 'next-auth/react';

export default function AthleteActivityTable({
  activities,
}: {
  activities: FormattedActivity[];
}) {
  const { data: session } = useSession();

  return (
    <div className="w-full">
      <h1 className={`${lusitana.className} mb-8 text-xl md:text-2xl`}>
        {session?.user?.name}'s Activities
      </h1>
      <div className="flex items-center gap-3 mb-6">
        {/* Conditionally render the Image component if the image URL exists */}
        {session?.user?.image ? (
          <Image
            src={session.user.image}
            alt={`${session?.user?.name}'s profile picture`}
            className="rounded-full"
            width={50}
            height={50}
          />
        ) : (
          <div className="rounded-full bg-gray-300" style={{ width: 50, height: 50 }} />
        )}
        <p className="text-lg">{session?.user?.name}</p>
      </div>
      <Search placeholder="Search activities..." />
      <div className="mt-6 flow-root">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden rounded-md bg-gray-50 p-2 md:pt-0">
              <table className="min-w-full rounded-md text-gray-900">
                <thead className="rounded-md bg-gray-50 text-left text-sm font-normal">
                  <tr>
                    <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                      Activity Type
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Distance (m)
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Duration (sec)
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Elevation (m)
                    </th>
                    <th scope="col" className="px-4 py-5 font-medium">
                      Date
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200 text-gray-900">
                  {activities.map((activity) => (
                    <tr key={activity.id} className="group">
                      <td className="whitespace-nowrap bg-white py-5 pl-4 pr-3 text-sm sm:pl-6">
                        <p>{activity.type}</p>
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {activity.distance}
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {activity.duration}
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {new Date(activity.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
