import { NextAuthOptions, getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import GoogleProvider from "next-auth/providers/google";
import StravaProvider from "next-auth/providers/strava";
import { Client } from 'pg';
import { fetchStravaUserData, updateStravaUserData } from './actions';
import {insertActivitiesIntoDatabase } from "./actions";
import { getActivities } from "./client_actions";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    StravaProvider({
      clientId: process.env.STRAVA_CLIENT_ID as string,
      clientSecret: process.env.STRAVA_CLIENT_SECRET as string,
      authorization: {
        params: {
          scope: 'read,activity:read_all'  // Request the necessary scopes
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account) {
        // Extract Strava's user ID (which will be used as `id`)
        const stravaId = Number(account.providerAccountId);

        token.accessToken = account.access_token as string;
        token.refreshToken = account.refresh_token as string;
        token.expiresAt = account.expires_at as number;
        token.stravaId = stravaId;

        // Connect to the database
        const client = new Client({
          connectionString: process.env.POSTGRES_URL,
        });

        try {
          await client.connect();

          // Check if the user exists in the database using Strava's id
          const user = await client.query(
            `SELECT id FROM strava.users WHERE id = $1`,
            [stravaId]
          );
          if (user.rows.length === 0) {
            // If user doesn't exist, insert them into the database
            await client.query(
              `INSERT INTO strava.users (id, access_token, refresh_token, expires_at, created_at)
               VALUES ($1, $2, $3, $4, now())`,
              [stravaId, account.access_token, account.refresh_token, account.expires_at]
            );
            if (account.access_token) {
              // Fetch user data from Strava API
              const userData = await fetchStravaUserData(account.access_token);
              // Update user data in PostgreSQL
              await updateStravaUserData(client, userData);
              const activities = await getActivities(account.access_token);
              await insertActivitiesIntoDatabase(activities, stravaId);
            } else {
              console.error('Error: Access token is undefined.');
            }
          } else {
            // If user exists, update their tokens
            await client.query(
              `UPDATE strava.users
               SET access_token = $1,
                   refresh_token = $2,
                   expires_at = $3,
                   last_synced_at = now()
               WHERE id = $4`,
              [account.access_token, account.refresh_token, account.expires_at, stravaId]
            );
          }
        } catch (error) {
          console.error('Error interacting with the database:', error);
        } finally {
          // Ensure the client connection is closed
          await client.end();
        }
      }

      return token;
    },
    async session({ session, token }) {
      // Store the tokens in the session for client use
      session.accessToken = token.accessToken as string;
      session.refreshToken = token.refreshToken as string;
      session.expiresAt = token.expiresAt as number;
      session.stravaId = token.stravaId as string;
      return session;
    },
  },
};



export async function loginIsRequiredServer() {
  const session = await getServerSession(authOptions);
  if (!session) return redirect("/");
}

