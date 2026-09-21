import React, { useState } from "react";
import { X, Clock, Sparkles, CheckCircle2 } from "lucide-react";
import { InventoryItem, PartCategory } from "../types";

interface InventoryEditModalProps {
  item: InventoryItem | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedItem: InventoryItem) => void;
}

export const InventoryEditModal: React.FC<InventoryEditModalProps> = ({
  item,
  isOpen,
  onClose,
  onSave,
}) => {
  if (!isOpen) return null;

  const isNew = !item;

  const [formData, setFormData] = useState<Partial<InventoryItem>>({
    name: item?.name || "",
    sku: item?.sku || `ENG-${Math.floor(10000 + Math.random() * 90000)}-X`,
    category: item?.category || "ENGINE",
    specification: item?.specification || "High-performance OEM spec",
    stockLevel: item?.stockLevel ?? 25,
    maxStockLevel: item?.maxStockLevel ?? 100,
    reorderPoint: item?.reorderPoint ?? 10,
    isOptimizedReorder: true,
    unitPriceUSD: item?.unitPriceUSD ?? 250,
    unitPricePHP: item?.unitPricePHP ?? 12500,
    supplierName: item?.supplierName || "Titan Automotive Components",
    leadTimeDays: item?.leadTimeDays ?? 14,
    velocity: item?.velocity || "FAST MOVING",
    velocityChangePercent: item?.velocityChangePercent ?? 15,
    badgeCode: item?.badgeCode || "ENG",
    imageUrl: item?.imageUrl || "https://images.unsplash.com/photo-1486006920555-c77dce18193b?w=200&auto=format&fit=crop&q=80"
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: InventoryItem = {
      id: item?.id || `part-${Date.now()}`,
      name: formData.name || "Unnamed Component",
      sku: formData.sku || "SKU-AUTO",
      category: (formData.category as any) || "ENGINE",
      specification: formData.specification || "High-grade automotive part",
      stockLevel: Number(formData.stockLevel) || 0,
      maxStockLevel: Number(formData.maxStockLevel) || 100,
      reorderPoint: Number(formData.reorderPoint) || 5,
      isOptimizedReorder: true,
      velocity: (formData.velocity as any) || "FAST MOVING",
      velocityChangePercent: Number(formData.velocityChangePercent) || 0,
      unitPriceUSD: Number(formData.unitPriceUSD) || 0,
      unitPricePHP: Number(formData.unitPricePHP) || (Number(formData.unitPriceUSD) * 50),
      supplierName: formData.supplierName || "Default Supplier",
      leadTimeDays: Number(formData.leadTimeDays) || 7,
      badgeCode: (formData.category || "ENG").substring(0, 3).toUpperCase(),
      imageUrl: formData.imageUrl
    };
    onSave(updated);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in">
      <div 
        id="inventory-edit-dialog"
        className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden my-8"
      >
        {/* Header matching mockup Image 4 */}
        <div className="p-8 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Inventory Terminal
            </h3>
            <p className="text-xs text-slate-400 mt-1 font-medium">
              Manage your high-performance automotive components with real-time AI-driven supply chain metrics.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="px-6 py-2.5 rounded-xl bg-black hover:bg-slate-800 text-white text-xs font-bold transition-colors shadow-md"
            >
              Save Changes
            </button>
          </div>
        </div>

        {/* Body content with sections matching Image 4 */}
        <form onSubmit={handleSubmit} className="p-8 space-y-8 max-h-[75vh] overflow-y-auto">
          {/* Section 1: General Information */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-slate-100 flex items-center justify-center text-[10px]">i</span>
                General Information
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-extrabold uppercase text-slate-400 tracking-wider mb-1.5">
                  Product Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. V8 High-Performance Engine"
                  className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900 font-medium text-slate-900"
                />
              </div>

              <div>
                <label className="block text-[11px] font-extrabold uppercase text-slate-400 tracking-wider mb-1.5">
                  SKU ID
                </label>
                <input
                  type="text"
                  required
                  value={formData.sku}
                  onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                  placeholder="e.g. ENG-V8-2824-X"
                  className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900 font-mono text-slate-900"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-extrabold uppercase text-slate-400 tracking-wider mb-1.5">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                  className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900 font-medium text-slate-900"
                >
                  <option value="ENGINE">Engine</option>
                  <option value="TRANSMISSION">Transmission</option>
                  <option value="ELECTRICAL">Electrical</option>
                  <option value="BRAKES">Brakes</option>
                  <option value="SUSPENSION">Suspension</option>
                  <option value="EXHAUST">Exhaust</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-extrabold uppercase text-slate-400 tracking-wider mb-1.5">
                  Specification / Variant
                </label>
                <input
                  type="text"
                  value={formData.specification}
                  onChange={(e) => setFormData({ ...formData, specification: e.target.value })}
                  placeholder="e.g. Carbon-Kevlar High Heat Compound"
                  className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900 font-medium text-slate-900"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Inventory Metrics */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-[#3be3b8]" />
                Inventory Metrics
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-[11px] font-extrabold uppercase text-slate-400 tracking-wider mb-1.5">
                  Current Quantity
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="0"
                    value={formData.stockLevel}
                    onChange={(e) => setFormData({ ...formData, stockLevel: parseInt(e.target.value) || 0 })}
                    className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900 font-bold text-slate-900"
                  />
                  <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-400 uppercase">
                    Units
                  </span>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-[11px] font-extrabold uppercase text-slate-400 tracking-wider">
                    Reorder Point
                  </label>
                  <span className="text-[9px] font-bold text-[#0d9488] bg-[#3be3b8]/20 px-1.5 py-0.5 rounded tracking-wide">
                    OPTIMIZED
                  </span>
                </div>
                <input
                  type="number"
                  min="1"
                  value={formData.reorderPoint}
                  onChange={(e) => setFormData({ ...formData, reorderPoint: parseInt(e.target.value) || 1 })}
                  className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900 font-bold text-slate-900"
                />
              </div>

              <div>
                <label className="block text-[11px] font-extrabold uppercase text-slate-400 tracking-wider mb-1.5">
                  Unit Price (₱ / $)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.01"
                    value={formData.unitPricePHP}
                    onChange={(e) => {
                      const php = parseFloat(e.target.value) || 0;
                      setFormData({ 
                        ...formData, 
                        unitPricePHP: php,
                        unitPriceUSD: Number((php / 50).toFixed(2))
                      });
                    }}
                    className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900 font-bold text-slate-900"
                  />
                  <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-400 uppercase">
                    PHP (₱)
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Supplier Details */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                Supplier Details
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-extrabold uppercase text-slate-400 tracking-wider mb-1.5">
                  Supplier Name
                </label>
                <input
                  type="text"
                  value={formData.supplierName}
                  onChange={(e) => setFormData({ ...formData, supplierName: e.target.value })}
                  placeholder="e.g. Titan Automotive Components"
                  className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900 font-medium text-slate-900"
                />
              </div>

              <div>
                <label className="block text-[11px] font-extrabold uppercase text-slate-400 tracking-wider mb-1.5">
                  Lead Time
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="1"
                    value={formData.leadTimeDays}
                    onChange={(e) => setFormData({ ...formData, leadTimeDays: parseInt(e.target.value) || 1 })}
                    className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900 font-bold text-slate-900"
                  />
                  <div className="absolute right-3.5 top-1/2 -translate-y-1/2 flex items-center gap-1 text-[11px] text-slate-400 font-semibold">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Days</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
