import React, { useState } from "react";
import { ShoppingBag, X, Plus, Trash2, CheckCircle2, UserCheck, Car } from "lucide-react";
import { InventoryItem, SalesRecord } from "../types";

interface NewSaleModalProps {
  isOpen: boolean;
  onClose: () => void;
  inventory: InventoryItem[];
  onCompleteSale: (sale: Omit<SalesRecord, "id">) => void;
}

export const NewSaleModal: React.FC<NewSaleModalProps> = ({
  isOpen,
  onClose,
  inventory,
  onCompleteSale
}) => {
  if (!isOpen) return null;

  const [customerName, setCustomerName] = useState("Metro Fleet Logistics Corp");
  const [vehicleModel, setVehicleModel] = useState("2024 Ford F-350 Super Duty");
  const [paymentMethod, setPaymentMethod] = useState<"Cash" | "Card" | "Fleet Account" | "Bank Transfer">("Fleet Account");
  const [cart, setCart] = useState<{ itemId: string; quantity: number }[]>([
    { itemId: inventory[0]?.id || "part-01", quantity: 2 }
  ]);

  const handleAddItem = () => {
    const unselected = inventory.find(i => !cart.some(c => c.itemId === i.id)) || inventory[0];
    if (unselected) {
      setCart([...cart, { itemId: unselected.id, quantity: 1 }]);
    }
  };

  const handleRemoveItem = (index: number) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  const handleQuantityChange = (index: number, qty: number) => {
    const next = [...cart];
    next[index].quantity = Math.max(1, qty);
    setCart(next);
  };

  const handleItemChange = (index: number, newItemId: string) => {
    const next = [...cart];
    next[index].itemId = newItemId;
    setCart(next);
  };

  // Calculate totals
  const totalAmountPHP = cart.reduce((acc, cartItem) => {
    const part = inventory.find(i => i.id === cartItem.itemId);
    return acc + (part ? part.unitPricePHP * cartItem.quantity : 0);
  }, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    const populatedItems = cart.map(ci => {
      const part = inventory.find(i => i.id === ci.itemId)!;
      return {
        itemId: part.id,
        itemName: part.name,
        sku: part.sku,
        quantity: ci.quantity,
        price: part.unitPricePHP
      };
    });

    onCompleteSale({
      orderNumber: `ORD-${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      customerName,
      vehicleModel,
      items: populatedItems,
      totalAmountPHP,
      paymentMethod,
      status: "Completed",
      processedBy: "Justin Morala"
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-slate-900 text-[#3be3b8] flex items-center justify-center">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-slate-900">Record Sales Order</h3>
              <p className="text-xs text-slate-400 font-medium">Orchestrate customer transaction and auto-deduct inventory</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Customer info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-extrabold uppercase text-slate-400 mb-1.5">
                Customer / Fleet Name
              </label>
              <input
                type="text"
                required
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full px-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900 font-medium"
              />
            </div>

            <div>
              <label className="block text-[11px] font-extrabold uppercase text-slate-400 mb-1.5">
                Vehicle Model
              </label>
              <input
                type="text"
                required
                value={vehicleModel}
                onChange={(e) => setVehicleModel(e.target.value)}
                className="w-full px-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900 font-medium"
              />
            </div>
          </div>

          {/* Cart items */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-900">
                Selected Parts & Hardware
              </span>
              <button
                type="button"
                onClick={handleAddItem}
                className="text-xs font-bold text-[#0d9488] hover:text-[#0f766e] flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Part Line
              </button>
            </div>

            <div className="space-y-2">
              {cart.map((cartItem, idx) => {
                const part = inventory.find(i => i.id === cartItem.itemId);
                return (
                  <div key={idx} className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-100">
                    <div className="flex-1">
                      <select
                        value={cartItem.itemId}
                        onChange={(e) => handleItemChange(idx, e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl font-bold text-slate-900"
                      >
                        {inventory.map(item => (
                          <option key={item.id} value={item.id}>
                            {item.name} ({item.sku}) - ₱{item.unitPricePHP.toLocaleString()} [Stock: {item.stockLevel}]
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="w-20">
                      <input
                        type="number"
                        min="1"
                        max={part?.stockLevel || 999}
                        value={cartItem.quantity}
                        onChange={(e) => handleQuantityChange(idx, parseInt(e.target.value) || 1)}
                        className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl font-bold text-center"
                      />
                    </div>

                    <div className="w-28 text-right font-bold text-xs text-slate-900">
                      ₱{((part?.unitPricePHP || 0) * cartItem.quantity).toLocaleString()}
                    </div>

                    {cart.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveItem(idx)}
                        className="text-slate-400 hover:text-rose-600 p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Payment method */}
          <div>
            <label className="block text-[11px] font-extrabold uppercase text-slate-400 mb-1.5">
              Settlement Method
            </label>
            <div className="grid grid-cols-4 gap-2">
              {(["Fleet Account", "Card", "Bank Transfer", "Cash"] as const).map(method => (
                <button
                  key={method}
                  type="button"
                  onClick={() => setPaymentMethod(method)}
                  className={`py-2 px-3 text-xs font-bold rounded-xl transition-all ${
                    paymentMethod === method
                      ? "bg-slate-900 text-white shadow-sm"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {method}
                </button>
              ))}
            </div>
          </div>

          {/* Total & Submit */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Order Value</span>
              <span className="text-2xl font-black text-slate-900">₱{totalAmountPHP.toLocaleString()}</span>
            </div>

            <button
              type="submit"
              className="px-8 py-3 bg-[#0d9488] hover:bg-[#0f766e] text-white font-extrabold text-xs rounded-xl shadow-md transition-all cursor-pointer"
            >
              Complete Sale & Dispatch
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
