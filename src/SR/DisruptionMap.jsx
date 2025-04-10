import React, { useState, useRef, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Tooltip,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import customPin from "../assets/pin-icon.svg";
import pulseGlow from "../assets/orange-pulse-glow.svg";

const DisruptionMap = () => {
  const center = [38.2527, -85.7585];
  const [showForecast, setShowForecast] = useState(true);
  const [disruption, setDisruption] = useState(null);
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

  const handlePinClick = () => {
    setShowForecast(false);
    setDisruption({
      title: "Blizzard Warning",
      impact: "Est. $12M spoiled inventory",
      riskLevel: "HIGH",
      probability: "85%",
    });
    const map = mapRef.current;
    if (map) {
      map.setView(center, 7, { animate: true });
    }
  };

  return (
    <div className="relative w-full h-[400px] rounded-xl overflow-hidden bg-gradient-to-br from-[#1a1d26] to-[#10131c] shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_4px_15px_rgba(0,0,0,0.3)]">
      <img
        src={pulseGlow}
        alt="pulse-glow"
        className="absolute top-1/2 left-1/2 w-[240px] h-[240px] transform -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none"
      />
      {showForecast && (
        <div className="absolute top-[40%] left-1/2 z-30 transform -translate-x-1/2 text-center text-white font-bold text-xl leading-tight">
          Blizzard Forecast
          <div className="text-sm font-semibold">3 DAYS</div>
        </div>
      )}
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
        <Marker
          ref={markerRef}
          position={center}
          icon={customIcon(zoomLevel)}
          eventHandlers={{
            click: handlePinClick,
            mouseover: (e) => e.target.openTooltip(),
            mouseout: (e) => e.target.closeTooltip(),
          }}
        >
          <Tooltip direction="top" offset={[0, -40]} opacity={1} permanent={false}>
            UPS Worldport
          </Tooltip>
          <Popup closeButton={false} autoPan={false}>
            911 Grade Lane<br />
            Louisville, KY 40213
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default DisruptionMap;
