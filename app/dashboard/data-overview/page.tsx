'use client';

import { useEffect, useState } from 'react';
import AthleteActivityTable from "@/app/ui/data-overview/table";
import { getActivities } from "@/app/lib/actions";
import { useSession } from 'next-auth/react';
import { FormattedActivity } from '@/app/lib/definitions';

export default function Page() {
  const { data: session, status } = useSession();
  const [activities, setActivities] = useState<FormattedActivity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchActivities = async () => {
      if (!session?.accessToken) return;

      try {
        const rawActivities = await getActivities(session.accessToken);
        
        // Map the raw activity data to FormattedActivity structure
        const formattedActivities = rawActivities.map((activity: any) => ({
          id: activity.id,
          type: activity.type, 
          distance: activity.distance,
          duration: activity.moving_time, 
          date: activity.start_date, 
        }));

        setActivities(formattedActivities);
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

  return (
    <div>
      <AthleteActivityTable activities={activities} />
    </div>
  );
}