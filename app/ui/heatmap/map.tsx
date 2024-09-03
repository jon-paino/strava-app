'use client';

import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import { LatLngExpression, LatLng } from 'leaflet';
import polyline from '@mapbox/polyline';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import Filter from './Filter';
import { useSession } from 'next-auth/react';

// The paths to the images from leaflet are not correct, so we need to set them manually
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

interface MapProps {
    latlong?: LatLngExpression,
    zoom?: number,
}

const defaults = {
    latlong: [34.07238006591797, -118.45283509232104] as LatLngExpression,
    zoom: 19 as number,
}

const Map = (props: MapProps) => {
    const { zoom = defaults.zoom, latlong = defaults.latlong } = props;
    const latLngObject = L.latLng(latlong);
    const [markerPosition, setMarkerPosition] = useState(latLngObject);
    const [activityPolylines, setActivityPolylines] = useState<LatLng[][]>([]);
    const [selectedTypes, setSelectedTypes] = useState<string[]>(['run', 'swim', 'ride']);
    const [runFilters, setRunFilters] = useState<{ duration?: number; mph?: number; miles?: number }>({});
    const { data: session } = useSession();
    console.log('session:', session);

    // Fetch all activities when the component mounts
    useEffect(() => {
        const fetchAllActivities = async () => {
            const accessToken = session?.accessToken as string | undefined;
            if (!accessToken) return;

            let page = 1;
            const perPage = 200;
            let allActivities: any[] = [];
            let hasMoreActivities = true;

            try {
                while (hasMoreActivities) {
                    const response = await fetch(`https://www.strava.com/api/v3/athlete/activities?access_token=${accessToken}&page=${page}&per_page=${perPage}`);
                    const data = await response.json();

                    if (data.length === 0) {
                        hasMoreActivities = false;
                    } else {
                        allActivities = allActivities.concat(data);
                        page++;
                    }
                }

                // Filter activities based on selected types and run-specific filters
                const filteredActivities = allActivities.filter((activity: any) => {
                    const isTypeSelected = selectedTypes.includes(activity.type.toLowerCase());
                    const isRunFilterPassed = activity.type.toLowerCase() === 'run' ? (
                        (!runFilters.duration || (activity.elapsed_time / 60 >= runFilters.duration)) &&
                        (!runFilters.mph || (activity.average_speed * 2.23694 >= runFilters.mph)) &&
                        (!runFilters.miles || (activity.distance / 1609.34 >= runFilters.miles))
                    ) : true;

                    return isTypeSelected && isRunFilterPassed;
                });


                // Decode each activity's polyline and store it
                const polylines = filteredActivities.map((activity: any) => {
                    const encodedPolyline = activity.map.summary_polyline;
                    return encodedPolyline
                        ? polyline.decode(encodedPolyline).map(([lat, lng]) => new LatLng(lat, lng))
                        : [];
                });

                setActivityPolylines(polylines);
            } catch (error) {
                console.error('Error fetching activities:', error);
            }
        };

        fetchAllActivities();
    }, [session, selectedTypes, runFilters]);

    // Handler for marker drag end event
    const handleDragEnd = (event: any) => {
        const newLatLng = event.target.getLatLng();
        setMarkerPosition(newLatLng); // Update state with new position
    };


    return (
        <div style={{ display: 'flex' }}>
            <Filter
                selectedTypes={selectedTypes}
                onFilterChange={setSelectedTypes}
                onRunFilterChange={setRunFilters}
            />
            <MapContainer
                center={markerPosition}
                zoom={zoom}
                scrollWheelZoom={true}
                style={{ height: "80vh", width: "60vw" }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={markerPosition} draggable={true} eventHandlers={{ dragend: handleDragEnd }}>
                    <Popup>{`Coordinates: ${markerPosition.lat}, ${markerPosition.lng}`}</Popup>
                </Marker>

                {/* Render a polyline for each activity */}
                {activityPolylines.map((polylineCoords, index) => (
                    <Polyline key={index} positions={polylineCoords} color='blue' weight={4} opacity={0.7} />
                ))}
            </MapContainer>
        </div>
    );
}

export default Map;
