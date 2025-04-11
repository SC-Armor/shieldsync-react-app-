```jsx
import React, { useEffect, useRef, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  Pane
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import customPin from "../assets/pin-icon.svg";

const center = [38.2527, -85.7585]; // Louisville, KY

export default function DisruptionMap() {
  const [zoomLevel, setZoomLevel] = useState(6);
  const mapRef = useRef();
  const markerRef = useRef();

  const pulseSize = zoomLevel >= 8 ? 120 : zoomLevel >= 7 ? 160 : 200;

  const customIcon = L.icon({
    iconUrl: customPin,
    iconSize: zoomLevel >= 8 ? [30, 42] : zoomLevel >= 6 ? [38, 54] : [46, 66],
    iconAnchor: [23, 66],
    popupAnchor: [0, -70]
  });

  const handleClick = () => {
    const map = mapRef.current;
    if (map) {
      map.flyTo(center, 7, { animate: true });
    }
  };

  const DynamicEvents = () => {
    useMapEvents({
      zoomend: () => {
        const zoom = mapRef.current.getZoom();
        setZoomLevel(zoom);
      }
    });
    return null;
  };

  return (
    <div className="relative w-full h-[400px] rounded-xl overflow-hidden bg-gradient-to-br from-[#1a1d26] to-[#10131c] shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_4px_15px_rgba(0,0,0,0.3)]">
      <MapContainer
        center={center}
        zoom={6}
        whenCreated={(mapInstance) => (mapRef.current = mapInstance)}
        style={{ height: "100%", width: "100%", zIndex: 0 }}
        zoomControl={false}
        attributionControl={false}
      >
        <DynamicEvents />
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />

        {/* PULSE - Locked to center */}
        <Pane name="pulse-pane" style={{ zIndex: 300 }}>
          <Marker
            position={center}
            icon={L.divIcon({
              className: "",
              html: `<div class="pulse-glow" style="width:${pulseSize}px;height:${pulseSize}px"></div>`,
              iconSize: [pulseSize, pulseSize],
              iconAnchor: [pulseSize / 2, pulseSize / 2]
            })}
          />
        </Pane>

        {/* MARKER */}
        <Marker
          ref={markerRef}
          position={center}
          icon={customIcon}
          eventHandlers={{ click: handleClick }}
        >
          <Popup closeButton={false}>
            <div className="text-white font-medium">
              <div className="text-lg font-bold">UPS Worldport</div>
              <div>911 Grade Lane, Louisville, KY</div>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
