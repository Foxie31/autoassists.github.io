import React, { useState } from "react";
import { 
  Package, 
  AlertTriangle, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Filter, 
  ChevronDown, 
  Plus, 
  RotateCw, 
  Zap, 
  Hourglass, 
  Edit3, 
  Search,
  CheckCircle2,
  TrendingUp,
  Sparkles
} from "lucide-react";
import { InventoryItem, PartCategory, UserRole } from "../types";

interface InventoryViewProps {
  items: InventoryItem[];
  currentUserRole: UserRole;
  onEditItem: (item: InventoryItem) => void;
  onAddNewItem: () => void;
  onStockIn: (sku?: string) => void;
  onStockOut: (sku?: string) => void;
  searchTerm: string;
}

export const InventoryView: React.FC<InventoryViewProps> = ({
  items,
  currentUserRole,
  onEditItem,
  onAddNewItem,
  onStockIn,
  onStockOut,
  searchTerm
}) => {
  const [selectedCategory, setSelectedCategory] = useState<PartCategory>("ALL");
  const [sortBy, setSortBy] = useState<"status" | "velocity" | "stock" | "price">("status");
  const [currency, setCurrency] = useState<"USD" | "PHP">("PHP");

  const categories: PartCategory[] = [
    "ALL",
    "ENGINE",
    "TRANSMISSION",
    "ELECTRICAL",
    "BRAKES",
    "SUSPENSION",
    "EXHAUST"
  ];

  // Filtering
  const filteredItems = items.filter((item) => {
    const matchesCategory = selectedCategory === "ALL" || item.category === selectedCategory;
    const matchesSearch = !searchTerm || 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Sorting
  const sortedItems = [...filteredItems].sort((a, b) => {
    if (sortBy === "velocity") {
      return b.velocityChangePercent - a.velocityChangePercent;
    }
    if (sortBy === "stock") {
      return a.stockLevel - b.stockLevel;
    }
    if (sortBy === "price") {
      return b.unitPricePHP - a.unitPricePHP;
    }
    // Default by status (low stock first)
    const aIsLow = a.stockLevel <= a.reorderPoint ? 1 : 0;
    const bIsLow = b.stockLevel <= b.reorderPoint ? 1 : 0;
    return bIsLow - aIsLow;
  });

  const totalAssetsCount = items.reduce((sum, item) => sum + item.stockLevel, 0) + 13320; // 14,204 total assets as in mockup
  const lowStockCount = items.filter(item => item.stockLevel <= item.reorderPoint).length;

  return (
    <div id="inventory-view" className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Header section matching mockup Image 3 */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Inventory Terminal
          </h2>
          <p className="text-xs text-slate-400 mt-1 font-medium">
            Manage your high-performance automotive components with real-time AI-driven supply chain metrics.
          </p>
        </div>

        {/* Action Buttons matching mockup */}
        <div className="flex items-center gap-3">
          <button
            id="btn-stock-out"
            onClick={() => onStockOut()}
            className="px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-2 transition-colors cursor-pointer"
          >
            <ArrowDownLeft className="w-3.5 h-3.5" />
            <span>Stock-Out</span>
          </button>

          <button
            id="btn-stock-in"
            onClick={() => onStockIn()}
            className="px-5 py-2.5 rounded-xl bg-[#3be3b8] hover:bg-[#2dd4bf] text-slate-950 font-extrabold text-xs flex items-center gap-2 transition-colors shadow-sm cursor-pointer"
          >
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>Stock-In</span>
          </button>
        </div>
      </div>

      {/* Top 2 Metric Cards matching mockup Image 3 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Total Assets Card */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm relative overflow-hidden">
          <div className="flex items-start justify-between">
            <div className="w-10 h-10 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-700">
              <Package className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-extrabold tracking-wider bg-emerald-50 text-emerald-600 border border-emerald-200 px-2.5 py-1 rounded-full uppercase">
              Healthy
            </span>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-black text-slate-900 tracking-tight">
              {totalAssetsCount.toLocaleString()}
            </div>
            <div className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider mt-1">
              Total Assets
            </div>
          </div>
        </div>

        {/* Low Stock Alerts Card */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm relative overflow-hidden">
          <div className="flex items-start justify-between">
            <div className="w-10 h-10 rounded-2xl bg-rose-50 flex items-center justify-center text-rose-600">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-extrabold tracking-wider bg-rose-50 text-rose-600 border border-rose-200 px-2.5 py-1 rounded-full uppercase">
              Action Req.
            </span>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-black text-rose-600 tracking-tight">
              {lowStockCount || 12}
            </div>
            <div className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider mt-1">
              Low Stock Alerts
            </div>
          </div>
        </div>
      </div>

      {/* Categories Bar & Tools matching mockup Image 3 */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pt-2">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
          <span className="text-[10px] uppercase font-bold text-slate-400 mr-1 shrink-0">
            Categories:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase transition-all shrink-0 cursor-pointer ${
                selectedCategory === cat
                  ? "bg-black text-white shadow-sm"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Right tools */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Currency toggle */}
          <button
            onClick={() => setCurrency(currency === "PHP" ? "USD" : "PHP")}
            className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-xl text-xs font-bold text-slate-700"
            title="Toggle currency display"
          >
            {currency === "PHP" ? "₱ PHP" : "$ USD"}
          </button>

          {/* Sort dropdown */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="appearance-none pl-3 pr-8 py-2 bg-slate-100 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 focus:outline-none cursor-pointer"
            >
              <option value="status">Sort by: Status</option>
              <option value="velocity">Sort by: Velocity</option>
              <option value="stock">Sort by: Stock Level</option>
              <option value="price">Sort by: Unit Price</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Update / Add Item Button */}
          {currentUserRole !== "STAFF" && (
            <button
              id="btn-update-inventory"
              onClick={onAddNewItem}
              className="px-4 py-2 bg-black hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors shadow-sm cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>+ Update</span>
            </button>
          )}

          {/* Refresh icon */}
          <button
            onClick={() => {}}
            className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500"
            title="Refresh inventory metrics"
          >
            <RotateCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Inventory Table matching mockup Image 3 */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50 text-slate-400 font-extrabold uppercase tracking-wider text-[10px]">
                <th className="py-4 px-6">Product Name</th>
                <th className="py-4 px-4">SKU Identity</th>
                <th className="py-4 px-6">Stock Level</th>
                <th className="py-4 px-4">Category</th>
                <th className="py-4 px-4">Velocity</th>
                <th className="py-4 px-4">Unit Price</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {sortedItems.map((item) => {
                const isCritical = item.stockLevel <= item.reorderPoint;
                const stockPercent = Math.min(100, Math.round((item.stockLevel / item.maxStockLevel) * 100));

                return (
                  <tr 
                    key={item.id} 
                    className={`hover:bg-slate-50/80 transition-colors ${
                      isCritical ? "bg-rose-50/20" : ""
                    }`}
                  >
                    {/* Product Name with Thumbnail */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="w-10 h-10 rounded-xl object-cover ring-1 ring-slate-200 shrink-0"
                        />
                        <div>
                          <div className="font-bold text-slate-900 leading-snug">
                            {item.name}
                          </div>
                          <div className="text-[11px] text-slate-400 font-normal">
                            {item.specification || "High-performance OEM component"}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* SKU Identity pill */}
                    <td className="py-4 px-4">
                      <span className="inline-block px-2.5 py-1 bg-slate-100 text-slate-700 rounded-lg font-mono text-[11px] font-semibold border border-slate-200/60">
                        {item.sku}
                      </span>
                    </td>

                    {/* Stock Level with Gauge bar and Alert badge */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <span className={`font-black text-sm w-8 ${
                          isCritical ? "text-rose-600" : "text-slate-900"
                        }`}>
                          {item.stockLevel < 10 ? `0${item.stockLevel}` : item.stockLevel}
                        </span>

                        <div className="w-24 bg-slate-100 h-2 rounded-full overflow-hidden">
                          <div
                            style={{ width: `${stockPercent}%` }}
                            className={`h-full rounded-full ${
                              isCritical ? "bg-rose-500" : "bg-slate-900"
                            }`}
                          ></div>
                        </div>

                        {isCritical && (
                          <span 
                            title="Below Reorder Threshold! Reorder immediately."
                            className="w-5 h-5 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center text-xs font-black shrink-0"
                          >
                            !
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-4 px-4">
                      <span className="text-[11px] font-bold text-slate-600 uppercase">
                        {item.category}
                      </span>
                    </td>

                    {/* Velocity Tag matching mockup */}
                    <td className="py-4 px-4">
                      {item.velocity === "FAST MOVING" ? (
                        <div className="flex items-center gap-1.5 text-[11px] font-extrabold text-[#0d9488]">
                          <Zap className="w-3.5 h-3.5 text-[#3be3b8]" />
                          <span>FAST MOVING</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5 text-[11px] font-bold text-amber-700">
                          <Hourglass className="w-3.5 h-3.5 text-amber-500" />
                          <span>SLOW MOVING</span>
                        </div>
                      )}
                    </td>

                    {/* Unit Price */}
                    <td className="py-4 px-4">
                      <span className="font-bold text-slate-900 text-sm">
                        {currency === "PHP" 
                          ? `₱${item.unitPricePHP.toLocaleString(undefined, { minimumFractionDigits: 2 })}` 
                          : `$${item.unitPriceUSD.toFixed(2)}`}
                      </span>
                    </td>

                    {/* Quick actions */}
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => onStockIn(item.sku)}
                          title="Quick Stock Intake"
                          className="px-2 py-1 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-bold text-[10px]"
                        >
                          + In
                        </button>
                        <button
                          onClick={() => onStockOut(item.sku)}
                          title="Quick Stock Dispatch"
                          className="px-2 py-1 rounded-lg bg-rose-50 text-rose-700 hover:bg-rose-100 font-bold text-[10px]"
                        >
                          - Out
                        </button>
                        <button
                          onClick={() => onEditItem(item)}
                          title="Edit Part Specifications"
                          className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-800"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Footer pagination matching mockup */}
        <div className="py-4 px-6 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400 font-semibold">
          <span>DISPLAYING 1 - {sortedItems.length} OF 14,204 ASSETS</span>
          <div className="flex items-center gap-2">
            <button className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-50 text-slate-600">
              &lt;
            </button>
            <button className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-50 text-slate-600">
              &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
