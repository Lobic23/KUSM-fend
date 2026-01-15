import { LineChart } from "@mui/x-charts/LineChart";
import type { TimePoint } from "@utils/types";

export type LineGraphPoint = {
  label: string;
  data: TimePoint[];
  color: string;
};

export type LineGraphProps = {
  title: string;
  points?: LineGraphPoint[];
};

export function LineGraph({ title, points }: LineGraphProps) {
  // Loading state
  if (!points) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center gap-3 bg-white rounded-2xl border border-gray-100">
        <div className="w-6 h-6 border-2 border-gray-200 border-t-gray-500 rounded-full animate-spin" />
        <span className="text-sm text-gray-400">Fetching {title}</span>
      </div>
    );
  }

  const safePoints = points.filter(
    (p) => Array.isArray(p.data) && p.data.length > 0
  );

  if (safePoints.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center text-sm text-gray-400 bg-white rounded-2xl border border-gray-100">
        No data available
      </div>
    );
  }

  // Y-axis range
  const allValues = safePoints.flatMap((p) => p.data.map((d) => d.y));
  const minY = Math.min(...allValues);
  const maxY = Math.max(...allValues);
  const padding = (maxY - minY) * 0.1 || 1;

  // X-axis
  const firstX = safePoints[0].data[0].x;
  const isTimeAxis = firstX instanceof Date;
  const xAxisData = safePoints[0].data.map((d) => d.x);

  const xAxis = isTimeAxis
    ? [
        {
          scaleType: "time" as const,
          data: xAxisData as Date[],
          valueFormatter: (d: Date) =>
            d.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
        },
      ]
    : [
        {
          scaleType: "band" as const,
          data: xAxisData as (number | string)[],
        },
      ];

  // Series
  const series = safePoints.map((p, idx) => ({
    data: p.data.map((d) => d.y),
    label: p.label,
    showMark: false,
    area: true,
    curve: "monotoneX" as const,
    color: p.color,
  }));

  return (
    <div className="w-full h-full flex flex-col bg-white rounded-2xl border border-gray-100">
      {/* Header */}
      <div className="px-6 pt-5 pb-2 text-sm font-medium text-gray-900">
        {title}
      </div>

      {/* Chart */}
      <LineChart
        series={series}
        xAxis={xAxis}
        yAxis={[
          {
            min: minY - padding,
            max: maxY + padding,
            tickLabelStyle: { fill: "#9ca3af", fontSize: 12 },
            tickSize: 0,
          },
        ]}
        grid={{ horizontal: false, vertical: false }}
        tooltip={{ trigger: "axis" }}
        hideLegend
        sx={{
          "& .MuiAreaElement-root": {
            fillOpacity: 0.08,
          },
          "& .MuiLineElement-root": {
            strokeWidth: 2,
          },
          "& .MuiChartsAxis-line": {
            display: "none",
          },
          "& .MuiChartsAxis-tick": {
            display: "none",
          },
          "& .MuiChartsTooltip-root": {
            backgroundColor: "#fff",
            border: "1px solid #e5e7eb",
            boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
            borderRadius: "8px",
          },
        }}
      />
    </div>
  );
}
