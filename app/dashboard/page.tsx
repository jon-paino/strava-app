import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/authOptions";

export default async function Page() {

  const session = await getServerSession(authOptions);
  console.log("Session : ", session);

    return <p>Dashboard Page</p>;
  }