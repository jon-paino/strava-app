import dynamic from "next/dynamic";
import { useMemo } from "react";
import { MapSkeleton } from "@/app/ui/skeletons";
import { getActivities } from "@/app/lib/client_actions";

export default async function Page() {
    // This is a dynamic import of the Map component and uses the useMemo hook to memoize the component.
    const Map = useMemo(() => dynamic(
        () => import('@/app/ui/heatmap/map'),
        {
            loading: () => <MapSkeleton />,
            ssr: false
        }
    ), [])

    return (
        <>
            <div className="mx-auto my-5 w-[98%] h-[480px]">
                <Map />
            </div>
        </>
    )
}