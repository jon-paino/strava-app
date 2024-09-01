'use client';

import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { LatLngExpression, LatLng } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

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
    // Initialize state with the default position
    const [markerPosition, setMarkerPosition] = useState(latLngObject);

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
            style={{ height: "150%", width: "100%" }}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={markerPosition} draggable={true} eventHandlers={{ dragend: handleDragEnd }}>
                {/* Display lat and lng from the updated position */}
                <Popup>{`Coordinates: ${markerPosition.lat}, ${markerPosition.lng}`}</Popup>
            </Marker>
        </MapContainer>
    );
}

export default Map;
