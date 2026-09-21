import React, { useState } from "react";
import { 
  ShoppingBag, 
  DollarSign, 
  Clock, 
  AlertCircle, 
  ChevronDown, 
  TrendingUp, 
  Sparkles, 
  AlertTriangle,
  ArrowRight,
  Calendar,
  Layers,
  CheckCircle2,
  Package,
  Plus,
  Filter,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { MonthlySalesPoint, DemandForecastDataPoint, InventoryItem, SalesRecord, UserRole } from "../types";
import { INITIAL_SALES_POINTS, DEMAND_FORECAST_POINTS, RECENT_ACTIVITY_TRANSACTIONS } from "../data/initialData";

interface SalesViewProps {
  currentUserRole?: UserRole;
  salesPoints?: MonthlySalesPoint[];
  forecastPoints?: DemandForecastDataPoint[];
  inventory: InventoryItem[];
  recentSales?: SalesRecord[];
  onOpenNewSale: () => void;
  onQuickRestock: (sku: string) => void;
  onOpenRecommender: () => void;
}

export const SalesView: React.FC<SalesViewProps> = ({
  currentUserRole = "STAFF",
  salesPoints = INITIAL_SALES_POINTS,
  forecastPoints = DEMAND_FORECAST_POINTS,
  inventory,
  recentSales = [],
  onOpenNewSale,
  onQuickRestock,
  onOpenRecommender
}) => {
  const [selectedRange, setSelectedRange] = useState("Jan - Oct 2026");
  const [activeTooltipMonth, setActiveTooltipMonth] = useState<string>("APR");
  const [forecastHorizon, setForecastHorizon] = useState<"30" | "60" | "90">("30");
  const [showBreakdownModal, setShowBreakdownModal] = useState(false);
  const [activityFilter, setActivityFilter] = useState<"Today" | "Week" | "Month">("Today");

  // When in STAFF role, render the exact Staff Sales Management view from mockup Image 3
  if (currentUserRole === "STAFF") {
    return (
      <div id="staff-sales-management-view" className="p-8 max-w-6xl mx-auto space-y-8 animate-in fade-in duration-300">
        {/* Header section matching mockup Image 3 */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Sales Management
            </h2>
            <p className="text-xs text-slate-400 mt-1 font-medium">
              Real-time performance metrics and transaction orchestration.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 border border-slate-200 rounded-xl text-xs font-bold text-slate-700">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>This Week</span>
            </div>

            <button
              id="btn-staff-sales-create-sale"
              onClick={onOpenNewSale}
              className="px-5 py-2.5 bg-black hover:bg-slate-800 text-white font-bold text-xs rounded-xl flex items-center gap-2 shadow-sm transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4 text-white" />
              <span>Create Sale</span>
            </button>
          </div>
        </div>

        {/* Recent Activity Card matching mockup Image 3 */}
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

          {/* Activity Table with Status matching Image 3 */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  <th className="pb-3 px-4">Transaction ID</th>
                  <th className="pb-3 px-4">Customer / Item</th>
                  <th className="pb-3 px-4">Amount</th>
                  <th className="pb-3 px-4">Status</th>
                  <th className="pb-3 px-4">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {RECENT_ACTIVITY_TRANSACTIONS.map((tx) => (
                  <tr key={tx.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-4 px-4 text-xs font-mono text-slate-500 font-semibold">
                      {tx.txId}
                    </td>
                    <td className="py-4 px-4">
                      <div className="font-extrabold text-sm text-slate-900">{tx.title}</div>
                      <div className="text-xs font-medium text-slate-400 mt-0.5">{tx.client}</div>
                    </td>
                    <td className="py-4 px-4 text-sm font-extrabold text-slate-900">
                      {tx.amountFormatted}
                    </td>
                    <td className="py-4 px-4">
                      {tx.status === "COMPLETED" && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-[#3be3b8]/20 text-[#0d9488]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#0d9488]"></span>
                          COMPLETED
                        </span>
                      )}
                      {tx.status === "PENDING" && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-slate-100 text-slate-600">
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-500"></span>
                          PENDING
                        </span>
                      )}
                      {tx.status === "CANCELLED" && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-rose-50 text-rose-600">
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                          CANCELLED
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-4 text-xs text-slate-400 font-medium">
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
      </div>
    );
  }

  // SVG dimensions for Total Sales Velocity line chart
  const svgWidth = 850;
  const svgHeight = 220;
  const paddingX = 40;
  const paddingY = 40;

  const maxRevenue = Math.max(...salesPoints.map(p => p.revenuePHP), 200000);
  const minRevenue = 60000;

  // Calculate coordinates
  const points = salesPoints.map((p, index) => {
    const x = paddingX + (index / (salesPoints.length - 1)) * (svgWidth - paddingX * 2);
    const y = svgHeight - paddingY - ((p.revenuePHP - minRevenue) / (maxRevenue - minRevenue)) * (svgHeight - paddingY * 2);
    return { ...p, x, y };
  });

  // Construct smooth SVG path
  const pathD = points.reduce((acc, point, i, arr) => {
    if (i === 0) return `M ${point.x} ${point.y}`;
    const prev = arr[i - 1];
    const cpx1 = prev.x + (point.x - prev.x) / 2;
    const cpy1 = prev.y;
    const cpx2 = prev.x + (point.x - prev.x) / 2;
    const cpy2 = point.y;
    return `${acc} C ${cpx1} ${cpy1}, ${cpx2} ${cpy2}, ${point.x} ${point.y}`;
  }, "");

  // Area under curve
  const areaD = `${pathD} L ${points[points.length - 1].x} ${svgHeight - paddingY} L ${points[0].x} ${svgHeight - paddingY} Z`;

  const activePoint = points.find(p => p.month === activeTooltipMonth) || points[3];

  return (
    <div id="sales-management-view" className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Header section matching mockup Image 5 */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Sales Management
          </h2>
          <p className="text-xs text-slate-400 mt-1 font-medium">
            Real-time performance metrics and transaction orchestration.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 border border-slate-200 rounded-xl text-xs font-bold text-slate-700">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span>This Week</span>
          </div>

          <button
            id="btn-record-sale"
            onClick={onOpenNewSale}
            className="px-5 py-2.5 bg-black hover:bg-slate-800 text-white font-extrabold text-xs rounded-xl flex items-center gap-2 shadow-sm transition-colors cursor-pointer"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-[#3be3b8]" />
            <span>+ Record Sale</span>
          </button>
        </div>
      </div>

      {/* 4 Stat Cards matching mockup Image 5 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Card 1: Total Orders */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm relative">
          <div className="flex items-start justify-between">
            <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-extrabold text-[#0d9488] bg-[#3be3b8]/20 px-2 py-0.5 rounded-full">
              +1.5%
            </span>
          </div>
          <div className="mt-4">
            <div className="text-[10px] uppercase font-extrabold text-slate-400 tracking-wider">
              Total Orders
            </div>
            <div className="text-3xl font-black text-slate-900 mt-0.5">
              387
            </div>
            <div className="text-[11px] text-slate-400 font-medium mt-1">
              Compared to last month
            </div>
          </div>
        </div>

        {/* Card 2: Total Revenue */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm relative">
          <div className="flex items-start justify-between">
            <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700">
              <DollarSign className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-extrabold text-[#0d9488] bg-[#3be3b8]/20 px-2 py-0.5 rounded-full">
              +12%
            </span>
          </div>
          <div className="mt-4">
            <div className="text-[10px] uppercase font-extrabold text-slate-400 tracking-wider">
              Total Revenue
            </div>
            <div className="text-3xl font-black text-slate-900 mt-0.5">
              ₱380,260
            </div>
            <div className="text-[11px] text-slate-400 font-medium mt-1">
              Compared to last month
            </div>
          </div>
        </div>

        {/* Card 3: Delayed Orders */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm relative">
          <div className="flex items-start justify-between">
            <div className="w-9 h-9 rounded-xl bg-rose-50 flex items-center justify-center text-rose-600">
              <Clock className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-extrabold text-rose-600 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-full">
              -18%
            </span>
          </div>
          <div className="mt-4">
            <div className="text-[10px] uppercase font-extrabold text-slate-400 tracking-wider">
              Delayed Orders
            </div>
            <div className="text-3xl font-black text-slate-900 mt-0.5">
              45
            </div>
            <div className="text-[11px] text-slate-400 font-medium mt-1">
              Compared to last month
            </div>
          </div>
        </div>

        {/* Card 4: Active Restock Alerts */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm relative">
          <div className="flex items-start justify-between">
            <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700">
              <AlertCircle className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-extrabold text-[#0d9488] bg-[#3be3b8]/20 px-2 py-0.5 rounded-full">
              +5%
            </span>
          </div>
          <div className="mt-4">
            <div className="text-[10px] uppercase font-extrabold text-slate-400 tracking-wider">
              Active Restock Alerts
            </div>
            <div className="text-3xl font-black text-slate-900 mt-0.5">
              12
            </div>
            <div className="text-[11px] text-slate-400 font-medium mt-1">
              Compared to last month
            </div>
          </div>
        </div>
      </div>

      {/* Total Sales Velocity Chart Section matching mockup Image 5 */}
      <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-lg font-bold text-slate-900 tracking-tight">
              Total Sales Velocity
            </h3>
            <p className="text-xs text-slate-400 font-medium">
              Monthly revenue flows and AI projected growth.
            </p>
          </div>

          <div className="relative">
            <select
              value={selectedRange}
              onChange={(e) => setSelectedRange(e.target.value)}
              className="appearance-none pl-3 pr-8 py-1.5 bg-slate-100 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 focus:outline-none cursor-pointer"
            >
              <option value="Jan - Oct 2026">Jan - Oct 2026</option>
              <option value="Q3 - Q4 2026">Q3 - Q4 2026</option>
              <option value="Full Year 2026">Full Year 2026</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* SVG Curve Chart */}
        <div className="relative overflow-x-auto">
          <div className="min-w-[700px] relative">
            {/* Tooltip mockup matching exact visual from Image 5 (April 2026) */}
            {activePoint && (
              <div 
                className="absolute z-20 bg-slate-900 text-white rounded-2xl p-3 shadow-xl pointer-events-none border border-slate-800 -translate-x-1/2 -translate-y-full mb-3"
                style={{
                  left: `${activePoint.x}px`,
                  top: `${activePoint.y}px`
                }}
              >
                <div className="text-[9px] font-extrabold uppercase tracking-wider text-slate-400">
                  {activePoint.label.toUpperCase()}
                </div>
                <div className="text-sm font-black text-[#3be3b8]">
                  ₱{activePoint.revenuePHP.toLocaleString()}
                </div>
                <div className="text-[9px] text-slate-300 font-medium">
                  Net cashflow
                </div>
              </div>
            )}

            <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-56 overflow-visible">
              <defs>
                <linearGradient id="velocityGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3be3b8" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#3be3b8" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Grid lines */}
              <line x1={paddingX} y1={svgHeight - paddingY} x2={svgWidth - paddingX} y2={svgHeight - paddingY} stroke="#f1f5f9" strokeWidth="1" />
              <line x1={paddingX} y1={paddingY} x2={svgWidth - paddingX} y2={paddingY} stroke="#f1f5f9" strokeWidth="1" strokeDasharray="4 4" />

              {/* Shaded Area */}
              <path d={areaD} fill="url(#velocityGradient)" />

              {/* Smooth Stroke Line */}
              <path d={pathD} fill="none" stroke="#0d9488" strokeWidth="3" strokeLinecap="round" />

              {/* Data points */}
              {points.map((p) => {
                const isActive = p.month === activeTooltipMonth;
                return (
                  <g key={p.month} className="cursor-pointer" onClick={() => setActiveTooltipMonth(p.month)}>
                    <circle
                      cx={p.x}
                      cy={p.y}
                      r={isActive ? "6" : "4"}
                      fill={isActive ? "#0d9488" : "#ffffff"}
                      stroke="#0d9488"
                      strokeWidth={isActive ? "3" : "2"}
                      className="transition-all hover:scale-125"
                    />
                    <text
                      x={p.x}
                      y={svgHeight - 12}
                      textAnchor="middle"
                      className={`text-[10px] font-extrabold uppercase ${
                        isActive ? "fill-slate-900 font-black" : "fill-slate-400"
                      }`}
                    >
                      {p.month}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>
      </div>

      {/* Bottom Dual Section: Left (Projected Impact + AI Insight) & Right (Demand Forecasting) matching mockup Image 5 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Projected Impact + AI Insight */}
        <div className="lg:col-span-5 space-y-6">
          {/* Projected Impact Card matching mockup */}
          <div className="bg-[#121c27] rounded-3xl p-7 text-white shadow-xl border border-slate-800 space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-extrabold tracking-wider text-slate-400">
                Projected Impact
              </span>
              <span className="text-[10px] font-extrabold bg-slate-800 text-slate-300 px-2 py-0.5 rounded-md">
                Monthly
              </span>
            </div>

            <div>
              <div className="text-[10px] uppercase font-bold text-slate-400">
                Potential Revenue Gain
              </div>
              <div className="text-3xl font-black text-[#3be3b8] mt-0.5">
                +₱423,200
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800/80">
              <div className="text-[10px] uppercase font-bold text-slate-400">
                Stockout Reduction
              </div>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-2xl font-black text-white">-22%</span>
                <span className="text-[9px] font-extrabold bg-rose-600/90 text-white px-2 py-0.5 rounded uppercase tracking-wider">
                  Critical
                </span>
              </div>
            </div>

            <div className="pt-2">
              <div className="flex items-center justify-between text-xs font-semibold mb-2">
                <span className="text-slate-400 text-[11px]">Optimization Confidence</span>
                <span className="text-[#3be3b8] font-bold">96%</span>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div className="bg-gradient-to-r from-[#0d9488] to-[#3be3b8] h-full rounded-full w-[96%]"></div>
              </div>
            </div>
          </div>

          {/* AI Insight Card matching mockup */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-xl bg-[#3be3b8]/20 flex items-center justify-center text-[#0d9488]">
                <Sparkles className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-900">
                AI Insight
              </h4>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              Catalytic converter demand is peaking in Branch B due to local fleet maintenance cycles. Current inventory is misaligned with regional velocity.
            </p>

            <button
              onClick={onOpenRecommender}
              className="text-xs font-bold text-[#0d9488] hover:text-[#0f766e] flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>Run Automated ML Rebalancer</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Right Column: Demand Forecasting Section matching mockup Image 5 */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900 tracking-tight">
                  Demand Forecasting
                </h3>
                <p className="text-xs text-slate-400 font-medium">
                  Projected vs. Current Stock (Next 30 Days)
                </p>
              </div>

              {/* Chart Legend matching mockup */}
              <div className="flex items-center gap-4 text-xs font-semibold text-slate-500">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-900"></span>
                  <span>Current Stock</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#3be3b8]"></span>
                  <span>Projected Demand</span>
                </div>
              </div>
            </div>

            {/* Stepped/Overlay Forecast Chart */}
            <div className="h-64 pt-6 px-4 border-b border-slate-100 flex items-end justify-between gap-4">
              {forecastPoints.map((fp, i) => {
                const stockHeightPct = Math.round((fp.currentStock / 200) * 100);
                const demandHeightPct = Math.round((fp.projectedDemand / 200) * 100);

                return (
                  <div key={fp.week} className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-full flex items-end justify-center gap-2 h-44">
                      {/* Current Stock Bar */}
                      <div 
                        style={{ height: `${stockHeightPct}%` }}
                        className="w-1/2 bg-slate-800 rounded-t-lg transition-all"
                        title={`Current Stock: ${fp.currentStock} units`}
                      ></div>
                      {/* Projected Demand Bar */}
                      <div 
                        style={{ height: `${demandHeightPct}%` }}
                        className="w-1/2 bg-[#3be3b8] rounded-t-lg transition-all"
                        title={`Projected Demand: ${fp.projectedDemand} units`}
                      ></div>
                    </div>

                    <span className="text-[10px] font-extrabold text-slate-500 uppercase mt-2">
                      {fp.week}
                    </span>
                    <span className="text-[9px] text-slate-400 font-medium">
                      {fp.label}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Alert Pill Banner matching mockup Image 5 */}
            <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200/80 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-rose-900 font-semibold">
                <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>Critical Stockout Predicted: <strong>July 15th</strong></span>
              </div>

              <button
                id="btn-view-stockout-breakdown"
                onClick={() => setShowBreakdownModal(true)}
                className="font-extrabold text-slate-900 hover:text-rose-600 transition-colors cursor-pointer"
              >
                View Breakdown
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Breakdown Modal */}
      {showBreakdownModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div className="w-full max-w-xl bg-white rounded-3xl shadow-2xl p-6 space-y-5 border border-slate-100">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-rose-600" />
                <h3 className="text-lg font-bold text-slate-900">Predictive Stockout Breakdown</h3>
              </div>
              <button onClick={() => setShowBreakdownModal(false)} className="text-slate-400 hover:text-slate-700">✕</button>
            </div>

            <div className="space-y-3 text-xs text-slate-600">
              <div className="p-4 bg-rose-50 rounded-2xl border border-rose-100 text-rose-950">
                <div className="font-bold text-rose-800 mb-1">SKU: TRN-90128-DC (Dual Clutch Module)</div>
                Current on-hand inventory is <strong>8 units</strong>. Projected demand during Week 2 maintenance cycle will surge to <strong>28 units</strong>.
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
                <div className="font-bold text-slate-800">Prescribed ML Procurement Schedule:</div>
                <div className="flex justify-between text-slate-500">
                  <span>Supplier Lead Time:</span>
                  <span className="font-bold text-slate-800">10 Business Days</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Recommended Order Quantity:</span>
                  <span className="font-bold text-slate-800">25 Units (₱1,775,000)</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Stockout Prevention Margin:</span>
                  <span className="font-bold text-emerald-600">Safe (+5 units safety buffer)</span>
                </div>
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-3">
              <button
                onClick={() => setShowBreakdownModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setShowBreakdownModal(false);
                  onQuickRestock("TRN-90128-DC");
                }}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-[#0d9488] text-white shadow-sm hover:bg-[#0f766e]"
              >
                Trigger Expedited Restock
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
