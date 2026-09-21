import React from "react";
import { 
  LayoutDashboard, 
  Package, 
  Layers, 
  Truck, 
  Settings, 
  LogOut,
  Sparkles,
  RefreshCw
} from "lucide-react";
import { UserRole } from "../types";

export type NavTab = "dashboard" | "inventory" | "sales" | "reports" | "settings";

interface SidebarProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  currentUserRole: UserRole;
  onLogout: () => void;
  onOpenRecommender: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onTabChange,
  currentUserRole,
  onLogout,
  onOpenRecommender
}) => {
  const navItems = [
    {
      id: "dashboard" as NavTab,
      label: "Dashboard",
      icon: LayoutDashboard,
      allowedRoles: ["ADMIN", "MANAGER", "STAFF"]
    },
    {
      id: "inventory" as NavTab,
      label: "Inventory",
      icon: Package,
      allowedRoles: ["ADMIN", "MANAGER", "STAFF"]
    },
    {
      id: "sales" as NavTab,
      label: "Sales",
      icon: Layers,
      allowedRoles: ["ADMIN", "MANAGER", "STAFF"]
    },
    {
      id: "reports" as NavTab,
      label: "Reports",
      icon: Truck,
      allowedRoles: ["ADMIN", "MANAGER", "STAFF"]
    },
    {
      id: "settings" as NavTab,
      label: "Settings",
      icon: Settings,
      allowedRoles: ["ADMIN", "MANAGER", "STAFF"]
    }
  ];

  return (
    <aside 
      id="sidebar-navigation"
      className="w-64 min-h-screen bg-[#f3f5f8] border-r border-slate-200/80 flex flex-col justify-between py-6 px-4 select-none shrink-0"
    >
      <div>
        {/* Logo matching mockup */}
        <div className="flex items-center gap-3 px-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-[#0d1620] flex items-center justify-center text-[#3be3b8] shadow-sm">
            <RefreshCw className="w-5 h-5 text-[#3be3b8]" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-slate-900 tracking-tight leading-none">
              AutoAssist
            </h1>
            <span className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider">
              ML Inventory Core
            </span>
          </div>
        </div>

        {/* Navigation list */}
        <nav className="space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            const isPermitted = item.allowedRoles.includes(currentUserRole);

            return (
              <button
                key={item.id}
                id={`nav-${item.id}`}
                onClick={() => isPermitted && onTabChange(item.id)}
                disabled={!isPermitted}
                title={!isPermitted ? "Restricted for Staff role" : ""}
                className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-150 relative ${
                  isActive
                    ? "bg-white text-slate-900 font-semibold shadow-sm border-l-4 border-[#3be3b8]"
                    : isPermitted
                    ? "text-slate-500 hover:text-slate-900 hover:bg-white/60"
                    : "text-slate-300 cursor-not-allowed opacity-50"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-slate-900" : "text-slate-400"}`} />
                <span>{item.label}</span>
                {!isPermitted && (
                  <span className="ml-auto text-[9px] uppercase font-bold bg-slate-200 text-slate-500 px-1.5 py-0.5 rounded">
                    Admin
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* AI Quick Recommendation Recommender Widget */}
        <div className="mt-8 p-3.5 rounded-2xl bg-gradient-to-br from-[#0d1620] to-[#152332] text-white shadow-md">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-5 h-5 rounded-md bg-[#3be3b8]/20 flex items-center justify-center text-[#3be3b8]">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <span className="text-xs font-bold text-[#3be3b8] tracking-wide">
              ML Recommender
            </span>
          </div>
          <p className="text-[11px] text-slate-300 leading-relaxed mb-3">
            Predict customer parts compatibility and demand clustering with Scikit-learn & Gemini AI.
          </p>
          <button
            id="btn-open-ml-recommender"
            onClick={onOpenRecommender}
            className="w-full text-xs font-semibold py-2 px-3 rounded-lg bg-[#3be3b8] hover:bg-[#2dd4bf] text-slate-950 transition-colors flex items-center justify-center gap-1.5"
          >
            Launch ML Engine
          </button>
        </div>
      </div>

      {/* Footer logout */}
      <div className="pt-4 border-t border-slate-200/80">
        <button
          id="btn-logout"
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};
