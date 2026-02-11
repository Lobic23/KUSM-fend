import { useState } from "react";
import { useAuthStore, UserRole } from "@/stores/authStore";
import { useNavigate } from "react-router-dom";
import { User, Mail, Shield, ShieldCheck, Lock, ArrowLeft, Save } from "lucide-react";

export default function Profile() {
	const { user } = useAuthStore();
	const navigate = useNavigate();

	const [fullName, setFullName] = useState(user?.full_name || "");
	const [currentPassword, setCurrentPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	if (!user) {
		navigate('/');
		return null;
	}

	const handleUpdateProfile = () => {
		// TODO: Implement profile update
		console.log("Update profile:", { fullName });
	};

	const handleChangePassword = () => {
		// TODO: Implement password change
		if (newPassword !== confirmPassword) {
			alert("Passwords don't match!");
			return;
		}
		console.log("Change password");
	};

	return (
		<div className="min-h-screen bg-gray-50 p-6">
			<div className="max-w-4xl mx-auto">
				{/* Header */}
				<div className="mb-6">
					<button
						onClick={() => navigate(-1)}
						className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
					>
						<ArrowLeft className="w-4 h-4" />
						<span className="text-sm font-medium">Back</span>
					</button>
					<h1 className="text-3xl font-bold text-gray-900">Profile Settings</h1>
					<p className="text-gray-600 mt-1">Manage your account information</p>
				</div>

				<div className="grid gap-6">
					{/* User Information Card */}
					<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
						<div className="flex items-center gap-4 mb-6">
							<div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
								<User className="w-8 h-8 text-white" />
							</div>
							<div>
								<h2 className="text-xl font-semibold text-gray-900">
									{user.full_name || user.email}
								</h2>
								<div className="flex items-center gap-2 mt-1">
									{user.role === UserRole.SUPER_ADMIN ? (
										<ShieldCheck className="w-4 h-4 text-purple-600" />
									) : (
										<Shield className="w-4 h-4 text-blue-600" />
									)}
									<span
										className={`text-sm font-medium px-2 py-0.5 rounded ${user.role === UserRole.SUPER_ADMIN
											? "bg-purple-100 text-purple-700"
											: "bg-blue-100 text-blue-700"
											}`}
									>
										{user.role === UserRole.SUPER_ADMIN ? "Super Admin" : "Admin"}
									</span>
								</div>
							</div>
						</div>

						<div className="space-y-4">
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">
									Email Address
								</label>
								<div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-lg border border-gray-200">
									<Mail className="w-5 h-5 text-gray-400" />
									<span className="text-gray-900">{user.email}</span>
								</div>
								<p className="text-xs text-gray-500 mt-1">
									Email cannot be changed
								</p>
							</div>

							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">
									User ID
								</label>
								<div className="px-4 py-3 bg-gray-50 rounded-lg border border-gray-200">
									<span className="text-gray-600 font-mono text-sm">{user.id}</span>
								</div>
							</div>
						</div>
					</div>

					{/* Edit Profile Card */}
					<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
						<h3 className="text-lg font-semibold text-gray-900 mb-4">
							Edit Profile
						</h3>

						<div className="space-y-4">
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">
									Full Name
								</label>
								<input
									type="text"
									value={fullName}
									onChange={(e) => setFullName(e.target.value)}
									placeholder="Enter your full name"
									className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
								/>
							</div>

							<button
								onClick={handleUpdateProfile}
								className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
							>
								<Save className="w-4 h-4" />
								Save Changes
							</button>
						</div>
					</div>

					{/* Change Password Card */}
					<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
						<h3 className="text-lg font-semibold text-gray-900 mb-4">
							Change Password
						</h3>

						<div className="space-y-4">
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">
									Current Password
								</label>
								<div className="relative">
									<Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
									<input
										type="password"
										value={currentPassword}
										onChange={(e) => setCurrentPassword(e.target.value)}
										placeholder="Enter current password"
										className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
									/>
								</div>
							</div>

							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">
									New Password
								</label>
								<div className="relative">
									<Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
									<input
										type="password"
										value={newPassword}
										onChange={(e) => setNewPassword(e.target.value)}
										placeholder="Enter new password"
										className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
									/>
								</div>
							</div>

							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">
									Confirm New Password
								</label>
								<div className="relative">
									<Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
									<input
										type="password"
										value={confirmPassword}
										onChange={(e) => setConfirmPassword(e.target.value)}
										placeholder="Confirm new password"
										className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
									/>
								</div>
							</div>

							<button
								onClick={handleChangePassword}
								className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
							>
								<Lock className="w-4 h-4" />
								Change Password
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}