import { LayoutDashboard, BarChart3, Map, Gauge, Box } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function SideBar() {
  const location = useLocation();
  
  const mainMenuItems = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/" },
    { name: "Analysis", icon: BarChart3, path: "/analysis" },
    { name: "Map", icon: Map, path: "/map" },
  ];
  const meters = [
    { name: "Main Meter", icon: Gauge, path: "/meter/main" },
    { name: "Block 7", icon: Box, path: "/meter/block-7" },
    { name: "Block 8", icon: Box, path: "/meter/block-8" },
    { name: "Block 9", icon: Box, path: "/meter/block-9" },
    { name: "Block 10", icon: Box, path: "/meter/block-10" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="w-64 h-screen bg-gray-50 text-gray-700 flex flex-col border-r border-gray-200">
      {/* Header */}
      <div className="px-6 py-5 border-b border-gray-200">
        <h1 className="text-lg font-semibold text-gray-800">Smart Meter</h1>
      </div>

      {/* Navigation */}
      <div className="px-4 py-4">
        <nav className="space-y-1">
          {mainMenuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2 text-sm rounded-md cursor-pointer transition ${
                  active
                    ? "bg-blue-50 text-blue-600 font-medium"
                    : "hover:bg-gray-100"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Available Meters */}
      <div className="px-4 py-2">
        <h2 className="text-xs font-medium text-gray-500 px-3 py-2">Available Meters</h2>
        <div className="space-y-1">
          {meters.map((meter) => {
            const Icon = meter.icon;
            const active = isActive(meter.path);
            return (
              <Link
                key={meter.path}
                to={meter.path}
                className={`flex items-center gap-3 px-3 py-2 text-sm rounded-md cursor-pointer transition ${
                  active
                    ? "bg-blue-50 text-blue-600 font-medium"
                    : "hover:bg-gray-100"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{meter.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}