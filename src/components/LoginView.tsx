import React, { useState } from "react";
import { RefreshCw, User as UserIcon, Lock, Eye, EyeOff, ArrowRight, ShieldCheck } from "lucide-react";
import { User, UserRole } from "../types";

interface LoginViewProps {
  onLogin: (user: User) => void;
  availableUsers: User[];
}

export const LoginView: React.FC<LoginViewProps> = ({ onLogin, availableUsers }) => {
  const [username, setUsername] = useState("controller_admin_01");
  const [password, setPassword] = useState("autoassist_secret_pass");
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole>("ADMIN");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setErrorMsg("Please enter both username and password.");
      return;
    }

    // Match role to available user
    const matchedUser = availableUsers.find(u => u.role === selectedRole) || availableUsers[0];
    onLogin(matchedUser);
  };

  const handleQuickRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    if (role === "ADMIN") {
      setUsername("controller_admin_01");
    } else if (role === "MANAGER") {
      setUsername("manager_shaine");
    } else {
      setUsername("staff_andrew");
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#eef2f6] flex items-center justify-center p-4 sm:p-6 lg:p-8">
      {/* Container box matching mockup Image 1 */}
      <div 
        id="login-terminal-container"
        className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[620px] border border-slate-100"
      >
        {/* Left Hero side - dark automotive background */}
        <div className="lg:col-span-5 bg-gradient-to-b from-[#0f1723] via-[#09111c] to-[#04080e] p-8 sm:p-12 flex flex-col justify-between relative overflow-hidden text-white">
          {/* Subtle background glow & car silhouette texture */}
          <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#3be3b8_1px,transparent_1px)] [background-size:16px_16px]"></div>
          <div className="absolute -bottom-10 -right-10 w-96 h-96 rounded-full bg-[#3be3b8]/10 blur-3xl pointer-events-none"></div>

          {/* Automotive imagery overlay */}
          <div 
            className="absolute inset-x-0 bottom-0 h-1/2 opacity-25 pointer-events-none bg-cover bg-bottom mix-blend-screen"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&auto=format&fit=crop&q=80')`
            }}
          ></div>

          {/* Brand header */}
          <div className="relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-800/90 border border-slate-700 flex items-center justify-center text-[#3be3b8]">
                <RefreshCw className="w-5 h-5 text-[#3be3b8]" />
              </div>
              <span className="text-xl font-extrabold tracking-tight text-white">
                AutoAssist
              </span>
            </div>
          </div>

          {/* Hero text */}
          <div className="relative z-10 my-auto py-12">
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-[1.1] text-white">
              Orchestrate<br />
              Your <span className="text-[#3be3b8] font-black">Inventory</span><br />
              Flow.
            </h2>
            <p className="mt-6 text-sm text-slate-300 max-w-sm leading-relaxed font-normal">
              AI-Driven Inventory Optimization for high-performance automotive distribution networks. Scale faster with predictive analytics.
            </p>
          </div>

          {/* Left footer status */}
          <div className="relative z-10 flex items-center gap-2 text-[11px] text-slate-400 font-mono">
            <div className="w-2 h-2 rounded-full bg-[#3be3b8] animate-pulse"></div>
            <span>LOGISTICS NODE: ONLINE (ASIA-SE1)</span>
          </div>
        </div>

        {/* Right Form side - clean minimalist UI */}
        <div className="lg:col-span-7 bg-white p-8 sm:p-14 flex flex-col justify-between">
          <div>
            <div className="mb-8">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Welcome back
              </h3>
              <p className="text-sm text-slate-500 mt-1 font-medium">
                Enter your credentials to access the controller.
              </p>
            </div>

            {/* Role quick toggle for testing RBAC */}
            <div className="mb-6 bg-slate-50 p-1.5 rounded-2xl border border-slate-200/80">
              <div className="text-[10px] font-bold uppercase text-slate-400 px-2 py-1 tracking-wider">
                Select Persona (Role-Based Access)
              </div>
              <div className="grid grid-cols-3 gap-1.5">
                {(["ADMIN", "MANAGER", "STAFF"] as UserRole[]).map((role) => (
                  <button
                    key={role}
                    type="button"
                    onClick={() => handleQuickRoleSelect(role)}
                    className={`text-xs py-2 px-3 rounded-xl font-bold transition-all ${
                      selectedRole === role
                        ? "bg-slate-900 text-white shadow-sm"
                        : "text-slate-600 hover:bg-white hover:text-slate-900"
                    }`}
                  >
                    {role === "ADMIN" ? "Admin (CEO)" : role === "MANAGER" ? "Manager" : "Staff"}
                  </button>
                ))}
              </div>
            </div>

            {errorMsg && (
              <div className="mb-4 text-xs font-semibold text-rose-600 bg-rose-50 border border-rose-200 rounded-xl p-3">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSignIn} className="space-y-5">
              {/* Username field */}
              <div>
                <label className="block text-[11px] font-extrabold tracking-wider uppercase text-slate-500 mb-2">
                  Username
                </label>
                <div className="relative">
                  <UserIcon className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    id="login-username-input"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter terminal username"
                    className="w-full pl-10 pr-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900 font-medium text-slate-900 transition-all"
                  />
                </div>
              </div>

              {/* Password field */}
              <div>
                <label className="block text-[11px] font-extrabold tracking-wider uppercase text-slate-500 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    id="login-password-input"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter security key"
                    className="w-full pl-10 pr-11 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900 font-mono text-slate-900 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Sign In Button matching mockup */}
              <button
                id="btn-sign-in"
                type="submit"
                className="w-full py-3.5 px-4 bg-black hover:bg-slate-800 text-white font-bold rounded-xl text-sm transition-all duration-150 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl mt-2 cursor-pointer"
              >
                <span>Sign In</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>

          {/* Footer copyright matching mockup */}
          <div className="pt-6 border-t border-slate-100 text-center">
            <p className="text-[11px] text-slate-400 font-medium">
              © 2026 AutoAssist Logistics Corp. Secure Terminal v4.12.0
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
