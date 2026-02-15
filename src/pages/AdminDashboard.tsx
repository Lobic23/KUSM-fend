import { useState } from "react";
import { Activity, Server, CheckCircle2, XCircle } from "lucide-react";
import DataCollectionTab from "@/components/AdminDashComps/DataCollectionTab";
import MeterEditsTab from "@/components/AdminDashComps/MeterEditsTab";

type TabType = "collection" | "meters";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<TabType>("collection");
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const showMessage = (type: "success" | "error", text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 4000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
                Admin Dashboard
              </h1>
              <p className="text-slate-600 mt-1">
                Manage data collection and meters
              </p>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mt-6 border-b border-slate-200">
            <button
              onClick={() => setActiveTab("collection")}
              className={`px-4 py-2 font-semibold transition-colors relative ${activeTab === "collection"
                ? "text-blue-600"
                : "text-slate-600 hover:text-slate-900"
                }`}
            >
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4" />
                Data Collection
              </div>
              {activeTab === "collection" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
              )}
            </button>
            <button
              onClick={() => setActiveTab("meters")}
              className={`px-4 py-2 font-semibold transition-colors relative ${activeTab === "meters"
                ? "text-blue-600"
                : "text-slate-600 hover:text-slate-900"
                }`}
            >
              <div className="flex items-center gap-2">
                <Server className="w-4 h-4" />
                Meters
              </div>
              {activeTab === "meters" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-8 py-8">
        {/* Message Toast */}
        {message && (
          <div
            className={`mb-6 flex items-center gap-3 px-4 py-3 rounded-lg border-2 ${message.type === "success"
              ? "bg-emerald-50 border-emerald-200 text-emerald-900"
              : "bg-red-50 border-red-200 text-red-900"
              } animate-in slide-in-from-top duration-300`}
          >
            {message.type === "success" ? (
              <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
            ) : (
              <XCircle className="w-5 h-5 flex-shrink-0" />
            )}
            <span className="font-medium">{message.text}</span>
          </div>
        )}

        {/* Render Active Tab */}
        {activeTab === "collection" && <DataCollectionTab onMessage={showMessage} />}
        {activeTab === "meters" && <MeterEditsTab onMessage={showMessage} />}
      </div>
    </div>
  );
}