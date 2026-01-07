import { useState, useEffect, useRef } from "react";
import { X, MapPin } from "lucide-react";
import { useMeterStore } from "@/stores/meterStore";
import type { Meter } from "@/utils/types";

export default function Map() {
  const { meters, isLoading, error, fetchMeters } = useMeterStore();
  const [selectedMeter, setSelectedMeter] = useState<Meter | null>(null);
  const imageRef = useRef(null);

  useEffect(() => {
    fetchMeters();
  }, [fetchMeters]);

  const handleMarkerClick = (meter: Meter): void => {
    setSelectedMeter(meter);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-lg">Loading map data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-lg text-red-600">Error: {error}</div>
      </div>
    );
  }

  // Filter meters that have location coordinates
  const metersWithLocation = meters.filter(m => m.x != null && m.y != null);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Map Container */}
      <div className="flex-1 p-4 overflow-auto">
        <div className="bg-white rounded-lg shadow-lg p-4">
          <h1 className="text-2xl font-bold mb-4">Campus Energy Map</h1>

          {metersWithLocation.length === 0 && (
            <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded">
              <p className="text-yellow-800">
                No meter locations configured. Please use the admin panel to set locations.
              </p>
            </div>
          )}

          <div className="relative inline-block">
            <div ref={imageRef} className="relative border-2 border-gray-300 rounded">
              <img
                src="/KuMap.png"
                alt="Campus Map"
                className="block max-w-none"
                style={{ width: "800px", height: "600px" }}
              />

              {/* Markers */}
              {metersWithLocation.map((meter) => (
                <button
                  key={meter.meter_id}
                  onClick={() => handleMarkerClick(meter)}
                  className="absolute -translate-x-1/2 -translate-y-1/2
                           transition hover:scale-125 group"
                  style={{
                    left: `${meter.x}%`,
                    top: `${meter.y}%`,
                  }}
                >
                  <MapPin
                    className={`w-8 h-8 ${
                      selectedMeter?.meter_id === meter.meter_id
                        ? "text-blue-600 fill-blue-200"
                        : "text-red-600 fill-red-200"
                    }`}
                  />
                  <span
                    className="absolute top-full mt-1 left-1/2 transform -translate-x-1/2
                             bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap
                             opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                  >
                    {meter.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      {selectedMeter && (
        <div className="w-96 bg-white shadow-lg p-6 overflow-auto">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-xl font-bold">Location Details</h2>
            <button
              onClick={() => setSelectedMeter(null)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-semibold text-gray-600">Name</label>
              <p className="text-lg">{selectedMeter.name}</p>
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-600">Meter ID</label>
              <p className="text-lg font-mono">{selectedMeter.sn}</p>
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-600">Location ID</label>
              <p className="text-lg">{selectedMeter.meter_id}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}