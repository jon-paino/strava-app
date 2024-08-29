'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
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
    posix: [34.07238006591797, -118.45283509232104] as LatLngExpression,
    zoom: 19 as number,
}

const Map = (Map: MapProps) => {
    const { zoom = defaults.zoom, latlong = defaults.posix } = Map

    return (
        <MapContainer
            center={latlong}
            zoom={zoom}
            scrollWheelZoom={true}
            style={{ height: "100%", width: "100%" }}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={latlong} draggable={true}>
                <Popup>Hey ! I study here</Popup>
            </Marker>
        </MapContainer>
    )
}

export default Map;
