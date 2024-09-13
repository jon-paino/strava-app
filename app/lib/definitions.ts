// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.

// Inside /app/lib/definitions.ts or another location in your project
export interface FormattedActivity {
  id: string;
  type: string;
  distance: number; // In meters
  duration: number; // In seconds
  elevation: number; // In meters
  date: Date; // Activity date
}

export interface Activity {
  id: string; // Activity ID
  userId: string; // User ID
  name: string | null; // Name of the activity
  distance: number | null; // Distance of the activity in meters
  moving_time: number | null; // Moving time in seconds
  elapsed_time: number | null; // Elapsed time in seconds
  total_elevation_gain: number | null; // Total elevation gain in meters
  type: string | null; // Type of activity (e.g., "Run", "Ride")
  start_date: string | null; // ISO string for start date
  timezone: string | null; // Timezone of the activity
  achievement_count: number; // Number of achievements in the activity
  kudos_count: number; // Number of kudos the activity received
  comment_count: number; // Number of comments on the activity
  athlete_count: number; // Number of athletes involved in the activity
  map?: { // Optional map field containing polyline details
      summary_polyline: string | null; // Summary polyline
  } | null; // map field is optional
}


export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type Customer = {
  id: string;
  name: string;
  email: string;
  image_url: string;
};

export type Invoice = {
  id: string;
  customer_id: string;
  amount: number;
  date: string;
  // In TypeScript, this is called a string union type.
  // It means that the "status" property can only be one of the two strings: 'pending' or 'paid'.
  status: 'pending' | 'paid';
};

export type Revenue = {
  month: string;
  revenue: number;
};

export type LatestInvoice = {
  id: string;
  name: string;
  image_url: string;
  email: string;
  amount: string;
};

// The database returns a number for amount, but we later format it to a string with the formatCurrency function
export type LatestInvoiceRaw = Omit<LatestInvoice, 'amount'> & {
  amount: number;
};

export type InvoicesTable = {
  id: string;
  customer_id: string;
  name: string;
  email: string;
  image_url: string;
  date: string;
  amount: number;
  status: 'pending' | 'paid';
};

export type CustomersTableType = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: number;
  total_paid: number;
};

export type FormattedCustomersTable = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: string;
  total_paid: string;
};

export type CustomerField = {
  id: string;
  name: string;
};

export type InvoiceForm = {
  id: string;
  customer_id: string;
  amount: number;
  status: 'pending' | 'paid';
};
