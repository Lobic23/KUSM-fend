
export type OverviewInfoCardProps = {
  title: string;
  data?: number;
  footer?: string;
  unit?: string;
  prefix?: string;
};

export function OverviewInfoCard({ title, data, footer, unit, prefix }: OverviewInfoCardProps) {
  if (!data) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center gap-3 bg-[#F9F9FA] rounded-[20px]">
        <div className="w-8 h-8 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
        <span className="text-sm text-gray-500">Fetching {title}...</span>
      </div>
    );
  }

  return (
  <div className="w-full h-full flex flex-col bg-[#EDEEFC] rounded-[20px]">
    <div className="px-6 pt-4 text-lg">
      {title}
    </div>
    <div className="px-6 pb-2 pt-2 text-2xl font-semibold">
      {prefix} {data} {unit}
    </div>
    { footer ? (
      <div className="px-6 pb-2 pt-2 text-sm font-semibold">
        {footer}
      </div>
    ) : (<></>) }
  </div>
  );
}

