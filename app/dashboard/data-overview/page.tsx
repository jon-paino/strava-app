'use client';

import { useEffect, useState, useMemo } from 'react';
import AthleteActivityTable from "@/app/ui/data-overview/table";
import { getActivities } from "@/app/lib/client_actions";
import { useSession } from 'next-auth/react';
import { Activity, FormattedActivity } from '@/app/lib/definitions';
import Pagination from '@/app/ui/data-overview/pagination';
import Search from '@/app/ui/search';
import Image from 'next/image';

export default function Page() {
  const { data: session, status } = useSession();
  const [activities, setActivities] = useState<FormattedActivity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Number of items per page

  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchActivities = async () => {
      if (!session?.accessToken) return;

      try {
        const userId = session?.stravaId as number | undefined;
        if (!userId) return;
        const response = await fetch(`/api/activities?userId=${userId}`);
        const result = await response.json();

        const rawActivities = result.activities;

        const formattedActivities = rawActivities.map((activity: any) => ({
          id: activity.id,
          type: activity.type,
          distance: activity.distance,
          duration: activity.moving_time,
          elevation: activity.total_elevation_gain,
          date: new Date(activity.start_date),
        }));
        const sortedActivities = formattedActivities.sort(
          (a: FormattedActivity, b: FormattedActivity) =>
            b.date.getTime() - a.date.getTime()
        );

        setActivities(sortedActivities);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching activities:', error);
        setError('Failed to fetch activities');
        setIsLoading(false);
      }
    };

    if (status === 'authenticated') {
      fetchActivities();
    }
  }, [session, status]);

  const filteredActivities = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return activities.filter((activity) => {
      const type = activity.type?.toLowerCase() ?? '';
      const distance = activity.distance?.toString() ?? '';
      const duration = activity.duration?.toString() ?? '';
      const elevation = activity.elevation?.toString() ?? '';
      const dateStr =
        activity.date
          ?.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })
          .toLowerCase() ?? '';
  
      return (
        type.includes(query) ||
        distance.includes(query) ||
        duration.includes(query) ||
        elevation.includes(query) ||
        dateStr.includes(query)
      );
    });
  }, [activities, searchQuery]);

  const totalPages = Math.ceil(filteredActivities.length / itemsPerPage);

  const paginatedActivities = filteredActivities.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  // Conditional rendering happens after hooks
  if (status === 'loading') return <p>Loading session...</p>;
  if (isLoading) return <p>Loading activities...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
  <div className="flex items-center gap-3 mb-6 text-white">
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
    <p className="text-lg">{`${session?.user?.name}'s Activities`}</p>
  </div>
  <Search
    placeholder="Search activities..."
    value={searchQuery}
    onChange={setSearchQuery}
  />
  {paginatedActivities.length > 0 ? (
    <AthleteActivityTable activities={paginatedActivities} />
  ) : (
    <p className="text-white mt-4">No activities found.</p>
  )}
  <Pagination
    currentPage={currentPage}
    totalPages={totalPages}
    onPageChange={(page) => setCurrentPage(page)}
  />
</div>
  );
}