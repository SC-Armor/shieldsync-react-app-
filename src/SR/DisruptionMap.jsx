import React, { useState, useRef, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  Popup,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import customPin from "../assets/pin-icon.svg";
import pulseGlow from "../assets/orange-pulse-glow.svg";

const DisruptionMap = () => {
  const center = [38.2527, -85.7585];
  const [zoomLevel, setZoomLevel] = useState(6);
  const markerRef = useRef();
  const mapRef = useRef();

  const DynamicEvents = () => {
    useMapEvents({
      zoomend: () => {
        const zoom = mapRef.current.getZoom();
        setZoomLevel(zoom);
        if (markerRef.current) {
          markerRef.current.setIcon(customIcon(zoom));
        }
      },
    });
    return null;
  };

  const customIcon = (zoom) =>
    L.icon({
      iconUrl: customPin,
      iconSize: zoom >= 8 ? [28, 42] : zoom >= 6 ? [34, 51] : [42, 60],
      iconAnchor: [21, 60],
      popupAnchor: [0, -60],
    });

  // 🔒 EXACT copy from your original code
  const handlePinClick = () => {
    if (mapRef.current) {
      mapRef.current.setView(center, 8, { animate: true });
    }
  };

  return (
    <div className="relative w-full h-[560px] rounded-xl overflow-hidden bg-gradient-to-br from-[#1a1d26] to-[#10131c] shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_4px_15px_rgba(0,0,0,0.3)]">
      <MapContainer
        center={center}
        zoom={zoomLevel}
        zoomControl={false}
        attributionControl={false}
        style={{ height: "100%", width: "100%" }}
        whenCreated={(map) => (mapRef.current = map)}
      >
        <DynamicEvents />

        {/* 🔒 Tile layer: your original black slate */}
        <TileLayer
          url="https://{s}.tile.jawg.io/jawg-dark/{z}/{x}/{y}.png?access-token=YOUR_ACCESS_TOKEN"
          attribution="&copy; <a href='https://www.jawg.io' target='_blank'>Jawg Maps</a>"
        />

        {/* 🔒 Pulse Glow: untouched */}
        <Marker
          position={center}
          icon={L.divIcon({
            className: "",
            html: `<img src="${pulseGlow}" style="width:200px;height:200px;" />`,
            iconSize: [200, 200],
            iconAnchor: [100, 100],
          })}
        />

        {/* ✅ Forecast Label: photo-matched placement */}
        <Marker
          position={center}
          icon={L.divIcon({
            className: "",
            html: `
              <div 
                style="
                  position: absolute;
                  left: 50%;
                  transform: translate(-50%, -130px) scale(${zoomLevel / 10});
                  max-width: 180px;
                  word-break: break-word;
                  white-space: normal;
                  text-align: center;
                  z-index: 1000;
                "
                class="text-white font-bold leading-tight tracking-wide text-[15px] md:text-[17px] lg:text-[19px]"
              >
                Blizzard Forecast – 3 Days
              </div>`,
            iconSize: [0, 0],
            iconAnchor: [0, 0],
          })}
        />

        {/* 🔒 Pin with dynamic scaling and click handler */}
        <Marker
          position={center}
          icon={customIcon(zoomLevel)}
          eventHandlers={{ click: handlePinClick }}
          ref={markerRef}
        >
          <Popup>
            <div className="text-sm text-white">
              <strong>AI Forecast Analysis</strong>
              <p>• $12M spoilage risk identified</p>
              <p>• Patterns match 2021 cold snap</p>
              <p>• Response action needed in &lt; 6h</p>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default DisruptionMap;
