import { Activity } from 'lucide-react';

export default function Header() {
  return (
    <header className="flex h-16 shrink-0 items-center bg-orange-600 px-4 md:px-6">
      <div className="flex items-center gap-2">
        <Activity className="h-6 w-6 text-white" />
        <span className="text-2xl font-bold text-white">FitFlow</span>
      </div>
    </header>
  )
}