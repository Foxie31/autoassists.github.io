import React, { useState } from "react";
import { Search, Bell, History, Shield, ChevronDown, Check, UserCircle } from "lucide-react";
import { User } from "../types";

interface TopBarProps {
  currentUser: User;
  allUsers: User[];
  onSwitchUser: (user: User) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  notificationCount?: number;
}

export const TopBar: React.FC<TopBarProps> = ({
  currentUser,
  allUsers,
  onSwitchUser,
  searchTerm,
  onSearchChange,
  notificationCount = 3
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header 
      id="top-navigation-bar"
      className="h-16 bg-white/80 backdrop-blur-md border-b border-slate-200/80 px-8 flex items-center justify-between sticky top-0 z-20"
    >
      {/* Search Input matching mockup */}
      <div className="relative w-96">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          id="global-search-input"
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search inventory, SKU, or work orders..."
          className="w-full pl-10 pr-4 py-2 text-xs bg-slate-100/90 border border-slate-200/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3be3b8] focus:bg-white text-slate-800 placeholder:text-slate-400 font-medium transition-all"
        />
      </div>

      {/* Right side controls: Notifications, History, User badge */}
      <div className="flex items-center gap-5">
        {/* Notifications toggle */}
        <div className="relative">
          <button
            id="btn-notifications"
            onClick={() => setShowNotifications(!showNotifications)}
            className="w-9 h-9 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-900 transition-colors relative"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            {notificationCount > 0 && (
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white"></span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-slate-100 p-4 z-50 animate-in fade-in slide-in-from-top-2">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-900">System Notifications</span>
                <span className="text-[10px] bg-[#3be3b8]/20 text-slate-800 font-bold px-1.5 py-0.5 rounded">3 New</span>
              </div>
              <div className="space-y-3 pt-3">
                <div className="text-xs p-2.5 rounded-xl bg-rose-50 border border-rose-100 text-rose-900">
                  <span className="font-bold block text-[11px] text-rose-700">Stockout Warning</span>
                  Dual Clutch Module (TRN-90128-DC) is at 8 units. Reorder point is 15.
                </div>
                <div className="text-xs p-2.5 rounded-xl bg-amber-50 border border-amber-100 text-amber-900">
                  <span className="font-bold block text-[11px] text-amber-700">Delayed Shipment</span>
                  Shipment #AS-90388 to Seattle Service Center delayed 24hrs.
                </div>
                <div className="text-xs p-2.5 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-900">
                  <span className="font-bold block text-[11px] text-emerald-700">ML Forecast Refreshed</span>
                  July demand projection updated with 96% confidence score.
                </div>
              </div>
            </div>
          )}
        </div>

        {/* History icon */}
        <button
          id="btn-history-logs"
          className="w-9 h-9 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-900 transition-colors"
          title="Audit Trail & System History"
        >
          <History className="w-4 h-4" />
        </button>

        {/* Role Switcher & User Profile matching mockup */}
        <div className="relative">
          <button
            id="user-profile-menu-button"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-3 pl-3 pr-2 py-1.5 rounded-xl hover:bg-slate-100 transition-colors border border-transparent hover:border-slate-200"
          >
            <div className="text-right">
              <div className="text-xs font-extrabold text-slate-900 tracking-tight leading-tight uppercase">
                {currentUser.fullName}
              </div>
              <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide">
                {currentUser.displayRole}
              </div>
            </div>

            {(currentUser.avatar || currentUser.avatarUrl) ? (
              <img
                src={currentUser.avatar || currentUser.avatarUrl}
                alt={currentUser.fullName}
                className="w-8 h-8 rounded-full object-cover ring-2 ring-slate-200"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center ring-2 ring-slate-200">
                {currentUser.initials}
              </div>
            )}
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {/* Switch Role / User Dropdown for testing RBAC */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-100 p-2 z-50">
              <div className="px-3 py-2 border-b border-slate-100 mb-1">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
                  Switch Active Role (RBAC)
                </span>
                <span className="text-xs text-slate-600">Test different permissions</span>
              </div>

              {allUsers.map((user) => (
                <button
                  key={user.id}
                  onClick={() => {
                    onSwitchUser(user);
                    setIsDropdownOpen(false);
                  }}
                  className={`w-full flex items-center justify-between p-2 rounded-xl text-left text-xs transition-colors ${
                    currentUser.id === user.id ? "bg-slate-100 font-semibold" : "hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-slate-200 text-slate-700 font-bold text-[10px] flex items-center justify-center">
                      {user.initials}
                    </div>
                    <div>
                      <div className="font-bold text-slate-800">{user.fullName}</div>
                      <div className="text-[10px] text-slate-400 flex items-center gap-1">
                        <Shield className="w-2.5 h-2.5 text-[#3be3b8]" />
                        <span>{user.role} ({user.displayRole})</span>
                      </div>
                    </div>
                  </div>
                  {currentUser.id === user.id && (
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
