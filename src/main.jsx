import React from "react";
import { createRoot } from "react-dom/client";
import "../index.css";

function Dashboard() {
  return (
    <div className="min-h-screen bg-[#0a0f1c] text-white font-sans p-8">
      <header className="mb-6">
        <h1 className="text-3xl font-bold tracking-wide text-blue-400">
          🛡 AMERICAN SHIELD COMMAND
        </h1>
        <p className="text-sm text-gray-400 mt-1">
          National Infrastructure Risk Defense System
        </p>
      </header>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 bg-[#131a26] p-6 rounded-2xl shadow-xl">
          <div className="text-red-500 font-semibold text-lg mb-2">
            Blizzard Forecast - 3 Days
          </div>
          <div className="h-[360px] bg-gradient-radial from-red-500/40 to-transparent rounded-xl flex items-center justify-center">
            <span className="text-white text-2xl">Midwest (Iowa Region)</span>
          </div>
          <div className="mt-6">
            <h2 className="text-white font-bold text-lg mb-2">SHIELD RESPONSE SUGGESTED</h2>
            <p className="bg-blue-800 p-4 rounded-lg text-white text-sm">
              Divert shipments via Kansas City distribution corridor
            </p>
            <button className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md">
              INITIATE RESPONSE
            </button>
          </div>
        </div>

        <div className="bg-[#131a26] p-6 rounded-2xl shadow-xl">
          <div className="text-lg font-semibold text-white mb-2">DISRUPTION PULSE</div>
          <div className="relative h-[160px]">
            <div className="absolute top-0 left-0 w-full h-full flex items-end">
              <div className="w-full h-2 rounded-full bg-gradient-to-r from-green-400 via-yellow-400 to-red-600"></div>
            </div>
            <div className="absolute left-2/3 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-white font-bold mb-1 text-sm">INCOMING DISRUPTIONS</h3>
            <div className="text-sm">
              <div className="mb-2">
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
                  <li>Shipments rerouted in < 6 hours</li>
                  <li>$170K reroute cost</li>
                  <li className="text-green-400">Public Risk Level: CONTAINED</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="mt-12 text-center text-gray-500 text-xs">
        © 2025 SC🛡Armor. ShieldSync™ and American Shield Command™ are proprietary technologies.
        Protected under U.S. copyright law.
      </footer>
    </div>
  );
}

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<Dashboard />);
