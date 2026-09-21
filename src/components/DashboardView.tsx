import React, { useState } from "react";
import { 
  Zap, 
  Hourglass, 
  Sparkles, 
  ArrowRight, 
  TrendingUp, 
  ShieldCheck, 
  AlertTriangle,
  RotateCcw,
  PackageCheck,
  Plus,
  Filter,
  Package,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { InventoryItem, UserRole } from "../types";
import { REVENUE_MOMENTUM_DAYS, CRITICAL_STOCK_ITEMS, RECENT_ACTIVITY_TRANSACTIONS } from "../data/initialData";

interface DashboardViewProps {
  inventory: InventoryItem[];
  currentUserRole?: UserRole;
  onNavigateTab: (tab: "inventory" | "sales" | "reports" | "settings") => void;
  onQuickRestock: (sku: string) => void;
  onOpenRecommender: () => void;
  onOpenNewSale?: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  inventory,
  currentUserRole = "STAFF",
  onNavigateTab,
  onQuickRestock,
  onOpenRecommender,
  onOpenNewSale
}) => {
  const [activityFilter, setActivityFilter] = useState<"Today" | "Week" | "Month">("Today");
  const [momentumPeriod, setMomentumPeriod] = useState<"DAY" | "WEEK" | "MONTH">("WEEK");
  const [selectedDay, setSelectedDay] = useState<string>("WED");
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);

  // When in STAFF role, render the exact Staff Dashboard from mockup Image 1
  if (currentUserRole === "STAFF") {
    return (
      <div id="staff-dashboard-view" className="p-8 max-w-6xl mx-auto space-y-8 animate-in fade-in duration-300">
        {/* Top Action Button: + Create Sale matching mockup Image 1 */}
        <div className="flex items-center justify-between">
          <button
            id="btn-staff-create-sale"
            onClick={onOpenNewSale}
            className="px-5 py-2.5 bg-black hover:bg-slate-800 text-white font-bold text-xs rounded-xl flex items-center gap-2 shadow-sm transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4 text-white" />
            <span>Create Sale</span>
          </button>
        </div>

        {/* Recent Activity Card matching mockup Image 1 */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-7">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">
              Recent Activity
            </h3>

            <div className="flex items-center gap-3">
              {/* Today / Week / Month toggles */}
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-bold text-slate-500">
                {(["Today", "Week", "Month"] as const).map((period) => (
                  <button
                    key={period}
                    onClick={() => setActivityFilter(period)}
                    className={`px-3 py-1 rounded-lg transition-all ${
                      activityFilter === period
                        ? "bg-white text-slate-900 shadow-xs font-extrabold"
                        : "hover:text-slate-900"
                    }`}
                  >
                    {period}
                  </button>
                ))}
              </div>

              <button 
                className="w-8 h-8 rounded-xl border border-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition-colors"
                title="Filter activities"
              >
                <Filter className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Activity Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  <th className="pb-3 w-28"></th>
                  <th className="pb-3 px-4">Transaction ID</th>
                  <th className="pb-3 px-4">Customer / Item</th>
                  <th className="pb-3 px-4">Amount</th>
                  <th className="pb-3 px-4">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {RECENT_ACTIVITY_TRANSACTIONS.map((tx) => (
                  <tr key={tx.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3 pr-4">
                      <div className="w-20 h-16 rounded-xl overflow-hidden bg-slate-900 flex items-center justify-center border border-slate-200 shadow-xs">
                        {tx.imageUrl ? (
                          <img 
                            src={tx.imageUrl} 
                            alt={tx.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <Package className="w-6 h-6 text-slate-400" />
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-xs font-mono text-slate-400 font-semibold">
                      {tx.txId}
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-extrabold text-sm text-slate-900">{tx.title}</div>
                      <div className="text-xs font-medium text-sky-500 mt-0.5">{tx.client}</div>
                    </td>
                    <td className="py-3 px-4 text-sm font-extrabold text-slate-900">
                      {tx.amountFormatted}
                    </td>
                    <td className="py-3 px-4 text-xs text-slate-400 font-medium">
                      {tx.date}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Table pagination & counter */}
          <div className="flex items-center justify-between pt-5 mt-3 border-t border-slate-100 text-xs text-slate-400">
            <div>Showing <strong>5</strong> of <strong>1,280</strong> transactions</div>
            <div className="flex items-center gap-1">
              <button className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-slate-50 transition-colors">
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button className="w-7 h-7 rounded-lg bg-slate-900 text-white font-bold text-xs flex items-center justify-center shadow-xs">
                1
              </button>
              <button className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 text-xs font-bold transition-colors">
                2
              </button>
              <button className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-slate-50 transition-colors">
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Critical Stock Card matching mockup Image 1 */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-7 max-w-xl">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">
                Critical Stock
              </h3>
              <div className="text-[11px] font-black uppercase tracking-wider text-rose-500 mt-1">
                5 PRODUCTS NEED RESTOCKING
              </div>
            </div>

            <button 
              className="w-8 h-8 rounded-xl border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-800 hover:bg-slate-50 transition-colors"
              title="Filter critical stock"
            >
              <Filter className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  <th className="pb-3 px-2">Item</th>
                  <th className="pb-3 px-2">SKU</th>
                  <th className="pb-3 px-2">Qty</th>
                  <th className="pb-3 px-2 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {CRITICAL_STOCK_ITEMS.map((item) => (
                  <tr 
                    key={item.id} 
                    onClick={() => onQuickRestock(item.sku)}
                    className="hover:bg-slate-50 transition-colors cursor-pointer group"
                    title="Click to trigger restock flow"
                  >
                    <td className="py-3 px-2 font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                      {item.item}
                    </td>
                    <td className="py-3 px-2 font-mono text-slate-400 text-[11px]">
                      {item.sku}
                    </td>
                    <td className="py-3 px-2 font-extrabold text-slate-900">
                      {item.qty}
                    </td>
                    <td className="py-3 px-2 text-center">
                      <span 
                        className={`inline-block w-2.5 h-2.5 rounded-full ${
                          item.status === "CRITICAL" ? "bg-rose-500 ring-2 ring-rose-200" : "bg-amber-400 ring-2 ring-amber-100"
                        }`}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  // Fast moving items (+ velocity)
  const fastMovingItems = inventory
    .filter(item => item.velocityChangePercent > 0)
    .sort((a, b) => b.velocityChangePercent - a.velocityChangePercent)
    .slice(0, 2);

  // Stagnant items (- velocity)
  const stagnantItems = inventory
    .filter(item => item.velocityChangePercent < 0)
    .sort((a, b) => a.velocityChangePercent - b.velocityChangePercent)
    .slice(0, 2);

  return (
    <div id="dashboard-view" className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Top Banner or Notification if promo applied */}
      {appliedPromo && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <PackageCheck className="w-4 h-4 text-emerald-600" />
            <span><strong>Optimization Action Executed:</strong> 15% promotional flash discount applied to slow-moving SKU {appliedPromo}.</span>
          </div>
          <button 
            onClick={() => setAppliedPromo(null)}
            className="text-emerald-700 hover:text-emerald-900 font-bold"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Main Grid: 2 Column layout matching mockup Image 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left 8 columns: Revenue Momentum + Fast/Stagnant Assets */}
        <div className="lg:col-span-8 space-y-8">
          {/* Revenue Momentum Card */}
          <div className="bg-white rounded-3xl p-7 border border-slate-200/80 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div>
                <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                  Revenue Momentum
                </h3>
                <p className="text-xs text-slate-400 mt-1 font-medium">
                  Inventory sales performance across primary categories
                </p>
              </div>

              {/* Day / Week / Month toggles matching mockup */}
              <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-bold text-slate-500">
                {(["DAY", "WEEK", "MONTH"] as const).map((p) => (
                  <button
                    key={p}
                    onClick={() => setMomentumPeriod(p)}
                    className={`px-3 py-1.5 rounded-lg transition-all ${
                      momentumPeriod === p
                        ? "bg-black text-white shadow-sm"
                        : "hover:text-slate-900"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            {/* Bar Chart matching mockup - Wednesday highlighted in bright teal */}
            <div className="h-64 flex items-end justify-between gap-3 sm:gap-6 pt-6 pb-2 px-2 border-b border-slate-100">
              {REVENUE_MOMENTUM_DAYS.map((bar) => {
                const isSelected = selectedDay === bar.day;
                const isPeak = bar.day === "WED";

                return (
                  <div 
                    key={bar.day}
                    onClick={() => setSelectedDay(bar.day)}
                    className="flex-1 flex flex-col items-center gap-2 group cursor-pointer"
                  >
                    {/* Tooltip on hover/active */}
                    <div className={`text-[10px] font-bold px-2 py-1 rounded-md transition-all ${
                      isSelected || isPeak 
                        ? "bg-slate-900 text-white opacity-100 -translate-y-1" 
                        : "opacity-0 group-hover:opacity-100 bg-slate-200 text-slate-800"
                    }`}>
                      {bar.value}
                    </div>

                    {/* Bar visual */}
                    <div className="w-full max-w-[48px] bg-slate-100 rounded-t-xl overflow-hidden h-44 flex items-end">
                      <div
                        style={{ height: `${bar.heightPct}%` }}
                        className={`w-full rounded-t-xl transition-all duration-500 ${
                          isPeak
                            ? "bg-[#4ef0d0] shadow-md shadow-[#4ef0d0]/20"
                            : "bg-slate-200 group-hover:bg-slate-300"
                        }`}
                      ></div>
                    </div>

                    {/* Day label */}
                    <span className={`text-[11px] font-bold mt-1 uppercase ${
                      isPeak ? "text-slate-900 font-extrabold" : "text-slate-400 group-hover:text-slate-700"
                    }`}>
                      {bar.day}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="mt-4 flex items-center justify-between text-xs text-slate-400 font-medium">
              <span>Peak Day: Wednesday (₱78,900 Gross Sales)</span>
              <span className="text-[#0d9488] font-semibold flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5" />
                +24.8% vs last week average
              </span>
            </div>
          </div>

          {/* Bottom Dual Cards: FAST-MOVING ASSETS vs INVENTORY STAGNATION */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Fast-Moving Assets */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm">
              <div className="flex items-center justify-between mb-5">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-900">
                  Fast-Moving Assets
                </h4>
                <Zap className="w-4 h-4 text-[#3be3b8]" />
              </div>

              <div className="space-y-4">
                {fastMovingItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50/80 border border-slate-100 hover:bg-slate-100/80 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-slate-200 font-extrabold text-[10px] text-slate-700 flex items-center justify-center shrink-0">
                        {item.badgeCode || "PART"}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900 leading-tight">
                          {item.name}
                        </div>
                        <div className="text-[10px] text-slate-400 font-mono">
                          SKU: {item.sku}
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-xs font-black text-[#0d9488] block">
                        +{item.velocityChangePercent}%
                      </span>
                      <span className="text-[9px] font-bold text-slate-400 uppercase">
                        Vel.
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Inventory Stagnation */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm">
              <div className="flex items-center justify-between mb-5">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-900">
                  Inventory Stagnation
                </h4>
                <Hourglass className="w-4 h-4 text-slate-400" />
              </div>

              <div className="space-y-4">
                {stagnantItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50/80 border border-slate-100 hover:bg-slate-100/80 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-slate-200 font-extrabold text-[10px] text-slate-700 flex items-center justify-center shrink-0">
                        {item.badgeCode || "PART"}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900 leading-tight">
                          {item.name}
                        </div>
                        <div className="text-[10px] text-slate-400 font-mono">
                          SKU: {item.sku}
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-xs font-black text-rose-600 block">
                        {item.velocityChangePercent}%
                      </span>
                      <span className="text-[9px] font-bold text-slate-400 uppercase">
                        Vel.
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right 4 columns: Smart Insights Powered by AI matching mockup Image 2 */}
        <div className="lg:col-span-4">
          <div className="bg-[#121a24] rounded-3xl p-6 text-white shadow-xl border border-slate-800 space-y-6">
            {/* Header with Sparkles */}
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
              <div className="flex items-center gap-2.5">
                <Sparkles className="w-4 h-4 text-[#3be3b8]" />
                <h3 className="text-sm font-bold tracking-wide text-white">
                  Smart Insights
                </h3>
              </div>
              <span className="text-[10px] text-slate-400 font-medium">
                Powered by AI
              </span>
            </div>

            {/* Alert 1: Product Demand Alert */}
            <div className="bg-[#1a2533] rounded-2xl p-4 border border-slate-700/60 space-y-2">
              <div className="flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-wider text-[#3be3b8]">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>Product Demand Alert</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-medium">
                This product is expected to sell more soon based on past sales.
              </p>
              <button
                id="btn-demand-alert-restock"
                onClick={() => onQuickRestock("TRN-90128-DC")}
                className="pt-1 text-[11px] font-bold text-white hover:text-[#3be3b8] flex items-center gap-1.5 transition-colors group cursor-pointer"
              >
                <span>Order additional stock to avoid running out.</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Alert 2: Slow-Moving Products */}
            <div className="bg-[#1a2533] rounded-2xl p-4 border border-slate-700/60 space-y-2">
              <div className="flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-wider text-amber-400">
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Slow-Moving Products</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-medium">
                Some products are not selling quickly.
              </p>
              <button
                id="btn-slow-moving-discount"
                onClick={() => setAppliedPromo("EXH-PE-991")}
                className="pt-1 text-[11px] font-bold text-white hover:text-amber-400 flex items-center gap-1.5 transition-colors group cursor-pointer"
              >
                <span>Apply discounts or promotions to increase sales.</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Alert 3: Stock Transfer Suggestion */}
            <div className="bg-[#1a2533] rounded-2xl p-4 border border-slate-700/60 space-y-2">
              <div className="flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-wider text-sky-400">
                <PackageCheck className="w-3.5 h-3.5" />
                <span>Stock Transfer Suggestion</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-medium">
                Some products can be moved from another location if needed.
              </p>
              <button
                id="btn-review-transfer"
                onClick={() => onNavigateTab("reports")}
                className="pt-1 text-[11px] font-bold text-white hover:text-sky-400 flex items-center gap-1.5 transition-colors group cursor-pointer"
              >
                <span>Review and approve the transfer request.</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* System Health graphic matching mockup Image 2 */}
            <div className="pt-2">
              <div className="w-full h-24 rounded-2xl bg-gradient-to-tr from-slate-900 to-slate-800 flex items-center justify-center relative overflow-hidden border border-slate-700/40">
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#3be3b8_2px,transparent_2px)] [background-size:12px_12px] animate-pulse"></div>
                
                {/* Simulated neural nodes graphic */}
                <div className="flex items-center gap-6 relative z-10">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#3be3b8] shadow-lg shadow-[#3be3b8]/50"></div>
                  <div className="h-0.5 w-12 bg-gradient-to-r from-[#3be3b8] to-slate-600"></div>
                  <div className="w-3 h-3 rounded-full bg-[#3be3b8] animate-ping"></div>
                  <div className="h-0.5 w-12 bg-gradient-to-r from-slate-600 to-[#3be3b8]"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-[#3be3b8]"></div>
                </div>
              </div>

              <div className="mt-3 text-center">
                <span className="text-[10px] uppercase font-mono tracking-widest text-slate-400">
                  SYSTEM HEALTH: <strong className="text-[#3be3b8]">NOMINAL</strong>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
