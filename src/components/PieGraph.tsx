import { PieChart } from "@mui/x-charts/PieChart";

export type PieGraphPoint = {
  id: number | string;
  label: string;
  value: number;
  color?: string;
};

export type PieGraphProps = {
  title: string;
  data?: PieGraphPoint[];
};

export function PieGraph({ title, data }: PieGraphProps) {
  // Loading state
  if (!data) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center gap-3 bg-[#F9F9FA] rounded-[20px]">
        <div className="w-8 h-8 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
        <span className="text-sm text-gray-500">Fetching {title}...</span>
      </div>
    );
  }

  const safeData = Array.isArray(data)
    ? data.filter(d => typeof d.value === "number" && d.value > 0)
    : [];

  if (safeData.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center text-sm text-gray-500">
        No data available
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col bg-[#F9F9FA] rounded-[20px]">
      <div className="px-6 py-4 flex-none">{title}</div>

      <PieChart
        series={[
          {
            data: safeData.map(item => ({
              id: item.id,
              value: item.value,
              label: item.label,
              color: item.color,
            })),
            innerRadius: 50,
            outerRadius: 90,
            paddingAngle: 2,
            cornerRadius: 4,
            highlightScope: { faded: "global", highlighted: "item" },
            faded: { innerRadius: 45, additionalRadius: -5 },
          },
        ]}
        slotProps={{
          legend: {
            direction: "column",
            position: { vertical: "middle", horizontal: "right" },
          },
        }}
      />
    </div>
  );
}
