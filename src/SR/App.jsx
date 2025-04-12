import React from "react";
import DisruptionMap from "./SR/DisruptionMap";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1d26] to-[#10131c] text-white font-sans p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-wide text-white">
          ShieldSync by SC🛡Command
        </h1>
        <p className="text-sm text-gray-400">
          National Infrastructure Risk Defense Dashboard
        </p>
      </div>

      {/* Main Map Panel */}
      <div className="rounded-xl overflow-hidden shadow-xl bg-[#121826]">
        <DisruptionMap />
      </div>

      {/* Footer */}
      <footer className="mt-8 text-xs text-center text-gray-500">
        © 2025 SC🛡Command. ShieldSync™ and American Shield™ are proprietary technologies. Protected under U.S. copyright law.
      </footer>
    </div>
  );
}

export default App;
