import type { Meter } from "@/lib/types";
import { MapPin, RefreshCw, Save, Trash2 } from "lucide-react";

interface MapViewProps {
	localMeters: Meter[];
	selectedMeter: Meter | null;
	hasMapChanges: boolean;
	actionLoading: string | null;
	imageRef: React.RefObject<HTMLDivElement | null>;
	onImageClick: (e: { clientX: number; clientY: number }) => void;
	onSelectMeter: (meter: Meter) => void;
	onSaveMap: () => void;
	onResetMap: () => void;
}

export function MapView({
	localMeters,
	selectedMeter,
	hasMapChanges,
	actionLoading,
	imageRef,
	onImageClick,
	onSelectMeter,
	onSaveMap,
	onResetMap,
}: MapViewProps) {
	return (
		<div className="flex gap-6">
			{/* Map Container */}
			<div className="flex-1 bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
				<div className="flex justify-between items-center mb-4">
					<div>
						<h3 className="text-lg font-bold text-slate-900">Map Editor</h3>
						<p className="text-sm text-slate-600 mt-1">
							Select a meter, then click on the map to position it
						</p>
					</div>
					<div className="flex gap-2">
						{hasMapChanges && (
							<>
								<button
									onClick={onResetMap}
									disabled={actionLoading === "save-map"}
									className="px-4 py-2 bg-slate-500 text-white rounded-lg hover:bg-slate-600 
							   flex items-center gap-2 disabled:opacity-50 font-semibold"
								>
									<Trash2 className="w-4 h-4" />
									Reset
								</button>
								<button
									onClick={onSaveMap}
									disabled={actionLoading === "save-map"}
									className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
							   flex items-center gap-2 disabled:opacity-50 font-semibold"
								>
									{actionLoading === "save-map" ? (
										<>
											<RefreshCw className="w-4 h-4 animate-spin" />
											Saving...
										</>
									) : (
										<>
											<Save className="w-4 h-4" />
											Save Changes
										</>
									)}
								</button>
							</>
						)}
					</div>
				</div>

				<div
					ref={imageRef}
					onClick={onImageClick}
					className="relative inline-block cursor-crosshair border-2 border-slate-300 rounded-lg overflow-hidden"
				>
					<img
						src="/KuMap.png"
						alt="Campus Map"
						className="block max-w-none pointer-events-none"
						style={{ width: "800px", height: "600px" }}
					/>

					{/* Markers */}
					{localMeters.map((meter) => (
						<div
							key={meter.meter_id}
							className="absolute transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
							style={{
								left: `${meter.x}%`,
								top: `${meter.y}%`,
							}}
						>
							<MapPin
								className={`w-8 h-8 ${selectedMeter?.meter_id === meter.meter_id
									? "text-blue-600 fill-blue-200"
									: "text-red-600 fill-red-200"
									} drop-shadow-lg`}
							/>
						</div>
					))}
				</div>
			</div>

			{/* Sidebar */}
			<div className="w-80 bg-white rounded-xl border border-slate-200 p-6 shadow-sm overflow-auto max-h-[700px]">
				<h4 className="text-lg font-bold text-slate-900 mb-4">Meters</h4>
				<div className="space-y-2">
					{localMeters.map((meter) => (
						<button
							key={meter.meter_id}
							onClick={() => onSelectMeter(meter)}
							className={`w-full text-left p-3 rounded-lg border-2 transition-all ${selectedMeter?.meter_id === meter.meter_id
								? "border-blue-500 bg-blue-50"
								: "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
								}`}
						>
							<div className="font-semibold text-slate-900">{meter.name}</div>
							<div className="text-sm text-slate-600 font-mono">{meter.sn}</div>
							<div className="text-xs text-slate-500 mt-1">
								Position: ({(meter.x ?? 50).toFixed(1)}%, {(meter.y ?? 50).toFixed(1)}%)
							</div>
						</button>
					))}
				</div>
			</div>
		</div>
	);
}