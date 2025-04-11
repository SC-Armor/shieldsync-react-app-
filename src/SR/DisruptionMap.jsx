import React, { useState, useRef, useEffect } from "react";
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
  const center = [38.2527, -85.7585]; // Louisville
  const [zoomLevel, setZoomLevel] = useState(6);
  const [showForecast, setShowForecast] = useState(true);
  const markerRef = useRef();
  const mapRef = useRef();

  const customIcon = (zoom) =>
    L.icon({
      iconUrl: customPin,
      iconSize: zoom >= 8 ? [28, 42] : zoom >= 6 ? [34, 51] : [42, 60],
      iconAnchor: [21, 60],
      popupAnchor: [0, -60]
    });

  const DynamicEvents = () => {
    useMapEvents({
      zoomend: () => {
        const zoom = mapRef.current.getZoom();
        setZoomLevel(zoom);
        if (markerRef.current) {
          markerRef.current.setIcon(customIcon(zoom));
        }
      }
    });
    return null;
  };

  const handlePinClick = () => {
    setShowForecast(false);
    // We'll trigger disruption logic and zoom later
  };

  return (
    <MapContainer
      center={center}
      zoom={zoomLevel}
      minZoom={5}
      style={{ height: "500px", width: "100%" }}
      whenCreated={(mapInstance) => (mapRef.current = mapInstance)}
      zoomControl={false}
    >
      <TileLayer
        url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>'
      />

      <DynamicEvents />

      {/* PULSE SVG FIXED TO LOCATION */}
      <div
        className="leaflet-marker-pane"
        style={{
          position: "absolute",
          transform: `translate(-50%, -50%)`
        }}
      >
        <img
          src={pulseGlow}
          alt="pulse"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: zoomLevel >= 8 ? 80 : zoomLevel >= 6 ? 100 : 120,
            transform: "translate(-50%, -50%)",
            pointerEvents: "none",
            zIndex: 200
          }}
        />
      </div>

      {/* MARKER PIN */}
      <Marker
        position={center}
        icon={customIcon(zoomLevel)}
        eventHandlers={{ click: handlePinClick }}
        ref={markerRef}
      />
    </MapContainer>
  );
};

export default DisruptionMap;
