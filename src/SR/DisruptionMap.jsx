
import React from "react";
import { MapContainer, TileLayer, Circle, Popup, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function DisruptionMap() {
  const center = [38.2527, -85.7585]; // Louisville, KY

  return (
    <div className="bg-[#1c1f2a] p-6 rounded-xl shadow relative overflow-hidden">
      <div className="h-[300px] w-full rounded overflow-hidden relative z-0">
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
          {/* Animated Pulse Glow */}
          <Circle
            center={center}
            radius={140000}
            pathOptions={{
              fillColor: "#ff4500",
              fillOpacity: 0.2,
              stroke: false,
              className: "animate-ping blur-2xl"
            }}
          />
          {/* Static inner glow */}
          <Circle
            center={center}
            radius={60000}
            pathOptions={{
              fillColor: "#ff4500",
              fillOpacity: 0.25,
              stroke: false,
              className: "blur-xl"
            }}
          />
          {/* Marker pin */}
          <Marker position={center}>
            <Popup>
              <div className="text-sm font-semibold text-black">UPS Worldport</div>
            </Popup>
          </Marker>
        </MapContainer>

        {/* Blizzard Forecast Text Overlay */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-10">
          <h2 className="text-white font-bold text-lg leading-tight">Blizzard<br />Forecast</h2>
          <p className="text-white text-sm mt-1">3 DAYS</p>
        </div>
      </div>
    </div>
  );
}
