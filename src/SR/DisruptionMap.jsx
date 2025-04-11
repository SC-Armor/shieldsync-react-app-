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

  const labelIcon = (zoom) =>
    L.divIcon({
      className: "forecast-label",
      html: `<div style="color: white; font-weight: bold; font-size: ${
        zoom >= 8 ? "18px" : zoom >= 6 ? "16px" : "14px"
      }; background: transparent;">Blizzard Forecast – 3 Days</div>`,
      iconAnchor: [0, 85] // Offset label 10-15px above pin
    });

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

        {/* ✅ Final Blue-Slate Map Theme */}
        <TileLayer
          url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>'
        />

        {/* ✅ Glowing Pulse Locked */}
        <Marker
          position={center}
          icon={L.divIcon({
            className: "",
            html: `<img src="${pulseGlow}" style="width:200px;height:200px;" />`,
            iconSize: [200, 200],
            iconAnchor: [100, 100]
          })}
        />

        {/* ✅ Forecast Label Above Pin */}
        <Marker position={center} icon={labelIcon(zoomLevel)} />

        {/* ✅ Pin Marker Only */}
        <Marker
          position={center}
          icon={customIcon(zoomLevel)}
          eventHandlers={{ click: handlePinClick }}
        />
      </MapContainer>
    </div>
  );
};

export default DisruptionMap;
