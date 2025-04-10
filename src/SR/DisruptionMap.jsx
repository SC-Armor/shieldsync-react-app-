
import React from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default function DisruptionMap() {
  const center = [38.2527, -85.7585];

  const customPin = L.divIcon({
    html: "📍",
    className: "text-2xl",
    iconSize: [24, 24],
    iconAnchor: [12, 24],
  });

  return (
    <div className="bg-[#1c1f2a] p-6 rounded-xl shadow relative overflow-hidden">
      <div className="relative h-[300px] w-full rounded overflow-hidden">
        {/* Pulse Glow Overlay */}
        <div className="absolute top-1/2 left-1/2 w-[240px] h-[240px] bg-[#ff5c00] opacity-30 rounded-full blur-[90px] transform -translate-x-1/2 -translate-y-1/2 animate-ping z-10 pointer-events-none"></div>

        {/* Blizzard Forecast Label */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-20 pointer-events-none">
          <h2 className="text-white font-bold text-xl leading-tight">Blizzard<br />Forecast</h2>
          <p className="text-white text-sm mt-1">3 DAYS</p>
        </div>

        <MapContainer
          center={center}
          zoom={6.2}
          style={{ height: "100%", width: "100%" }}
          zoomControl={false}
          attributionControl={false}
        >
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          />
          <Marker position={center} icon={customPin}>
            <Popup>
              <div className="text-sm font-semibold text-black">UPS Worldport</div>
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
}
