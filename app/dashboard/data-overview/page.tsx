'use client';

import { useEffect, useState } from 'react';
import AthleteActivityTable from "@/app/ui/data-overview/table";
import { getActivities } from "@/app/lib/client_actions";
import { useSession } from 'next-auth/react';
import { Activity, FormattedActivity } from '@/app/lib/definitions';
import Pagination from '@/app/ui/data-overview/pagination';

export default function Page() {
  const { data: session, status } = useSession();
  const [activities, setActivities] = useState<FormattedActivity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;  // Number of items per page

  useEffect(() => {
    const fetchActivities = async () => {
      if (!session?.accessToken) return;

      try {
        const userId = session?.stravaId as number | undefined;
        if (!userId) return;
        const response = await fetch(`/api/activities?userId=${userId}`);
        const result = await response.json(); // Assuming the API response is an object like { activities: [...] }

        // Check if the activities field exists and is an array
        const rawActivities = result.activities;

        // Map the raw activity data to FormattedActivity structure
        const formattedActivities = rawActivities.map((activity: any) => ({
          id: activity.id,
          type: activity.type,
          distance: activity.distance,
          duration: activity.moving_time,
          elevation: activity.total_elevation_gain,
          date: new Date(activity.start_date),
        }));
        const sortedActivities = formattedActivities.sort((a: FormattedActivity, b: FormattedActivity) => b.date.getTime() - a.date.getTime());

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

  if (status === 'loading') return <p>Loading session...</p>;
  if (isLoading) return <p>Loading activities...</p>;
  if (error) return <p>{error}</p>;

  // Calculate total pages based on the number of activities and items per page
  const totalPages = Math.ceil(activities.length / itemsPerPage);

  // Get the activities for the current page
  const paginatedActivities = activities.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div>
      <AthleteActivityTable activities={paginatedActivities} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
}
