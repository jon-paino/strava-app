https://strava-app-lime.vercel.app
# Strava Activity Dashboard - Next.js App Router

This project is a Next.js web application that integrates with the Strava API to display and filter fitness activities. The app allows users to authenticate with Strava, fetch their activities, and view them on an interactive map using React Leaflet. Additionally, the app features an activity table component with filtering and pagination support. (Goal of final implementation is to use a ML algorithm [I'm thinking KNN will be most effective] to give an estimate of a workout performance after importing GPX route file, location, and time of day the activity will take place)

## Features

- **OAuth Authentication**: Uses NextAuth.js with Strava and Google providers.
- **Activity Data**: Fetches user activity data from the Strava API using an authenticated access token.
- **Map Component**: Displays Strava workout routes on a map using React Leaflet.
- **Activity Table**: Displays activities in a table with filtering and pagination features.
- **Custom Filters**: Includes sliders and checkboxes to filter activities by speed, distance, and time.

## Tech Stack

- **Next.js (App Router)**: Framework for building the frontend with server-side rendering and API routes.
- **PostgreSQL**: Database engine for storing user and activity data
- **Strava API**: Fetches workout data from Strava for authenticated users.
- **React Leaflet**: Library for rendering the interactive map and displaying workout routes.
- **NextAuth.js**: Handles authentication with Strava and Google OAuth providers.
- **AG Grid**: Used for the dynamic activity table with pagination and filtering capabilities.
- **pnpm**: Package manager for project dependencies.

## Setup

### Prerequisites

- Node.js (v16 or later)
- Strava API account and access credentials
- Google API account and OAuth credentials

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/strava-activity-dashboard.git
   cd strava-activity-dashboard
   ```

2. Install dependencies using pnpm:
   ```bash
   pnpm install
   ```

3. Set up your environment variables:
   Create a `.env.local` file in the root of your project and add the following:

   ```bash
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-nextauth-secret

   STRAVA_CLIENT_ID=your-strava-client-id
   STRAVA_CLIENT_SECRET=your-strava-client-secret

   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   ```

### Strava API Configuration

1. Visit the [Strava API Developer Dashboard](https://www.strava.com/settings/api) and create an application.
2. Add the correct redirect URL for your OAuth flow: `http://localhost:3000/api/auth/callback/strava`.
3. Copy the `CLIENT_ID` and `CLIENT_SECRET` to your `.env.local` file.

### Running the Application

1. Start the development server:
   ```bash
   pnpm dev
   ```

2. Open your browser and go to [http://localhost:3000](http://localhost:3000) to view the app.

## Application Structure

- **`app/`**: Contains the main routes for the Next.js app using the App Router.
  - `map/`: Displays the map with workout routes.
  - `activity-table/`: Displays the table of activities with pagination and filtering.
  - `api/`: Contains the API route for fetching Strava activity data.
- **`components/`**: Holds the reusable components like `Map`, `ActivityTable`, and `Filters`.
- **`lib/`**: Contains helper functions for interacting with the Strava API.
- **`pages/`**: Authentication pages handled by NextAuth.js.

## Usage

### Authentication

Users can authenticate with Strava or Google by clicking the "Login" button on the main page. Upon successful authentication, the app fetches their Strava activities using an access token with the required `read_all` scope.

### Fetching Activities

Once authenticated, the app automatically fetches the user's activities from the Strava API using the `/api/v3/athlete/activities` endpoint. The activities are passed as props to both the `Map` and `ActivityTable` components.

### Map Component

The `Map` component uses React Leaflet to display the user's workout routes on an interactive map. Each activity's polyline is decoded and rendered on the map.

### Activity Table

The `ActivityTable` component displays all activities in a paginated table. Users can filter the activities based on speed, distance, and duration. The table uses AG Grid for efficient rendering and dynamic data handling.

### Filters

The app includes filter options, allowing users to customize their view:
- **Checkboxes**: Filter by activity type (e.g., running, cycling).
- **Sliders**: Filter by duration, speed, and distance.

## Future Enhancements

- Add more complex filters (e.g., date range).
- Improve map performance with clustering for large datasets.
- Implement data caching for faster reloading.
- Add unit tests for API and component interactions.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

<img width="1000" alt="Screenshot 2024-09-14 at 1 01 44 PM" src="https://github.com/user-attachments/assets/172e144e-e123-4860-b210-b89810ede85d">
<img width="1000" alt="Screenshot 2024-09-14 at 12 42 32 PM" src="https://github.com/user-attachments/assets/1fae7f7e-9412-4524-9400-df001bc06ae0">
<img width="1000" alt="Screenshot 2024-09-14 at 1 01 11 PM" src="https://github.com/user-attachments/assets/0ccdf2f1-3a52-4095-818b-a9849c739b2c">

