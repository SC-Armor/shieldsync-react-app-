import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import pinIcon from "../assets/pin-icon.svg";
import pulseGlow from "../assets/orange-pulse-glow.svg";

const mapCenter = [37.7749, -122.4194];
const zoomLevel = 7;

const CustomOverlay = ({ position }) => {
  const map = useMap();

  useEffect(() => {
    map.flyTo(position, 9, { duration: 1.5 });
  }, [position, map]);

  return (
    <div className="leaflet-top leaflet-left pointer-events-none">
      <div
        className="relative"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <img
          src={pulseGlow}
          alt="Pulse Glow"
          className="absolute w-[64px] h-[64px] animate-ping opacity-70"
          style={{ zIndex: 10 }}
        />
        <img
          src={pinIcon}
          alt="Disruption Pin"
          className="absolute w-[32px] h-[32px]"
          style={{ zIndex: 20 }}
        />
        <div
          className="absolute text-white font-bold text-sm"
          style={{
            top: "-2rem",
            left: "50%",
            transform: "translateX(-50%) scale(1.2)",
            zIndex: 30,
            whiteSpace: "nowrap",
          }}
        >
          Blizzard Warning
        </div>
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
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          attribution=""
        />
        <Marker
          position={mapCenter}
          icon={customIcon}
          eventHandlers={{
            click: (e) => e.target._map.flyTo(e.latlng, 9, { duration: 1.2 }),
          }}
        />
        <CustomOverlay position={mapCenter} />
      </MapContainer>
    </div>
  );
}
