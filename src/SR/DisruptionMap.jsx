import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Correct paths for Vercel build
import pinIcon from "../assets/pin-icon.svg";
import pulseGlow from "../assets/orange-pulse-glow.svg";

const mapCenter = [37.7749, -122.4194]; // San Francisco placeholder
const zoomLevel = 10;

const CustomMarker = () => {
  return (
    <div className="relative w-full h-full">
      <img
        src={pulseGlow}
        alt="Pulse Glow"
        className="absolute w-[64px] h-[64px] animate-ping opacity-70"
        style={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 10,
        }}
      />
      <img
        src={pinIcon}
        alt="Disruption Pin"
        className="absolute w-[32px] h-[32px]"
        style={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 20,
        }}
      />
      <div
        className="absolute text-white font-bold text-sm"
        style={{
          top: "calc(50% - 48px)",
          left: "50%",
          transform: "translateX(-50%) scale(1.2)",
          zIndex: 30,
        }}
      >
        Blizzard Warning
      </div>
    </div>
  );
};

export default function DisruptionMap() {
  const customIcon = new L.Icon({ iconUrl: pinIcon, iconSize: [0, 0] });

  return (
    <div className="rounded-xl overflow-hidden">
      <MapContainer
        center={mapCenter}
        zoom={zoomLevel}
        style={{ height: "500px", width: "100%" }}
        zoomControl={false}
      >
        <TileLayer
          url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
          attribution=""
        />
        <Marker position={mapCenter} icon={customIcon}>
          <Popup>Disruption Event</Popup>
        </Marker>
        <CustomMarker />
      </MapContainer>
    </div>
  );
}
