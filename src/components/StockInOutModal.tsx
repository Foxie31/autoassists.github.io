import React, { useState } from "react";
import { ArrowUpRight, ArrowDownLeft, X, CheckCircle } from "lucide-react";
import { InventoryItem } from "../types";

interface StockInOutModalProps {
  isOpen: boolean;
  type: "IN" | "OUT";
  items: InventoryItem[];
  defaultSku?: string;
  onClose: () => void;
  onConfirm: (sku: string, quantity: number, notes: string) => void;
}

export const StockInOutModal: React.FC<StockInOutModalProps> = ({
  isOpen,
  type,
  items,
  defaultSku,
  onClose,
  onConfirm
}) => {
  if (!isOpen) return null;

  const [selectedSku, setSelectedSku] = useState(defaultSku || (items[0]?.sku || ""));
  const [quantity, setQuantity] = useState(10);
  const [notes, setNotes] = useState(type === "IN" ? "Restock from supplier shipment" : "Fulfillment dispatch to technician");

  const currentItem = items.find(i => i.sku === selectedSku);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (quantity <= 0) return;
    onConfirm(selectedSku, quantity, notes);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${
              type === "IN" ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"
            }`}>
              {type === "IN" ? <ArrowUpRight className="w-5 h-5" /> : <ArrowDownLeft className="w-5 h-5" />}
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-slate-900">
                {type === "IN" ? "Stock-In Terminal" : "Stock-Out Terminal"}
              </h3>
              <p className="text-xs text-slate-400 font-medium">
                {type === "IN" ? "Receive and log inventory assets" : "Deduct stock for delivery or repair"}
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-400"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-[11px] font-extrabold uppercase text-slate-400 mb-1.5">
              Select Component
            </label>
            <select
              value={selectedSku}
              onChange={(e) => setSelectedSku(e.target.value)}
              className="w-full px-4 py-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900 font-medium text-slate-900"
            >
              {items.map((item) => (
                <option key={item.id} value={item.sku}>
                  {item.name} ({item.sku}) - Current: {item.stockLevel} units
                </option>
              ))}
            </select>
          </div>

          {currentItem && (
            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 text-xs flex items-center justify-between">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Current On-Hand</span>
                <span className="font-extrabold text-slate-900 text-sm">{currentItem.stockLevel} Units</span>
              </div>
              <div className="text-right">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Post-Operation</span>
                <span className={`font-extrabold text-sm ${
                  type === "IN" ? "text-emerald-600" : "text-slate-900"
                }`}>
                  {type === "IN" ? currentItem.stockLevel + quantity : Math.max(0, currentItem.stockLevel - quantity)} Units
                </span>
              </div>
            </div>
          )}

          <div>
            <label className="block text-[11px] font-extrabold uppercase text-slate-400 mb-1.5">
              Quantity to {type === "IN" ? "Add" : "Remove"}
            </label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
              className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900 font-bold text-slate-900"
            />
          </div>

          <div>
            <label className="block text-[11px] font-extrabold uppercase text-slate-400 mb-1.5">
              Work Order / Audit Note
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-4 py-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900 font-medium text-slate-900"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className={`w-full py-3.5 rounded-xl font-bold text-xs text-white transition-all shadow-md ${
                type === "IN" 
                  ? "bg-[#0d9488] hover:bg-[#0f766e]" 
                  : "bg-slate-900 hover:bg-slate-800"
              }`}
            >
              Confirm {type === "IN" ? "Stock Intake" : "Stock Dispatch"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
