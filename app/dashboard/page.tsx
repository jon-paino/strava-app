import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/authOptions";

export default async function Page() {
  return <p>Dashboard Page</p>;
}