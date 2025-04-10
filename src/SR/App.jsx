import React, { useState } from "react";
import { MapContainer, TileLayer, Circle, Popup, Marker, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function App() {
  const [responseInitiated, setResponseInitiated] = useState(false);

  const disruptionData = {
    center: [38.2527, -85.7585],
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

  const needleRotation = 135 + 270 * disruptionData.pnsEstimate;

  return (
    <div className="min-h-screen bg-[#0b0f1a] text-white p-6 font-sans">
      <div className="text-left mb-6">
        <h1 className="text-3xl font-bold text-white">AMERICAN SHIELD COMMAND</h1>
        <p className="text-gray-400 text-sm">National Infrastructure Risk Defense Dashboard</p>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 space-y-6">
          <div className="bg-[#1c1f2a] p-6 rounded-xl shadow relative">
            <h2 className="text-red-400 text-xl font-semibold mb-2">Blizzard Forecast</h2>
            <div className="h-[300px] rounded overflow-hidden relative">
              <MapContainer center={disruptionData.center} zoom={6.5} style={{ height: "100%", width: "100%" }}>
                <TileLayer
                  url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                  attribution="&copy; OpenStreetMap contributors"
                />
                <Circle center={disruptionData.center} radius={140000} pathOptions={{
                  fillColor: "#ff4500",
                  fillOpacity: 0.25,
                  color: "#ff4500",
                  opacity: 0.8,
                  weight: 1,
                  className: "disruption-pulse"
                }}>
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

        <div className="space-y-6">
          <div className="bg-[#121826] p-6 rounded-xl">
            <h2 className="text-sm font-semibold mb-4">DISRUPTION PULSE</h2>
            <div className="relative w-full h-40 flex justify-center items-center">
              <svg viewBox="0 0 200 100" className="w-[200px] h-[100px]">
                <defs>
                  <linearGradient id="gaugeGradient">
                    <stop offset="0%" stopColor="#00ff00" />
                    <stop offset="50%" stopColor="#ffff00" />
                    <stop offset="100%" stopColor="#ff0000" />
                  </linearGradient>
                  <linearGradient id="needleGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#ffffff" />
                    <stop offset="100%" stopColor="#2c2f3a" />
                  </linearGradient>
                </defs>
                <path d="M20,100 A80,80 0 0,1 180,100" fill="none" stroke="#2c2f3a" strokeWidth="12" />
                <path d="M20,100 A80,80 0 0,1 180,100" fill="none" stroke="url(#gaugeGradient)" strokeWidth="10" />
                <polygon
                  points={`100,90 ${100 + 5 * Math.cos((Math.PI * (needleRotation - 180 - 90)) / 180)},${90 + 5 * Math.sin((Math.PI * (needleRotation - 180 - 90)) / 180)} ${100 + 70 * Math.cos((Math.PI * (needleRotation - 180)) / 180)},${90 + 70 * Math.sin((Math.PI * (needleRotation - 180)) / 180)} ${100 + 5 * Math.cos((Math.PI * (needleRotation - 180 + 90)) / 180)},${90 + 5 * Math.sin((Math.PI * (needleRotation - 180 + 90)) / 180)}`}
                  fill="url(#needleGradient)"
                />
                <circle cx="100" cy="90" r="5" fill="white" />
              </svg>
              <div className="absolute text-white font-bold text-sm -bottom-1 left-6">LOW</div>
              <div className="absolute text-white font-bold text-sm -bottom-1 right-6">HIGH</div>
            </div>
          </div>

          <div className="bg-[#121826] p-6 rounded-xl">
            <h2 className="text-sm font-semibold mb-2">INCOMING DISRUPTIONS</h2>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-400 font-bold mb-1">Without Action</p>
                <p>Without reroute, public supply delays will exceed 36 hours</p>
                <p>Financial Cost: Est. {disruptionData.lossEstimate}</p>
                <p className={`font-semibold ${disruptionData.pnsEstimate > 0.7 ? "text-red-500" : "text-yellow-300"}`}>
                  Public Risk Level: {disruptionData.pnsEstimate > 0.7 ? "RED" : "MODERATE"}
                </p>
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

      <div className="mt-8 text-xs text-center text-gray-500">
        © 2025 AMERICAN SHIELD COMMAND. ShieldSync™ and American Shield™ are proprietary technologies. Protected under U.S. copyright law.
      </div>
    </div>
  );
}
