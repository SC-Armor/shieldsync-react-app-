import React, { useState } from "react";
import { MapContainer, TileLayer, Circle, Popup, Marker, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function App() {
  const [responseInitiated, setResponseInitiated] = useState(false);

  const disruptionData = {
    center: [38.2527, -85.7585], // Exact Louisville, KY coordinates
    company: "UPS Worldport",
    severity: 4,
    pnsEstimate: 0.67,
    impactHours: 36,
    lossEstimate: "$12M"
  };

  const rerouteInfo = {
    action: "Divert to Nashville DC",
    timeSaved: "< 6 hours",
    cost: "$170K"
  };

  return (
    <div className="min-h-screen bg-[#0b0f1a] text-white p-6 font-sans">
      {/* Header */}
      <div className="text-left mb-6">
        <h1 className="text-3xl font-bold text-blue-400">
          AMERICAN <span className="text-white">SHIELD COMMAND</span>
        </h1>
        <p className="text-gray-400 text-sm">
          National Infrastructure Risk Defense Dashboard
        </p>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Left Panel */}
        <div className="col-span-2 space-y-6">
          <div className="bg-gradient-to-br from-red-900 to-black p-6 rounded-xl shadow">
            <h2 className="text-red-400 text-xl font-semibold mb-2">Disruption Forecast</h2>
            <div className="h-[300px] rounded overflow-hidden relative">
              <MapContainer center={disruptionData.center} zoom={7} style={{ height: "100%", width: "100%" }}>
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution="&copy; OpenStreetMap contributors"
                />
                <Circle center={disruptionData.center} radius={120000} pathOptions={{ fillColor: "#ff4500", fillOpacity: 0.4, color: "#ff4500" }}>
                  <Popup>{disruptionData.company} – Blizzard Alert (3 days)</Popup>
                </Circle>
                <Marker position={disruptionData.center}>
                  <Tooltip direction="top" offset={[0, -20]} opacity={1} permanent>
                    {disruptionData.company}
                  </Tooltip>
                </Marker>
              </MapContainer>
            </div>
            <p className="text-center text-white mt-3 text-lg">Louisville, KY – Blizzard Incoming</p>
          </div>

          <div className="bg-[#121826] p-6 rounded-xl">
            <h3 className="text-lg font-semibold mb-2">SHIELD RESPONSE SUGGESTED</h3>
            <p className="text-white bg-blue-800 p-3 rounded">{rerouteInfo.action}</p>
            {!responseInitiated ? (
              <button onClick={() => setResponseInitiated(true)} className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white font-bold">
                INITIATE RESPONSE
              </button>
            ) : (
              <p className="text-green-400 mt-4">✔ Response Activated</p>
            )}

            <div className="mt-6 text-sm text-gray-400">
              <h4 className="text-white font-semibold mb-2">SIMULATED IMPACT</h4>
              <p>Without Action: <span className="text-white">{disruptionData.impactHours}-hour shortage</span></p>
              <p>Financial Cost: <span className="text-white">{disruptionData.lossEstimate}</span></p>
              <p className="text-white mt-1">PNSE: {(disruptionData.pnsEstimate * 100).toFixed(0)}%</p>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="space-y-6">
          <div className="bg-[#121826] p-6 rounded-xl">
            <h2 className="text-lg font-semibold mb-4">DISRUPTION PULSE</h2>
            <div className="relative w-full h-36">
              <svg viewBox="0 0 200 100" className="w-full h-full">
                <path d="M10,90 A90,90 0 0,1 190,90" fill="none" stroke="#333" strokeWidth="12" />
                <path d="M10,90 A90,90 0 0,1 190,90" fill="none" stroke="#ff0000" strokeWidth="10" strokeDasharray="282.6" strokeDashoffset={282.6 * (1 - disruptionData.pnsEstimate)} strokeLinecap="round" />
                <circle cx="100" cy="90" r="6" fill="#ffffff" />
                <text x="100" y="55" textAnchor="middle" fill="#ffffff" fontSize="14">{Math.round(disruptionData.pnsEstimate * 100)}%</text>
              </svg>
            </div>
          </div>

          <div className="bg-[#121826] p-6 rounded-xl">
            <h2 className="text-lg font-semibold mb-2">INCOMING DISRUPTIONS</h2>
            <div className="text-sm">
              <div className="mb-4">
                <span className="text-gray-400">Without Action:</span>
                <ul className="list-disc list-inside ml-2">
                  <li>{disruptionData.impactHours}-hour regional shortage</li>
                  <li>{disruptionData.lossEstimate} in losses</li>
                  <li className="text-red-500">Public Risk Level: RED</li>
                </ul>
              </div>
              <div>
                <span className="text-gray-400">With Shield Response:</span>
                <ul className="list-disc list-inside ml-2">
                  <li>Rerouted in {rerouteInfo.timeSaved}</li>
                  <li>{rerouteInfo.cost} reroute cost</li>
                  <li className="text-green-500">Public Risk Level: CONTAINED</li>
                </ul>
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
