import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const Mapintergration = () => {

    const position = [40.7128, -74.0060];
  return (
    <div className="w-full h-[500px]">
      <MapContainer center={position} zoom={13} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
        {/* Tile Layer for the map (you can use different providers like OpenStreetMap, Google Maps, etc.) */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        {/* Marker at the specified position */}
        <Marker position={position}>
          <Popup>
            A marker at New York City!
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  )
}

export default Mapintergration