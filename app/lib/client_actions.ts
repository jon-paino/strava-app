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

  export async function getNewActivities(accessToken: string, lastSyncedAt: string) {
    let page = 1;
    const perPage = 200;
    let fetchedActivities: any[] = [];
    let hasMoreActivities = true;
    const timestamp = new Date(lastSyncedAt).getTime() / 1000; // Convert to epoch time
    console.log('Fetching activities after:', timestamp);
    try {
      while (hasMoreActivities) {
        const response = await fetch(
          `https://www.strava.com/api/v3/athlete/activities?access_token=${accessToken}&after=${timestamp}&page=${page}&per_page=${perPage}`
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
      console.error('Error fetching new activities:', error);
      throw error;
    }
  }
  