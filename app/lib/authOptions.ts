import { NextAuthOptions, getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import GoogleProvider from "next-auth/providers/google";
import StravaProvider from "next-auth/providers/strava";

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
        async jwt({ token, account }) {
          // Persist the OAuth access token to the token object
          if (account) {
            token.accessToken = account.access_token;
          }
          return token;
        },
        async session({ session, token }) {
          // Include access token in the session
          session.accessToken = token.accessToken;
          return session;
        },
      },
  };
  

export async function loginIsRequiredServer() {
    const session = await getServerSession(authOptions);
    if (!session) return redirect("/");
}

