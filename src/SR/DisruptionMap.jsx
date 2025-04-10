import React from "react";
import { MapContainer, TileLayer, Circle, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function DisruptionMap() {
  const center = [38.2527, -85.7585]; // Louisville, KY

  return (
    <div className="bg-[#1c1f2a] p-6 rounded-xl shadow relative">
      <h2 className="text-red-400 text-xl font-semibold mb-2">Blizzard Forecast</h2>
      <div className="h-[300px] rounded overflow-hidden relative z-0">
        <MapContainer center={center} zoom={6.5} style={{ height: "100%", width: "100%" }}>
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            attribution="&copy; OpenStreetMap contributors"
          />
          <Circle
            center={center}
            radius={140000}
            pathOptions={{
              fillColor: "#ff4500",
              fillOpacity: 0.15,
              stroke: true,
              color: "#ff4500",
              opacity: 0.6,
              weight: 1,
              className: "blur-md"
            }}
          >
            <Popup>
              <div className="text-white text-sm">
                <strong>UPS Worldport</strong><br />
                Blizzard Warning: 3 Days
              </div>
            </Popup>
          </Circle>
        </MapContainer>
      </div>
      <div className="absolute bottom-4 left-6 text-white text-lg z-10">
        ❄ Blizzard Warning – 3 DAYS
      </div>
      <div className="absolute top-4 left-[42%] text-center transform -translate-x-1/2 bg-black/60 px-3 py-1 rounded text-white text-xs z-10">
        UPS Worldport
      </div>
    </div>
  );
}
