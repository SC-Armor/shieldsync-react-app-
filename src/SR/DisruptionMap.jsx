import React, { useState, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import customPin from "../assets/pin-icon.svg";
import pulseGlow from "../assets/orange-pulse-glow.svg";

const DisruptionMap = () => {
  const center = [38.2527, -85.7585];
  const [zoomLevel, setZoomLevel] = useState(6);
  const mapRef = useRef();

  const DynamicEvents = () => {
    useMapEvents({
      zoomend: () => {
        const zoom = mapRef.current.getZoom();
        setZoomLevel(zoom);
      }
    });
    return null;
  };

  const customIcon = (zoom) =>
    L.icon({
      iconUrl: customPin,
      iconSize: zoom >= 8 ? [28, 42] : zoom >= 6 ? [34, 51] : [42, 60],
      iconAnchor: [21, 60],
      popupAnchor: [0, -60]
    });

  const textSize = zoomLevel >= 8 ? "text-lg" : zoomLevel >= 6 ? "text-md" : "text-sm";

  const handlePinClick = () => {
    mapRef.current.setView(center, 8, { animate: true });
  };

  return (
    <div className="relative w-full h-[560px] rounded-xl overflow-hidden bg-gradient-to-br from-[#1a1d26] to-[#10131c] shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_4px_15px_rgba(0,0,0,0.3)]">
      <MapContainer
        center={center}
        zoom={6}
        zoomControl={false}
        attributionControl={false}
        style={{ height: "100%", width: "100%" }}
        whenCreated={(map) => (mapRef.current = map)}
      >
        <DynamicEvents />

        {/* Blue-Slate Map Theme */}
        <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_matter/{z}/{x}/{y}{r}.png" />

        {/* Glowing Pulse */}
        <Marker
          position={center}
          icon={L.divIcon({
            className: "",
            html: `<img src="${pulseGlow}" style="width:200px;height:200px;" />`,
            iconSize: [200, 200],
            iconAnchor: [100, 100]
          })}
        />

        {/* Custom Pin */}
        <Marker
          position={center}
          icon={customIcon(zoomLevel)}
          eventHandlers={{ click: handlePinClick }}
        />
      </MapContainer>

      {/* Forecast Text - Locked, Resized, Above Pin */}
      <div
        className={`absolute top-[25%] left-[50%] transform -translate-x-1/2 text-white font-bold tracking-wide z-[400] pointer-events-none ${textSize}`}
      >
        Blizzard Forecast – 3 Days
      </div>
    </div>
  );
};

export default DisruptionMap;
