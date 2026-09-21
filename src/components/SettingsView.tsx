import React, { useState } from "react";
import { 
  Users, 
  Settings as SettingsIcon, 
  Shield, 
  Plus, 
  MoreVertical, 
  CheckCircle2, 
  Camera, 
  Bell, 
  Database,
  Cpu,
  RefreshCw,
  Save
} from "lucide-react";
import { User, UserRole } from "../types";

interface SettingsViewProps {
  users: User[];
  currentUser: User;
  onOpenCreateUser: () => void;
  onUpdateUserRole: (userId: string, role: UserRole) => void;
  onToggleUserStatus: (userId: string) => void;
  onDeleteUser: (userId: string) => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  users,
  currentUser,
  onOpenCreateUser,
  onUpdateUserRole,
  onToggleUserStatus,
  onDeleteUser
}) => {
  const [autoRestockAlerts, setAutoRestockAlerts] = useState(true);
  const [activeMenuUserId, setActiveMenuUserId] = useState<string | null>(null);
  const [savedNotification, setSavedNotification] = useState(false);

  const handleSaveConfig = () => {
    setSavedNotification(true);
    setTimeout(() => setSavedNotification(false), 3000);
  };

  return (
    <div id="settings-view" className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Top Banner / Toast */}
      {savedNotification && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span><strong>System Configuration Saved:</strong> All access policies and alerts updated across nodes.</span>
          </div>
        </div>
      )}

      {/* Header section matching mockup Image 7 */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
            Admin / System Settings
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-0.5">
            Administrative Hub
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {}}
            className="px-5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors"
          >
            Discard Changes
          </button>
          <button
            id="btn-save-configuration"
            onClick={handleSaveConfig}
            className="px-6 py-2.5 rounded-xl bg-black hover:bg-slate-800 text-white font-extrabold text-xs shadow-md transition-colors cursor-pointer"
          >
            Save Configuration
          </button>
        </div>
      </div>

      {/* Main Grid matching mockup Image 4 & Image 7 */}
      {currentUser.role === "STAFF" ? (
        <div className="max-w-3xl">
          {/* Personal Profile Section matching mockup Image 4 for Staff */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm space-y-6">
            <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">
              Personal Profile
            </h3>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-7 pt-2">
              <div className="relative shrink-0">
                <img
                  src={currentUser.avatar || currentUser.avatarUrl || "/src/assets/images/andrew_ladignon_avatar_1789948072567.jpg"}
                  alt={currentUser.fullName}
                  className="w-24 h-24 rounded-2xl object-cover ring-2 ring-slate-100 shadow-xs"
                />
                <button 
                  className="absolute -bottom-2 -right-2 w-7 h-7 rounded-xl bg-black text-white flex items-center justify-center shadow-md hover:bg-slate-800 transition-colors"
                  title="Edit Avatar"
                >
                  <Camera className="w-3.5 h-3.5 text-white" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5 flex-1">
                <div>
                  <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Full Name</div>
                  <div className="text-sm font-extrabold text-slate-900 mt-1">{currentUser.fullName}</div>
                </div>

                <div>
                  <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Primary Role</div>
                  <div className="text-sm font-extrabold text-slate-900 mt-1">{currentUser.displayRole || "Staff"}</div>
                </div>

                <div>
                  <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Work Email</div>
                  <div className="text-sm font-extrabold text-slate-900 mt-1">{currentUser.email}</div>
                </div>

                <div>
                  <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Security Clearance</div>
                  <div className="text-sm font-extrabold text-[#0d9488] mt-1">
                    {currentUser.clearanceLevel || "L1"} Administrative
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left 8 columns: User Management Table */}
        <div className="lg:col-span-8 space-y-8">
          <div className="bg-white rounded-3xl p-7 border border-slate-200/80 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900 tracking-tight">
                  User Management
                </h3>
                <p className="text-xs text-slate-400 font-medium">
                  Manage administrative access and staff roles
                </p>
              </div>

              {/* Add New User button matching mockup */}
              <button
                id="btn-add-new-user"
                onClick={onOpenCreateUser}
                className="px-4 py-2 bg-[#3be3b8] hover:bg-[#2dd4bf] text-slate-950 font-black text-xs rounded-xl flex items-center gap-1.5 transition-colors shadow-sm cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ Add New User</span>
              </button>
            </div>

            {/* Users Table matching mockup Image 7 */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/50 text-slate-400 font-extrabold uppercase tracking-wider text-[10px]">
                    <th className="py-4 px-4">Member</th>
                    <th className="py-4 px-4">Role</th>
                    <th className="py-4 px-4">Status</th>
                    <th className="py-4 px-4">Last Active</th>
                    <th className="py-4 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {users.map((user) => (
                    <tr key={user.id} className="hover:bg-slate-50/80 transition-colors">
                      {/* Member */}
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          {(user.avatar || user.avatarUrl) ? (
                            <img
                              src={user.avatar || user.avatarUrl}
                              alt={user.fullName}
                              className="w-9 h-9 rounded-full object-cover ring-1 ring-slate-200"
                            />
                          ) : (
                            <div className="w-9 h-9 rounded-full bg-slate-900 text-white font-extrabold text-xs flex items-center justify-center">
                              {user.initials}
                            </div>
                          )}
                          <div>
                            <div className="font-bold text-slate-900 leading-snug">
                              {user.fullName}
                            </div>
                            <div className="text-[10px] text-slate-400">
                              {user.email}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Role */}
                      <td className="py-4 px-4">
                        <span className="inline-block px-2.5 py-1 bg-slate-100 text-slate-700 font-extrabold text-[10px] rounded-lg tracking-wider">
                          {user.displayRole.toUpperCase()}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-1.5">
                          <span className={`w-2 h-2 rounded-full ${
                            user.status === "Active" ? "bg-emerald-500" : "bg-slate-300"
                          }`}></span>
                          <span className={`text-xs font-semibold ${
                            user.status === "Active" ? "text-emerald-700" : "text-slate-500"
                          }`}>
                            {user.status}
                          </span>
                        </div>
                      </td>

                      {/* Last Active */}
                      <td className="py-4 px-4">
                        <span className="text-xs text-slate-500 font-medium">
                          {user.lastActive}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-4 text-right relative">
                        <button
                          onClick={() => setActiveMenuUserId(activeMenuUserId === user.id ? null : user.id)}
                          className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </button>

                        {activeMenuUserId === user.id && (
                          <div className="absolute right-4 mt-1 w-44 bg-white rounded-2xl shadow-xl border border-slate-100 py-1.5 z-30 text-left">
                            <div className="px-3 py-1 text-[9px] uppercase font-bold text-slate-400">
                              Role Assignment
                            </div>
                            <button
                              onClick={() => {
                                onUpdateUserRole(user.id, "ADMIN");
                                setActiveMenuUserId(null);
                              }}
                              className="w-full px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-50 font-medium"
                            >
                              Make Admin
                            </button>
                            <button
                              onClick={() => {
                                onUpdateUserRole(user.id, "MANAGER");
                                setActiveMenuUserId(null);
                              }}
                              className="w-full px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-50 font-medium"
                            >
                              Make Manager
                            </button>
                            <button
                              onClick={() => {
                                onUpdateUserRole(user.id, "STAFF");
                                setActiveMenuUserId(null);
                              }}
                              className="w-full px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-50 font-medium"
                            >
                              Make Staff
                            </button>
                            <div className="h-px bg-slate-100 my-1"></div>
                            <button
                              onClick={() => {
                                onToggleUserStatus(user.id);
                                setActiveMenuUserId(null);
                              }}
                              className="w-full px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-50 font-medium"
                            >
                              Toggle Active Status
                            </button>
                            {users.length > 1 && (
                              <button
                                onClick={() => {
                                  onDeleteUser(user.id);
                                  setActiveMenuUserId(null);
                                }}
                                className="w-full px-3 py-1.5 text-xs text-rose-600 hover:bg-rose-50 font-medium"
                              >
                                Revoke Account
                              </button>
                            )}
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Personal Profile Section matching mockup Image 7 */}
          <div className="bg-white rounded-3xl p-7 border border-slate-200/80 shadow-sm space-y-6">
            <h3 className="text-lg font-bold text-slate-900 tracking-tight">
              Personal Profile
            </h3>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div className="relative">
                <img
                  src={currentUser.avatar || currentUser.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80"}
                  alt={currentUser.fullName}
                  className="w-20 h-20 rounded-2xl object-cover ring-2 ring-slate-100"
                />
                <button className="absolute -bottom-1.5 -right-1.5 w-7 h-7 rounded-xl bg-black text-white flex items-center justify-center shadow-md">
                  <Camera className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
                <div>
                  <div className="text-[10px] uppercase font-bold text-slate-400">Full Name</div>
                  <div className="text-sm font-bold text-slate-900 mt-0.5">{currentUser.fullName}</div>
                </div>

                <div>
                  <div className="text-[10px] uppercase font-bold text-slate-400">Primary Role</div>
                  <div className="text-sm font-bold text-slate-900 mt-0.5">{currentUser.displayRole}</div>
                </div>

                <div>
                  <div className="text-[10px] uppercase font-bold text-slate-400">Work Email</div>
                  <div className="text-sm font-bold text-slate-900 mt-0.5">{currentUser.email}</div>
                </div>

                <div>
                  <div className="text-[10px] uppercase font-bold text-slate-400">Security Clearance</div>
                  <div className="text-sm font-extrabold text-[#0d9488] mt-0.5">
                    {currentUser.clearanceLevel || "L3"} Administrative
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right 4 columns: System Config Card matching mockup Image 7 */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-3xl p-7 border border-slate-200/80 shadow-sm space-y-6">
            <h3 className="text-lg font-bold text-slate-900 tracking-tight">
              System Config
            </h3>

            {/* Option matching mockup: Automatic Restock Alerts */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-xs font-bold text-slate-900">
                    Automatic Restock Alerts
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                    Ping the procurement team when stock hits critical thresholds.
                  </p>
                </div>

                {/* Toggle switch */}
                <button
                  type="button"
                  onClick={() => setAutoRestockAlerts(!autoRestockAlerts)}
                  className={`w-11 h-6 rounded-full p-0.5 transition-colors shrink-0 ${
                    autoRestockAlerts ? "bg-[#3be3b8]" : "bg-slate-300"
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white transition-transform ${
                      autoRestockAlerts ? "translate-x-5" : "translate-x-0"
                    }`}
                  ></div>
                </button>
              </div>
            </div>

            {/* AI Optimization Model Config */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                <Cpu className="w-4 h-4 text-[#0d9488]" />
                <span>ML Pipeline & Gemini API</span>
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Uses Gemini 2.5 Flash on server-side `/api/ai/*` to analyze inventory velocity and generate prescriptive supplier orders.
              </p>
              <div className="flex items-center justify-between text-[11px] text-slate-600 font-mono pt-1">
                <span>Model: gemini-2.5-flash</span>
                <span className="text-emerald-600 font-bold">READY</span>
              </div>
            </div>

            {/* SME Database Engine */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                <Database className="w-4 h-4 text-slate-500" />
                <span>Local SME Data Store</span>
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Real-time synchronized data store supporting inventory metrics, order dispatches, and warehouse manifests.
              </p>
            </div>
          </div>
        </div>
      </div>
      )}
    </div>
  );
};
