import { RefreshCw } from "lucide-react";

interface ConfirmDialogProps {
	type: "add" | "delete" | "update";
	confirmText: string;
	confirmInput: string;
	actionLoading: string | null;
	onConfirmInputChange: (value: string) => void;
	onConfirm: () => void;
	onCancel: () => void;
}

export function ConfirmDialog({
	type,
	confirmText,
	confirmInput,
	actionLoading,
	onConfirmInputChange,
	onConfirm,
	onCancel,
}: ConfirmDialogProps) {
	return (
		<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
			<div className="bg-white rounded-xl p-6 max-w-md w-full shadow-2xl">
				<h3 className="text-lg font-bold text-slate-900 mb-2">
					Confirm {type === "add" ? "Addition" : type === "delete" ? "Deletion" : "Update"}
				</h3>
				<p className="text-sm text-slate-600 mb-4">
					To confirm this action, please type exactly: <br />
					<span className="font-mono font-bold text-slate-900 bg-slate-100 px-2 py-1 rounded mt-2 inline-block">
						{confirmText}
					</span>
				</p>
				<input
					type="text"
					value={confirmInput}
					onChange={(e) => onConfirmInputChange(e.target.value)}
					placeholder="Type here to confirm..."
					className="w-full px-4 py-2.5 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none mb-4"
					autoFocus
				/>
				<div className="flex gap-3">
					<button
						onClick={onConfirm}
						disabled={confirmInput !== confirmText || actionLoading !== null}
						className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
					>
						{actionLoading ? (
							<span className="flex items-center justify-center gap-2">
								<RefreshCw className="w-4 h-4 animate-spin" />
								Processing...
							</span>
						) : (
							"Confirm"
						)}
					</button>
					<button
						onClick={onCancel}
						disabled={actionLoading !== null}
						className="px-4 py-2.5 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-all font-semibold disabled:opacity-50"
					>
						Cancel
					</button>
				</div>
			</div>
		</div>
	);
}