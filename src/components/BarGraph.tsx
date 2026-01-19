import { BarChart } from "@mui/x-charts/BarChart";

export type BarGraphData = {
  label: string;
  value: number;
};

export type BarGraphProps = {
  title: string;
  data?: BarGraphData[];
  colors?: string[];
};

export function BarGraph({
  title,
  data,
  colors = ["#6D28D9", "#0D9488", "#D97706"],
}: BarGraphProps) {
  if (!data) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center gap-3 bg-white rounded-2xl border border-gray-100">
        <div className="w-6 h-6 border-2 border-gray-200 border-t-gray-500 rounded-full animate-spin" />
        <span className="text-sm text-gray-400">Fetching {title}</span>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center text-sm text-gray-400 bg-white rounded-2xl border border-gray-100">
        No data available
      </div>
    );
  }

  const labels = data.map((d) => d.label);
  const values = data.map((d) => d.value);

  return (
    <div className="w-full h-full flex flex-col bg-white rounded-2xl border border-gray-100 shadow-sm">
      <div className="px-6 pt-5 pb-2 text-sm font-medium text-gray-900">
        {title}
      </div>

      <BarChart
        xAxis={[
          {
            scaleType: "band",
            data: labels,
            tickLabelStyle: {
              fill: "#6B7280",
              fontSize: 12,
            },
            colorMap: {
              type: "ordinal",
              values: labels,
              colors,
            },
            categoryGapRatio:0.65,
            barGapRatio:0.1,
          },
        ]}
        yAxis={[
          {
            tickLabelStyle: {
              fill: "#9CA3AF",
              fontSize: 12,
            },
            tickSize: 0,
          },
        ]}
        series={[
          {
            data: values,
            colorByPoint: true,
          },
        ]}
        borderRadius={6}
        grid={{ horizontal: false, vertical: false }}
        hideLegend
        sx={{
          "& .MuiBarElement-root": {
            transition: "opacity 0.2s ease",
          },
          "& .MuiBarElement-root:hover": {
            opacity: 0.85,
          },
          "& .MuiChartsAxis-line": {
            display: "none",
          },
          "& .MuiChartsAxis-tick": {
            display: "none",
          },
        }}
      />
    </div>
  );
}
