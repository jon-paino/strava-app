import { Client } from 'pg';
import { StravaUser } from '@/types/types';

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


export async function fetchStravaUserData(accessToken: string) {
  const response = await fetch('https://www.strava.com/api/v3/athlete', {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  });
  const data = await response.json();
  return data;
}

export async function updateStravaUserData(client : Client, userData : StravaUser) {
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
