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
    zoom: 15 as number,
}

const Map = (props: MapProps) => {
    const { zoom = defaults.zoom, latlong = defaults.latlong } = props;
    const latLngObject = L.latLng(latlong);
    const [markerPosition, setMarkerPosition] = useState(latLngObject);
    const [activityPolylines, setActivityPolylines] = useState<LatLng[][]>([]);
    const [selectedTypes, setSelectedTypes] = useState<string[]>(['run', 'swim', 'ride']);
    const [runFilters, setRunFilters] = useState<{ duration?: number; mph?: number; miles?: number }>({});
    const [rideFilters, setRideFilters] = useState<{ duration?: number; mph?: number; miles?: number }>({});
    const [swimFilters, setSwimFilters] = useState<{ duration?: number; mph?: number; miles?: number }>({});
    const [allActivities, setAllActivities] = useState<any[]>([]); // Store all fetched activities
    const [filteredActivities, setFilteredActivities] = useState<any[]>([]); // Store filtered activities
    const { data: session } = useSession();
    console.log('session:', session);

    useEffect(() => {
        const fetchAllActivities = async () => {
            const userId = session?.stravaId as number | undefined;
            if (!userId) return;
    
            try {
                // Fetch activities from your custom API route
                const response = await fetch(`/api/activities?userId=${userId}`);
                const data = await response.json();
                if (response.ok) {
                    setAllActivities(data.activities); // Store fetched activities in state
                } else {
                    console.error('Error fetching activities from database:', data.error);
                }
            } catch (error) {
                console.error('Error fetching activities:', error);
            }
        };
    
        if (session) {
            fetchAllActivities();
        }
    }, [session]); // Only fetch once when session is available
    
    // Apply client-side filtering based on selected types and filters
    useEffect(() => {
        const applyFilters = () => {
            const filtered = allActivities.filter((activity) => {
                const isTypeSelected = selectedTypes.includes(activity.type.toLowerCase());
    
                const isRunFilterPassed = activity.type.toLowerCase() === 'run' ? (
                    (!runFilters.duration || (activity.elapsed_time / 60 >= runFilters.duration)) &&
                    (!runFilters.mph || (activity.average_speed * 2.23694 >= runFilters.mph)) &&
                    (!runFilters.miles || (activity.distance / 1609.34 >= runFilters.miles))
                ) : true;
    
                const isRideFilterPassed = activity.type.toLowerCase() === 'ride' ? (
                    (!rideFilters.duration || (activity.elapsed_time / 60 >= rideFilters.duration)) &&
                    (!rideFilters.mph || (activity.average_speed * 2.23694 >= rideFilters.mph)) &&
                    (!rideFilters.miles || (activity.distance / 1609.34 >= rideFilters.miles))
                ) : true;
    
                const isSwimFilterPassed = activity.type.toLowerCase() === 'swim' ? (
                    (!swimFilters.duration || (activity.elapsed_time / 60 >= swimFilters.duration)) &&
                    (!swimFilters.mph || (activity.average_speed * 2.23694 >= swimFilters.mph)) &&
                    (!swimFilters.miles || (activity.distance / 1609.34 >= swimFilters.miles))
                ) : true;
    
                return isTypeSelected && isRunFilterPassed && isRideFilterPassed && isSwimFilterPassed;
            });
    
            setFilteredActivities(filtered);
        };
    
        applyFilters();
    }, [allActivities, selectedTypes, runFilters, rideFilters, swimFilters]); // Apply filters only when the filters change
    
    // Decode polylines for filtered activities
    useEffect(() => {
        const polylines = filteredActivities.map((activity) => {
            const encodedPolyline = activity.summary_polyline;
            return encodedPolyline
                ? polyline.decode(encodedPolyline).map(([lat, lng]) => new LatLng(lat, lng))
                : [];
        });
    
        setActivityPolylines(polylines);
    }, [filteredActivities]);
    

    // Handler for marker drag end event
    const handleDragEnd = (event: any) => {
        const newLatLng = event.target.getLatLng();
        setMarkerPosition(newLatLng); // Update state with new position
    };


    return (
        <div style={{ display: 'flex', flexDirection: 'row', height: '100vh', width: '100vw', overflow: 'hidden' }}>
        <div style={{ width: '20%', padding: '10px', boxSizing: 'border-box', overflowY: 'auto' }}>
          <Filter
            selectedTypes={selectedTypes}
            onFilterChange={setSelectedTypes}
            onRunFilterChange={setRunFilters}
            onRideFilterChange={setRideFilters}
            onSwimFilterChange={setSwimFilters}
          />
        </div>
        <div style={{ flex: 1, overflow: 'hidden' }}>
          <MapContainer
            center={markerPosition}
            zoom={zoom}
            scrollWheelZoom={true}
            style={{ height: '80%', width: '60%' }}
          >
            {/* Dark-themed map tiles */}
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            />
            
            <Marker position={markerPosition} draggable={true} eventHandlers={{ dragend: handleDragEnd }}>
              <Popup>{`Coordinates: ${markerPosition.lat}, ${markerPosition.lng}`}</Popup>
            </Marker>
      
            {/* Render a polyline for each activity */}
            {activityPolylines.map((polylineCoords, index) => (
              <Polyline key={index} positions={polylineCoords} color="#EA580C" weight={4} opacity={0.7} />
            ))}
          </MapContainer>
        </div>
      </div>
      
    );
};


export default Map;
