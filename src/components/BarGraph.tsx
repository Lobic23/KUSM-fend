import { BarChart } from "@mui/x-charts/BarChart";

export type BarGraphData = {
  label: string;
  value: number;
};

export type BarGraphProps = {
  title: string;
  data?: BarGraphData[];
  color?: string;
};

export function BarGraph({ title, data, color = "#3b82f6" }: BarGraphProps) {
  // Loading state
  if (!data) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center gap-3 bg-[#F9F9FA] rounded-[20px]">
        <div className="w-8 h-8 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
        <span className="text-sm text-gray-500">Fetching {title}...</span>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center text-sm text-gray-500">
        No data available
      </div>
    );
  }

  const xAxisLabels = data.map(d => d.label);
  const values = data.map(d => d.value);

  return (
    <div className="w-full h-full flex flex-col bg-[#F9F9FA] rounded-[20px]">
      <div className="px-6 py-4 flex-none">{title}</div>

      <BarChart
        xAxis={[
          {
            scaleType: "band",
            data: xAxisLabels,
          },
        ]}
        series={[
          {
            data: values,
            color,
          },
        ]}
        hideLegend
      />
    </div>
  );
}
