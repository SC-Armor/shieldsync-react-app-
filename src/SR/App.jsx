import React from "react";
import DisruptionMap from "../assets/components/DisruptionMap";

export default function App() {
  return (
    <div className="min-h-screen bg-[#0b0f1a] text-white p-6 font-sans">
      <div className="text-left mb-6">
        <h1 className="text-3xl font-bold text-white">AMERICAN SHIELD COMMAND</h1>
        <p className="text-gray-400 text-sm">National Infrastructure Risk Defense Dashboard</p>
      </div>
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 space-y-6">
          <DisruptionMap />
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
                  points="100,90 102,87 165,80 102,93"
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
                <p>Financial Cost: Est. $12M</p>
                <p className="text-red-500 font-semibold">Public Risk Level: RED</p>
              </div>
              <div>
                <p className="text-gray-400 font-bold mb-1">With Shield Response</p>
                <p>Rerouted in &lt; 6 hours</p>
                <p>$170K reroute cost</p>
                <p className="text-green-500 font-semibold">Public Risk Level: CONTAINED</p>
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
