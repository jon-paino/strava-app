import { Client } from 'pg';
import { StravaUser } from '@/types/types';

export async function insertActivitiesIntoDatabase(activities: any[], userId: number) {
  const client = new Client({
    connectionString: process.env.POSTGRES_URL,
  });

  try {
    await client.connect();

    const insertPromises = activities.map(async (activity) => {
      // Check if activity already exists
      const existingActivity = await client.query(
        'SELECT id FROM strava.activities WHERE id = $1',
        [activity.id]
      );

      if (existingActivity.rows.length === 0) {
        // Insert new activity
        return client.query(
          `INSERT INTO strava.activities (
            id, user_id, name, distance, moving_time, elapsed_time, total_elevation_gain,
            type, start_date, timezone, achievement_count, kudos_count, comment_count, athlete_count
          ) VALUES (
            $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14
          )`,
          [
            activity.id,
            userId,
            activity.name || null,
            activity.distance || null,
            activity.moving_time || null,
            activity.elapsed_time || null,
            activity.total_elevation_gain || null,
            activity.type || null,
            activity.start_date || null,
            activity.timezone || null,
            activity.achievement_count || 0,
            activity.kudos_count || 0,
            activity.comment_count || 0,
            activity.athlete_count || 0,
          ]
        );
      } else {
        console.log(`Activity with id ${activity.id} already exists.`);
        return null;
      }
    });

    await Promise.all(insertPromises);  // Wait for all insertions to complete
  } catch (error) {
    console.error('Error inserting activities:', error);
    throw error;
  } finally {
    await client.end();
  }
}

export async function getActivities(accessToken: string) {
  let page = 1;
  const perPage = 200;
  let fetchedActivities: any[] = [];
  let hasMoreActivities = true;

  try {
    while (hasMoreActivities) {
      const response = await fetch(
        `https://www.strava.com/api/v3/athlete/activities?access_token=${accessToken}&page=${page}&per_page=${perPage}`
      );
      const data = await response.json();

      if (data.length === 0) {
        hasMoreActivities = false;
      } else {
        fetchedActivities = fetchedActivities.concat(data);
        page++;
      }
    }

    return fetchedActivities;
  } catch (error) {
    console.error('Error fetching activities:', error);
    throw error;
  }
}

export async function getUpdatedActivities(accessToken: string, lastSyncedAt: string) {
  let page = 1;
  const perPage = 200;
  let fetchedActivities: any[] = [];
  let hasMoreActivities = true;

  try {
    while (hasMoreActivities) {
      const response = await fetch(
        `https://www.strava.com/api/v3/athlete/activities?access_token=${accessToken}&page=${page}&per_page=${perPage}&after=${Math.floor(new Date(lastSyncedAt).getTime() / 1000)}`
      );
      const data = await response.json();

      if (data.length === 0) {
        hasMoreActivities = false;
      } else {
        fetchedActivities = fetchedActivities.concat(data);
        page++;
      }
    }

    return fetchedActivities;
  } catch (error) {
    console.error('Error fetching updated activities:', error);
    throw error;
  }
}

export async function fetchStravaUserData(accessToken: string) {
  const response = await fetch('https://www.strava.com/api/v3/athlete', {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  });
  const data = await response.json();
  return data;
}

export async function updateStravaUserData(client: Client, userData: StravaUser) {
  try {
    // Check if user exists first, as you're updating an existing row
    const result = await client.query(
      `UPDATE strava.users
       SET username = $1,
           resource_state = $2,
           firstname = $3,
           lastname = $4,
           city = $5,
           state = $6,
           country = $7,
           sex = $8,
           last_synced_at = now()
       WHERE id = $9`,
      [
        userData.username,
        userData.resource_state,
        userData.firstname,
        userData.lastname,
        userData.city,
        userData.state,
        userData.country,
        userData.sex,
        userData.id // Strava ID as the primary key
      ]
    );
    console.log('User data updated successfully');
  } catch (error) {
    console.error('Error updating user data:', (error as Error).message);
  }
}
