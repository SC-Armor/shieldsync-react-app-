```jsx
import React, { useRef, useState } from "react";
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

const disruptions = [
  {
    id: 1,
    risk: "High",
    color: "#ff5722",
    location: [38.2527, -85.7585],
    label: "UPS Worldport",
    address: "911 Grade Ln, Louisville, KY",
    zoomTo: 7
  },
  {
    id: 2,
    risk: "Medium",
    color: "#ffeb3b",
    location: [40.4406, -79.9959],
    label: "Pittsburgh Rail Hub",
    address: "Station Square, Pittsburgh, PA",
    zoomTo: 7
  },
  {
    id: 3,
    risk: "Low",
    color: "#4caf50",
    location: [42.3314, -83.0458],
    label: "Detroit Receiving Dock",
    address: "1301 W Lafayette Blvd, Detroit, MI",
    zoomTo: 7
  }
];

export default function DisruptionMap() {
  const [zoomLevel, setZoomLevel] = useState(6);
  const mapRef = useRef();

  const DynamicZoomListener = () => {
    useMapEvents({
      zoomend: () => {
        const zoom = mapRef.current.getZoom();
        setZoomLevel(zoom);
      }
    });
    return null;
  };

  const getPulseSize = (zoom) =>
    zoom >= 8 ? 120 : zoom >= 7 ? 160 : 200;

  const getMarkerSize = (zoom) =>
    zoom >= 8 ? [30, 42] : zoom >= 6 ? [38, 54] : [46, 66];

  return (
    <div className="relative w-full h-[400px] rounded-xl overflow-hidden bg-gradient-to-br from-[#1a1d26] to-[#10131c] shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_4px_15px_rgba(0,0,0,0.3)]">
      <MapContainer
        center={[39.5, -84.5]}
        zoom={6}
        style={{ height: "100%", width: "100%", zIndex: 0 }}
        whenCreated={(mapInstance) => (mapRef.current = mapInstance)}
        zoomControl={false}
        attributionControl={false}
      >
        <DynamicZoomListener />
        <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />

        {disruptions.map((d) => {
          const icon = L.icon({
            iconUrl: customPin,
            iconSize: getMarkerSize(zoomLevel),
            iconAnchor: [23, 66],
            popupAnchor: [0, -70]
          });

          return (
            <React.Fragment key={d.id}>
              {/* Pulse */}
              <Pane name={`pulse-${d.id}`} style={{ zIndex: 300 }}>
                <Marker
                  position={d.location}
                  icon={L.divIcon({
                    className: "",
                    html: `<div class="pulse-glow" style="background: radial-gradient(circle, ${d.color}e6 0%, ${d.color}88 40%, ${d.color}00 70%); width:${getPulseSize(zoomLevel)}px;height:${getPulseSize(zoomLevel)}px;"></div>`,
                    iconSize: [getPulseSize(zoomLevel), getPulseSize(zoomLevel)],
                    iconAnchor: [
                      getPulseSize(zoomLevel) / 2,
                      getPulseSize(zoomLevel) / 2
                    ]
                  })}
                />
              </Pane>

              {/* Marker */}
              <Marker
                position={d.location}
                icon={icon}
                eventHandlers={{
                  click: () => {
                    mapRef.current.flyTo(d.location, d.zoomTo, {
                      animate: true
                    });
                  }
                }}
              >
                <Popup closeButton={false}>
                  <div className="text-white font-medium">
                    <div className="text-lg font-bold">{d.label}</div>
                    <div>{d.address}</div>
                  </div>
                </Popup>
              </Marker>
            </React.Fragment>
          );
        })}
      </MapContainer>
    </div>
  );
}
