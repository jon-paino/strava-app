import { NextRequest, NextResponse } from 'next/server';
import { Client } from 'pg';

export async function GET(request: NextRequest) {
    const client = new Client({
        connectionString: process.env.POSTGRES_URL,
    });

    try {
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get('userId');

        if (!userId) {
            return NextResponse.json(
                { error: 'Missing required query parameter: userId' },
                { status: 400 }
            );
        }

        await client.connect();

        // SQL query to fetch activities by userId
        const query = `
            SELECT * FROM strava.activities WHERE user_id = $1
        `;

        // Execute the query
        const result = await client.query(query, [userId]);
        // Return activities as JSON
        return NextResponse.json({ activities: result.rows });
    } catch (error) {
        // Log the full error for debugging
        console.error('Error fetching activities:', error);
        return NextResponse.json(
            { error: 'Error fetching activities' },
            { status: 500 }
        );
    } finally {
        await client.end();
    }
}
