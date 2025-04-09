
import React from 'react';

export default function App() {
  return (
    <div className="p-8 bg-gray-900 text-white min-h-screen font-sans">
      <h1 className="text-3xl font-bold mb-2">🛡️ AMERICAN SHIELD COMMAND</h1>
      <p className="text-sm text-gray-400 mb-6">National Infrastructure Risk Defense System</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold">🌨️ Blizzard Forecast – 3 Days</h2>
          <p className="text-gray-400">Midwest (Iowa Region)</p>
          <h3 className="text-lg mt-4 font-bold">🛡️ SHIELD RESPONSE SUGGESTED</h3>
          <p className="text-green-400">✅ Divert shipments via Kansas City distribution corridor</p>
          <button className="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">INITIATE RESPONSE</button>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-1">📊 DISRUPTION PULSE</h3>
          <p className="text-red-400">Risk Level: HIGH</p>

          <h3 className="text-lg mt-6 font-semibold mb-1">🚨 INCOMING DISRUPTIONS</h3>
          <div className="text-sm">
            <span className="text-gray-400">Without Action:</span>
            <ul className="list-disc list-inside ml-2">
              <li>36-hour regional shortage</li>
              <li>Est. $12M in spoiled inventory</li>
              <li className="text-red-500">Public Risk Level: RED</li>
            </ul>
          </div>
          <div className="mt-4 text-sm">
            <span className="text-gray-400">With Shield Response:</span>
            <ul className="list-disc list-inside ml-2">
              <li>{'Shipments rerouted in < 6 hours'}</li>
              <li>$170K reroute cost</li>
              <li className="text-green-400">Public Risk Level: CONTAINED</li>
            </ul>
          </div>
        </div>
      </div>

      <footer className="text-xs text-gray-500 mt-10">
        © 2025 SC🛡Armor. ShieldSync™ and American Shield Command™ are proprietary technologies. Protected under U.S. copyright law.
      </footer>
    </div>
  );
}
