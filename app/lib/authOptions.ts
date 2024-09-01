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
        })
    ],
};

export async function loginIsRequiredServer() {
    const session = await getServerSession(authOptions);
    if (!session) return redirect("/");
}

