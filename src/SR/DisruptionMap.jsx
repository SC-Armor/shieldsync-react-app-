import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import customPin from "../assets/pin-icon.svg";
import pulseGlow from "../assets/orange-pulse-glow.svg";

export default function DisruptionMap() {
  const center = [38.2527, -85.7585]; // UPS Worldport, Louisville KY

  const customIcon = L.icon({
    iconUrl: customPin,
    iconSize: [32, 48],
    iconAnchor: [16, 48],
    popupAnchor: [0, -48]
  });

  return (
    <div className="bg-[#1c1f2a] p-6 rounded-xl shadow-lg relative overflow-hidden">
      <div className="relative h-[300px] w-full rounded overflow-hidden">

        {/* Fixed Overlay Layer - z-30 */}
        <div className="absolute top-0 left-0 w-full h-full z-30 pointer-events-none">
          {/* Pulse Glow - z-10 */}
          <img
            src={pulseGlow}
            alt="pulse-glow"
            className="absolute top-1/2 left-1/2 w-[240px] h-[240px] transform -translate-x-1/2 -translate-y-1/2 z-10"
          />

          {/* Blizzard Forecast Text - z-30 */}
          <div className="absolute top-1/2 left-1/2 z-30 transform -translate-x-1/2 -translate-y-1/2 text-center">
            <h2 className="text-white font-bold text-xl leading-tight">Blizzard<br />Forecast</h2>
            <p className="text-white text-sm mt-1">3 DAYS</p>
          </div>
        </div>

        {/* Map and Pin - z-0 */}
        <MapContainer
          center={center}
          zoom={6.2}
          style={{ height: "100%", width: "100%", zIndex: 0 }}
          zoomControl={false}
          attributionControl={false}
        >
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          />
          <Marker
            position={center}
            icon={customIcon}
            eventHandlers={{
              mouseover: (e) => e.target.openPopup(),
              mouseout: (e) => e.target.closePopup()
            }}
          >
            <Popup closeButton={false} autoPan={false}>
              <div className="text-sm font-semibold text-black leading-snug">
                UPS Worldport<br />
                911 Grade Lane<br />
                Louisville, KY 40213
              </div>
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
}
