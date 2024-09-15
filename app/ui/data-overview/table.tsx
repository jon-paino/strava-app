import Image from 'next/image';
import { lusitana } from '@/app/ui/fonts';
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
      
      <div className="mt-6 flow-root">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden rounded-md bg-orange-500 p-2 md:pt-0">
              <table className="min-w-full rounded-md text-gray-900">
                <thead className="rounded-md text-left text-sm font-normal bg-orange-500">
                  <tr>
                    <th scope="col" className="px-4 py-5 font-medium sm:pl-6 ">
                      Activity Type
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium border-l border-black">
                      Distance (m)
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium border-l border-black">
                      Duration (sec)
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium border-l border-black">
                      Elevation (m)
                    </th>
                    <th scope="col" className="px-4 py-5 font-medium border-l border-black">
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
                        {activity.elevation}
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
