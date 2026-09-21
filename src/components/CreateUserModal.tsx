import React, { useState } from "react";
import { User as UserIcon, Shield, Briefcase, Eye, EyeOff, Check, X } from "lucide-react";
import { User, UserRole, SecurityClearance } from "../types";

interface CreateUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateUser: (newUser: Omit<User, "id">) => void;
}

export const CreateUserModal: React.FC<CreateUserModalProps> = ({
  isOpen,
  onClose,
  onCreateUser
}) => {
  if (!isOpen) return null;

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [selectedRole, setSelectedRole] = useState<UserRole>("STAFF");
  const [clearanceLevel, setClearanceLevel] = useState<SecurityClearance>("L1");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim()) {
      setErrorMsg("Please provide both name and email address.");
      return;
    }
    if (password && password !== confirmPassword) {
      setErrorMsg("Passwords do not match.");
      return;
    }

    const initials = fullName
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);

    const displayRole = selectedRole === "ADMIN" ? "Admin" : selectedRole === "MANAGER" ? "Manager" : "Staff";

    onCreateUser({
      fullName,
      email,
      role: selectedRole,
      displayRole,
      status: isActive ? "Active" : "Offline",
      lastActive: "Just now",
      initials,
      clearanceLevel
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in">
      <div 
        id="create-user-modal"
        className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden my-6"
      >
        {/* Header matching mockup Image 8 */}
        <div className="p-8 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Create New User Account
            </h2>
            <p className="text-xs text-slate-400 mt-1 font-medium">
              Configure administrative access and operational roles for new team members.
            </p>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        {errorMsg && (
          <div className="mx-8 mt-4 p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold rounded-xl">
            {errorMsg}
          </div>
        )}

        {/* Body matching mockup Image 8 */}
        <form onSubmit={handleSubmit} className="p-8 space-y-8 max-h-[75vh] overflow-y-auto">
          {/* Section 1: User Information */}
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-900">
                User Information
              </span>

              {/* Status active toggle */}
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-extrabold uppercase text-slate-400">
                  STATUS: {isActive ? "ACTIVE" : "OFFLINE"}
                </span>
                <button
                  type="button"
                  onClick={() => setIsActive(!isActive)}
                  className={`w-10 h-5 rounded-full p-0.5 transition-colors ${
                    isActive ? "bg-[#3be3b8]" : "bg-slate-300"
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-white transition-transform ${
                      isActive ? "translate-x-5" : "translate-x-0"
                    }`}
                  ></div>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-extrabold uppercase text-slate-400 tracking-wider mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Marcus Thorne"
                  className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900 font-medium text-slate-900"
                />
              </div>

              <div>
                <label className="block text-[11px] font-extrabold uppercase text-slate-400 tracking-wider mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. m.thorne@autoassist.ai"
                  className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900 font-medium text-slate-900"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-extrabold uppercase text-slate-400 tracking-wider mb-1.5">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••"
                  className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900 font-mono text-slate-900"
                />
              </div>

              <div>
                <label className="block text-[11px] font-extrabold uppercase text-slate-400 tracking-wider mb-1.5">
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••••"
                  className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900 font-mono text-slate-900"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Role Selection & Permissions matching mockup Image 8 */}
          <div className="space-y-3">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-900">
              Role Selection & Permissions
            </label>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Staff Card */}
              <div
                onClick={() => setSelectedRole("STAFF")}
                className={`p-5 rounded-2xl border-2 transition-all cursor-pointer relative ${
                  selectedRole === "STAFF"
                    ? "border-[#3be3b8] bg-[#f2fbf8]"
                    : "border-slate-200 bg-white hover:border-slate-300"
                }`}
              >
                {selectedRole === "STAFF" && (
                  <div className="absolute top-4 right-4 w-5 h-5 rounded-full bg-[#3be3b8] text-slate-950 flex items-center justify-center">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                )}
                <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700 mb-3">
                  <UserIcon className="w-4 h-4" />
                </div>
                <div className="font-extrabold text-slate-900 text-sm">Staff</div>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Inventory tracking, sales entry, and basic analytics reporting.
                </p>
              </div>

              {/* Manager Card */}
              <div
                onClick={() => setSelectedRole("MANAGER")}
                className={`p-5 rounded-2xl border-2 transition-all cursor-pointer relative ${
                  selectedRole === "MANAGER"
                    ? "border-[#3be3b8] bg-[#f2fbf8]"
                    : "border-slate-200 bg-white hover:border-slate-300"
                }`}
              >
                {selectedRole === "MANAGER" && (
                  <div className="absolute top-4 right-4 w-5 h-5 rounded-full bg-[#3be3b8] text-slate-950 flex items-center justify-center">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                )}
                <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700 mb-3">
                  <Briefcase className="w-4 h-4" />
                </div>
                <div className="font-extrabold text-slate-900 text-sm">Manager</div>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Optimization overrides, team scheduling, and financial reports.
                </p>
              </div>

              {/* Admin Card */}
              <div
                onClick={() => setSelectedRole("ADMIN")}
                className={`p-5 rounded-2xl border-2 transition-all cursor-pointer relative ${
                  selectedRole === "ADMIN"
                    ? "border-[#3be3b8] bg-[#f2fbf8]"
                    : "border-slate-200 bg-white hover:border-slate-300"
                }`}
              >
                {selectedRole === "ADMIN" && (
                  <div className="absolute top-4 right-4 w-5 h-5 rounded-full bg-[#3be3b8] text-slate-950 flex items-center justify-center">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                )}
                <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700 mb-3">
                  <Shield className="w-4 h-4" />
                </div>
                <div className="font-extrabold text-slate-900 text-sm">Admin</div>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Full system configuration, user management, and API access.
                </p>
              </div>
            </div>
          </div>

          {/* Section 3: Security Clearance Level matching mockup Image 8 */}
          <div className="space-y-3 pt-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-900">
                  Security Clearance Level
                </label>
                <p className="text-xs text-slate-400 mt-0.5">
                  Defines the sensitivity of data accessible to this user.
                </p>
              </div>

              <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl">
                {(["L1", "L2", "L3"] as SecurityClearance[]).map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setClearanceLevel(lvl)}
                    className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${
                      clearanceLevel === lvl
                        ? "bg-black text-white shadow-sm"
                        : "text-slate-500 hover:text-slate-900"
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Footer buttons matching mockup */}
          <div className="pt-6 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-8 py-2.5 bg-black hover:bg-slate-800 text-white font-extrabold text-xs rounded-xl shadow-md transition-colors cursor-pointer"
            >
              Create User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
