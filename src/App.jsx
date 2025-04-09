import React, { useState } from "react";
import { MapContainer, TileLayer, Circle, Popup, Marker, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function App() {
  const [responseInitiated, setResponseInitiated] = useState(false);

  const disruptionData = {
    center: [38.2527, -85.7585], // Louisville, KY coordinates
    company: "UPS Worldport",
    severity: 4,
    pnsEstimate: 0.85,
    impactHours: 36,
    lossEstimate: "$12M"
  };

  const rerouteInfo = {
    action: "Divert shipments via Kansas City distribution corridor",
    timeSaved: "< 6 hours",
    cost: "$170K"
  };

  const needleRotation = 135 + 270 * disruptionData.pnsEstimate; // angle for gauge needle

  return (
    <div className="min-h-screen bg-[#0b0f1a] text-white p-6 font-sans">
      {/* Header */}
      <div className="text-left mb-6">
        <h1 className="text-3xl font-bold text-white">
          AMERICAN SHIELD COMMAND
        </h1>
        <p className="text-gray-400 text-sm">
          National Infrastructure Risk Defense Dashboard
        </p>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Left Panel */}
        <div className="col-span-2 space-y-6">
          <div className="bg-[#1c1f2a] p-6 rounded-xl shadow relative">
            <h2 className="text-red-400 text-xl font-semibold mb-2">Blizzard Forecast</h2>
            <div className="h-[300px] rounded overflow-hidden relative">
              <MapContainer center={disruptionData.center} zoom={6.5} style={{ height: "100%", width: "100%" }}>
                <TileLayer
                  url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                  attribution="&copy; OpenStreetMap contributors"
                />
                <Circle center={disruptionData.center} radius={140000} pathOptions={{ fillColor: "#ff4500", fillOpacity: 0.5, color: "#ff4500" }}>
                  <Popup>{disruptionData.company} – Blizzard Forecast: 3 Days</Popup>
                </Circle>
                <Marker position={disruptionData.center}>
                  <Tooltip direction="top" offset={[0, -20]} opacity={1} permanent>
                    {disruptionData.company}
                  </Tooltip>
                </Marker>
              </MapContainer>
            </div>
            <p className="absolute bottom-4 left-6 text-white text-lg">Blizzard Forecast – 3 DAYS</p>
          </div>

          <div className="flex gap-6">
            <div className="bg-[#121826] p-6 rounded-xl w-1/2">
              <h3 className="text-sm text-gray-400 font-semibold mb-2">SHIELD RESPONSE SUGGESTED</h3>
              <p className="text-white text-lg leading-tight mb-3">{rerouteInfo.action}</p>
              <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white font-bold text-sm">
                INITIATE RESPONSE
              </button>
            </div>

            <div className="bg-[#121826] p-6 rounded-xl w-1/2">
              <h3 className="text-sm text-gray-400 font-semibold mb-2">SIMULATED IMPACT</h3>
              <p className="text-white text-sm mb-1">Without Action: {disruptionData.impactHours}-hour regional shortage</p>
              <p className="text-white text-sm mb-1">Financial Cost: Est. {disruptionData.lossEstimate} in spoiled inventory</p>
              <p className="text-white text-sm">PNSE: {Math.round(disruptionData.pnsEstimate * 100)}%</p>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="space-y-6">
          <div className="bg-[#121826] p-6 rounded-xl">
            <h2 className="text-sm font-semibold mb-4">DISRUPTION PULSE</h2>
            <div className="relative w-full h-40 flex justify-center items-end">
              <div className="relative w-[200px] h-[100px]">
                <svg viewBox="0 0 200 100" className="w-full h-full">
                  <path d="M10,90 A90,90 0 0,1 190,90" fill="none" stroke="#2c2f3a" strokeWidth="12" />
                  <path d="M10,90 A90,90 0 0,1 190,90" fill="none" stroke="url(#gaugeGradient)" strokeWidth="10" />
                  <defs>
                    <linearGradient id="gaugeGradient">
                      <stop offset="0%" stopColor="#00ff00" />
                      <stop offset="50%" stopColor="#ffff00" />
                      <stop offset="100%" stopColor="#ff0000" />
                    </linearGradient>
                  </defs>
                </svg>
                <div
                  className="absolute w-1 h-[90px] bg-white left-[99px] origin-bottom"
                  style={{ transform: `rotate(${needleRotation}deg)` }}
                />
              </div>
              <div className="absolute text-white font-bold text-sm bottom-1 left-1">LOW</div>
              <div className="absolute text-white font-bold text-sm bottom-1 right-1">HIGH</div>
            </div>
          </div>

          <div className="bg-[#121826] p-6 rounded-xl">
            <h2 className="text-sm font-semibold mb-2">INCOMING DISRUPTIONS</h2>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-400 font-bold mb-1">Without Action</p>
                <p>Divert shipments via Kansas City</p>
                <p>Financial Cost: Est. {disruptionData.lossEstimate}</p>
                <p className="text-red-500">Public Risk Level: RED</p>
              </div>
              <div>
                <p className="text-gray-400 font-bold mb-1">With Shield Response</p>
                <p>Rerouted in {rerouteInfo.timeSaved}</p>
                <p>{rerouteInfo.cost} reroute cost</p>
                <p className="text-green-500">Public Risk Level: CONTAINED</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 text-xs text-center text-gray-500">
        © 2025 AMERICAN SHIELD COMMAND. ShieldSync™ and American Shield™ are proprietary technologies. Protected under U.S. copyright law.
      </div>
    </div>
  );
}
