import React, { useState, useRef } from "react";
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

  return (
    <div className="relative w-full h-[560px] rounded-xl overflow-hidden bg-black">
      <MapContainer
        center={center}
        zoom={zoomLevel}
        zoomControl={false}
        attributionControl={false}
        style={{ height: "100%", width: "100%" }}
        whenCreated={(map) => (mapRef.current = map)}
      >
        <DynamicEvents />

        {/* BLACK MAP TILE (baseline) */}
        <TileLayer
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution=""
        />

        {/* Pulse Glow (untouched) */}
        <Marker
          position={center}
          icon={L.divIcon({
            className: "",
            html: `<img src="${pulseGlow}" style="width:200px;height:200px;" />`,
            iconSize: [200, 200],
            iconAnchor: [100, 100],
          })}
        />

        {/* Forecast Label (visually placed like the photo) */}
        <Marker
          position={center}
          icon={L.divIcon({
            className: "",
            html: `
              <div 
                style="
                  transform: translate(-50%, -125px) scale(${zoomLevel / 10});
                  position: absolute;
                  left: 50%;
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

        {/* Pin (untouched) */}
        <Marker
          position={center}
          icon={customIcon(zoomLevel)}
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
