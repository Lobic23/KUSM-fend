import { Plus } from "lucide-react";

// Add Meter Form Component
interface AddMeterFormProps {
	showAddMeter: boolean;
	newMeter: { Name: string; sn: string };
	onToggle: () => void;
	onMeterChange: (meter: { Name: string; sn: string }) => void;
	onSubmit: () => void;
}

export function AddMeterForm({
	showAddMeter,
	newMeter,
	onToggle,
	onMeterChange,
	onSubmit,
}: AddMeterFormProps) {
	return (
		<div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
			<div className="flex items-center justify-between mb-6">
				<h4 className="font-bold text-slate-900">Add New Meter</h4>
				<button
					onClick={onToggle}
					className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all font-semibold shadow-sm"
				>
					<Plus className="w-4 h-4" />
					{showAddMeter ? "Cancel" : "Add Meter"}
				</button>
			</div>

			{showAddMeter && (
				<div className="border-t border-slate-200 pt-6 space-y-4">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div>
							<label className="block text-sm font-semibold text-slate-700 mb-2">
								Meter Name
							</label>
							<input
								type="text"
								value={newMeter.Name}
								onChange={(e) => onMeterChange({ ...newMeter, Name: e.target.value })}
								placeholder="e.g., Block 12 - Computer Lab"
								className="w-full px-4 py-2.5 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none"
							/>
						</div>
						<div>
							<label className="block text-sm font-semibold text-slate-700 mb-2">
								Serial Number
							</label>
							<input
								type="text"
								value={newMeter.sn}
								onChange={(e) => onMeterChange({ ...newMeter, sn: e.target.value.toUpperCase() })}
								placeholder="e.g., ABC12345"
								className="w-full px-4 py-2.5 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none font-mono"
							/>
						</div>
					</div>

					<button
						onClick={onSubmit}
						disabled={!newMeter.Name || !newMeter.sn}
						className="w-full px-5 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all font-semibold shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
					>
						Add Meter
					</button>
				</div>
			)}
		</div>
	);
}