import { Payment, columns } from "./columns"
import { DataTableDemo } from "./data-table"

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    // ...
  ]
}

export default async function DemoPage() {
  const data = await getData()

  return (
    <div className="dark container mx-auto py-10 max-w-4xl">
      <DataTableDemo />
    </div>
  )
  
}
