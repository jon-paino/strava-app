'use client';

import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import { LatLngExpression, LatLng } from 'leaflet';
import polyline from '@mapbox/polyline';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

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
    const { data: session } = useSession();
    console.log('session:', session);
    // Fetch activities and set polylines when the component mounts
    useEffect(() => {
        const fetchActivities = async () => {
            const accessToken = session?.accessToken as string | undefined;
            if (!accessToken) return;

            try {
                const response = await fetch(`https://www.strava.com/api/v3/athlete/activities?access_token=${accessToken}`);
                const data = await response.json();

                // Decode each activity's polyline and set it to state
                const polylines = data.map((activity: any) => {
                    const encodedPolyline = activity.map.summary_polyline;
                    return polyline.decode(encodedPolyline);
                });

                setActivityPolylines(polylines);
            } catch (error) {
                console.error('Error fetching activities:', error);
            }
        };

        fetchActivities();
    }, [session]);

    // Handler for marker drag end event
    const handleDragEnd = (event: any) => {
        const newLatLng = event.target.getLatLng();
        setMarkerPosition(newLatLng); // Update state with new position
    };


    return (
        <MapContainer
            center={markerPosition}
            zoom={zoom}
            scrollWheelZoom={true}
            style={{ height: "100vh", width: "100%" }}
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
    );
}

export default Map;
