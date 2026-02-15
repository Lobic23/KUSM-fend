import type { Meter } from "@/lib/types";
import { Trash2, Server } from "lucide-react";

// Meter Card Component
interface MeterCardProps {
	meter: Meter;
	onDelete: () => void;
}

export function MeterCard({
	meter,
	onDelete,
}: MeterCardProps) {
	return (
		<div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-shadow">
			<div className="flex items-center justify-between gap-4">
				<div className="flex-1 min-w-0">
					<div className="flex items-center gap-3">
						<div className="p-2 bg-blue-100 rounded-lg">
							<Server className="w-5 h-5 text-blue-600" />
						</div>
						<div className="flex-1 min-w-0">
							<h4 className="font-bold text-slate-900 truncate">{meter.name}</h4>
							<p className="text-sm text-slate-500 font-mono">SN: {meter.sn}</p>
						</div>
					</div>

				</div>

				<div className="flex items-center gap-2">

					<button
						onClick={onDelete}
						className="flex items-center gap-2 px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-sm font-semibold"
					>
						<Trash2 className="w-4 h-4" />
						Delete
					</button>
				</div>
			</div>
		</div>
	);
}
