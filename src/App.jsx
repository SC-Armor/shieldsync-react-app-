
import React from "react";
import { MapContainer, TileLayer, Circle, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function App() {
  return (
    <div className="min-h-screen bg-[#0b0f1a] text-white p-6 font-sans">
      {/* Header */}
      <div className="text-left mb-6">
        <h1 className="text-3xl font-bold text-blue-400">
          SC<span className="text-white">🛡</span>Armor – <span className="text-white">ShieldSync Core</span>
        </h1>
        <p className="text-gray-400 text-sm">
          National Infrastructure Risk Defense System
        </p>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Left Panel: Forecast + Map + Response */}
        <div className="col-span-2 space-y-6">
          <div className="bg-gradient-to-br from-red-900 to-black p-6 rounded-xl shadow">
            <h2 className="text-red-400 text-xl font-semibold mb-2">Disruption Forecast</h2>
            <div className="h-[300px] rounded overflow-hidden relative">
              <MapContainer center={[41.878, -93.097]} zoom={5.5} style={{ height: "100%", width: "100%" }}>
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution="&copy; OpenStreetMap contributors"
                />
                <Circle center={[41.878, -93.097]} radius={150000} pathOptions={{ fillColor: "#ff4500", fillOpacity: 0.4, color: "#ff4500" }}>
                  <Popup>
                    Blizzard Forecast – 3 Days
                  </Popup>
                </Circle>
              </MapContainer>
            </div>
            <p className="text-center text-white mt-3 text-lg">Midwest – Blizzard Incoming</p>
          </div>

          <div className="bg-[#121826] p-6 rounded-xl">
            <h3 className="text-lg font-semibold mb-2">SHIELD RESPONSE SUGGESTED</h3>
            <p className="text-white bg-blue-800 p-3 rounded">Divert shipments via Kansas City distribution corridor</p>
            <button className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white font-bold">
              INITIATE RESPONSE
            </button>

            <div className="mt-6 text-sm text-gray-400">
              <h4 className="text-white font-semibold mb-2">SIMULATED IMPACT</h4>
              <p>Without Action: <span className="text-white">36-hour regional shortage</span></p>
              <p>Financial Cost: <span className="text-white">Est. $12M in spoiled inventory</span></p>
              <p className="text-white mt-1">PNSE: 67%</p>
            </div>
          </div>
        </div>

        {/* Right Panel: Gauge + Outcomes */}
        <div className="space-y-6">
          <div className="bg-[#121826] p-6 rounded-xl">
            <h2 className="text-lg font-semibold mb-4">DISRUPTION PULSE</h2>
            <div className="relative w-full h-40 flex justify-center items-center">
              <svg viewBox="0 0 100 50" className="w-60 h-32">
                <path d="M10,50 A40,40 0 0,1 90,50" fill="none" stroke="#444" strokeWidth="10" />
                <path d="M10,50 A40,40 0 0,1 90,50" fill="none" stroke="url(#gradient)" strokeWidth="10" strokeDasharray="100" strokeDashoffset="15"/>
                <line x1="50" y1="50" x2="85" y2="20" stroke="white" strokeWidth="3" />
                <defs>
                  <linearGradient id="gradient">
                    <stop offset="0%" stopColor="#00FF00" />
                    <stop offset="50%" stopColor="#FFBF00" />
                    <stop offset="100%" stopColor="#FF0000" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>

          <div className="bg-[#121826] p-6 rounded-xl">
            <h2 className="text-lg font-semibold mb-2">INCOMING DISRUPTIONS</h2>
            <div className="text-sm">
              <div className="mb-4">
                <span className="text-gray-400">Without Action:</span>
                <ul className="list-disc list-inside ml-2">
                  <li>36-hour regional shortage</li>
                  <li>Est. $12M in spoiled inventory</li>
                  <li className="text-red-500">Public Risk Level: RED</li>
                </ul>
              </div>
              <div>
                <span className="text-gray-400">With Shield Response:</span>
                <ul className="list-disc list-inside ml-2">
                  <li>Shipments rerouted in &lt; 6 hours</li>
                  <li>$170K reroute cost</li>
                  <li className="text-green-500">Public Risk Level: CONTAINED</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 text-xs text-center text-gray-500">
        © 2025 SC🛡Armor. ShieldSync™ and American Shield Command™ are proprietary technologies. Protected under U.S. copyright law.
      </div>
    </div>
  );
}
