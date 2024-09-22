import { Client } from 'pg';
import { StravaUser } from '@/types/types';
import { Activity } from './definitions';

export async function insertActivitiesIntoDatabase(activities: any[], userId: number) {
  const client = new Client({
    connectionString: process.env.POSTGRES_URL,
  });

  try {
    await client.connect();

    // Step 1: Get the IDs of the activities to process
    const activityIds = activities.map((activity) => activity.id);

    // Step 2: Retrieve existing activity IDs from the database
    const res = await client.query(
      'SELECT id FROM strava.activities WHERE id = ANY($1)',
      [activityIds]
    );
    const existingIds = new Set(res.rows.map((row) => row.id));

    // Step 3: Filter out activities that already exist
    const newActivities = activities.filter(
      (activity) => !existingIds.has(activity.id)
    );

    if (newActivities.length === 0) {
      console.log('No new activities to insert.');
      return;
    }

    // Step 4: Prepare data for batch insertion with conflict handling
    const numFields = 15;
    const values: any[] = [];
    const valuePlaceholders: string[] = [];
    let paramIndex = 1;

    newActivities.forEach((activity) => {
      const placeholders = [];
      for (let j = 0; j < numFields; j++) {
        placeholders.push(`$${paramIndex}`);
        paramIndex++;
      }
      valuePlaceholders.push(`(${placeholders.join(', ')})`);

      values.push(
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
        activity.map?.summary_polyline || null
      );
    });

    // Step 5: Perform batch insertion with conflict handling
    const queryText = `
      INSERT INTO strava.activities (
        id, user_id, name, distance, moving_time, elapsed_time, total_elevation_gain,
        type, start_date, timezone, achievement_count, kudos_count, comment_count, athlete_count, summary_polyline
      ) VALUES ${valuePlaceholders.join(', ')}
      ON CONFLICT (id) DO NOTHING
    `;

    await client.query(queryText, values);
    console.log(`Inserted ${newActivities.length} new activities.`);
  } catch (error) {
    console.error('Error inserting activities:', error);
    throw error;
  } finally {
    await client.end();
  }
}


export async function insertNewActivitiesIntoDatabase(activities: any[], userId: number) {
  const client = new Client({
    connectionString: process.env.POSTGRES_URL,
  });

  try {
    await client.connect();

    // Step 1: Get the IDs of the activities to process
    const activityIds = activities.map((activity) => activity.id);

    // Step 2: Retrieve existing activity IDs from the database
    const res = await client.query(
      'SELECT id FROM strava.activities WHERE id = ANY($1)',
      [activityIds]
    );
    const existingIds = new Set(res.rows.map((row) => row.id));

    // Step 3: Filter out activities that already exist
    const newActivities = activities.filter(
      (activity) => !existingIds.has(activity.id)
    );

    if (newActivities.length === 0) {
      console.log('No new activities to insert.');
      return;
    }

    // Step 4: Prepare data for batch insertion
    const numFields = 15;
    const values: any[] = [];
    const valuePlaceholders: string[] = [];
    let paramIndex = 1;

    newActivities.forEach((activity) => {
      const placeholders = [];
      for (let j = 0; j < numFields; j++) {
        placeholders.push(`$${paramIndex}`);
        paramIndex++;
      }
      valuePlaceholders.push(`(${placeholders.join(', ')})`);

      values.push(
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
        activity.map?.summary_polyline || null
      );
    });

    // Step 5: Perform batch insertion
    const queryText = `
      INSERT INTO strava.activities (
        id, user_id, name, distance, moving_time, elapsed_time, total_elevation_gain,
        type, start_date, timezone, achievement_count, kudos_count, comment_count, athlete_count, summary_polyline
      ) VALUES ${valuePlaceholders.join(', ')}
    `;

    await client.query(queryText, values);
    console.log(`Inserted ${newActivities.length} new activities.`);
  } catch (error) {
    console.error('Error inserting activities:', error);
    throw error;
  } finally {
    await client.end();
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
    await client.query(
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


