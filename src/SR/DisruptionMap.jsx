import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import customPin from "../assets/pin-icon.svg";

export default function DisruptionMap() {
  const center = [38.2527, -85.7585]; // Louisville, KY

  const customIcon = L.icon({
    iconUrl: customPin,
    iconSize: [32, 48],
    iconAnchor: [16, 48],
    popupAnchor: [0, -48],
  });

  return (
    <div className="bg-[#1c1f2a] p-6 rounded-xl shadow-lg relative overflow-hidden">
      <div className="relative h-[300px] w-full rounded overflow-hidden">
        {/* Animated Pulse Glow */}
        <div className="absolute top-1/2 left-1/2 w-[240px] h-[240px] bg-[#ff5c00] opacity-30 rounded-full blur-[90px] transform -translate-x-1/2 -translate-y-1/2 animate-ping z-10"></div>

        {/* Blizzard Forecast Label */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-20">
          <h2 className="text-white font-bold text-xl leading-tight">
            Blizzard<br />Forecast
          </h2>
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
          <Marker
            position={center}
            icon={customIcon}
            eventHandlers={{
              mouseover: (e) => {
                e.target.openPopup();
              },
              mouseout: (e) => {
                e.target.closePopup();
              },
            }}
          >
            <Popup>
              <div className="text-sm font-semibold text-black">
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
