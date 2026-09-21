import React, { useState } from "react";
import { 
  Truck, 
  Filter, 
  MoreVertical, 
  Download, 
  CheckCircle2, 
  Clock, 
  AlertTriangle,
  Calendar,
  ExternalLink,
  ChevronRight,
  Printer
} from "lucide-react";
import { ShipmentManifestItem } from "../types";
import { INITIAL_SHIPMENTS } from "../data/initialData";

interface ReportsViewProps {
  shipments?: ShipmentManifestItem[];
  onUpdateShipmentStatus?: (id: string, status: "IN TRANSIT" | "DELIVERED" | "DELAYED") => void;
}

export const ReportsView: React.FC<ReportsViewProps> = ({
  shipments = INITIAL_SHIPMENTS,
  onUpdateShipmentStatus
}) => {
  const [selectedFilter, setSelectedFilter] = useState<string>("ALL");
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const [localShipments, setLocalShipments] = useState<ShipmentManifestItem[]>(shipments);
  const [selectedShipment, setSelectedShipment] = useState<ShipmentManifestItem | null>(null);

  const filteredShipments = localShipments.filter(s => {
    if (selectedFilter === "ALL") return true;
    return s.status === selectedFilter;
  });

  const handleStatusChange = (id: string, newStatus: "IN TRANSIT" | "DELIVERED" | "DELAYED") => {
    setLocalShipments(prev => prev.map(s => s.id === id ? { ...s, status: newStatus } : s));
    if (onUpdateShipmentStatus) {
      onUpdateShipmentStatus(id, newStatus);
    }
    setActiveMenuId(null);
  };

  const exportCSV = () => {
    const headers = "Shipment ID,Item Details,SKU,Destination,Status,Arrival\n";
    const rows = localShipments.map(s => 
      `"${s.shipmentId}","${s.itemDetails}","${s.sku}","${s.destination} - ${s.subLocation}","${s.status}","${s.estimatedArrival}"`
    ).join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `autoassist_shipment_manifest_${Date.now()}.csv`;
    a.click();
  };

  return (
    <div id="reports-view" className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Header section matching mockup Image 6 */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Logistics Intelligence
          </h2>
          <p className="text-xs text-slate-400 mt-1 font-medium">
            Operational pulse and fulfillment orchestration
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={exportCSV}
            className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 font-bold text-xs rounded-xl flex items-center gap-2 transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Export PDF</span>
          </button>

          <button
            onClick={() => {
              const newId = `#AS-${Math.floor(90450 + Math.random() * 500)}`;
              const sampleItem: ShipmentManifestItem = {
                id: `shp-${Date.now()}`,
                shipmentId: newId,
                orderDate: "Ordered: Just now",
                itemDetails: "High-Capacity Alternator (300A)",
                sku: "SKU: EL-ALT-300",
                destination: "West Coast Regional Depot",
                subLocation: "Bay 3 Logistics",
                status: "IN TRANSIT",
                estimatedArrival: "Oct 30, 2026"
              };
              setLocalShipments([sampleItem, ...localShipments]);
            }}
            className="px-5 py-2.5 bg-black hover:bg-slate-800 text-white font-bold text-xs rounded-xl flex items-center gap-2 shadow-sm transition-colors cursor-pointer"
          >
            <span className="text-base leading-none font-light">+</span>
            <span>New Shipment</span>
          </button>
        </div>
      </div>

      {/* Shipment Manifest Section matching mockup Image 6 */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
        {/* Table top control bar */}
        <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h3 className="text-base font-bold text-slate-900">
            Shipment Manifest
          </h3>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl text-xs font-bold text-slate-600">
              {(["ALL", "IN TRANSIT", "DELIVERED", "DELAYED"] as const).map(f => (
                <button
                  key={f}
                  onClick={() => setSelectedFilter(f)}
                  className={`px-2.5 py-1 rounded-lg transition-all ${
                    selectedFilter === f ? "bg-black text-white shadow-sm" : "hover:text-slate-900"
                  }`}
                >
                  {f === "ALL" ? "All" : f}
                </button>
              ))}
            </div>

            <span className="text-xs text-slate-400 font-medium">
              Showing {filteredShipments.length} of 358 records
            </span>
          </div>
        </div>

        {/* Table content matching mockup */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50 text-slate-400 font-extrabold uppercase tracking-wider text-[10px]">
                <th className="py-4 px-6">Shipment ID</th>
                <th className="py-4 px-6">Item Details</th>
                <th className="py-4 px-6">Destination</th>
                <th className="py-4 px-4 text-center">Status</th>
                <th className="py-4 px-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filteredShipments.map((shipment) => (
                <tr key={shipment.id} className="hover:bg-slate-50/80 transition-colors">
                  {/* Shipment ID */}
                  <td className="py-5 px-6">
                    <div className="font-extrabold text-slate-900 text-sm">
                      {shipment.shipmentId}
                    </div>
                    <div className="text-[10px] text-slate-400 font-normal">
                      {shipment.orderDate}
                    </div>
                  </td>

                  {/* Item Details */}
                  <td className="py-5 px-6">
                    <div className="font-bold text-slate-900">
                      {shipment.itemDetails}
                    </div>
                    <div className="text-[11px] font-mono text-[#0d9488] font-semibold">
                      {shipment.sku}
                    </div>
                  </td>

                  {/* Destination */}
                  <td className="py-5 px-6">
                    <div className="font-semibold text-slate-800">
                      {shipment.destination}
                    </div>
                    <div className="text-[11px] text-slate-400 font-normal">
                      {shipment.subLocation}
                    </div>
                  </td>

                  {/* Status Badges matching mockup */}
                  <td className="py-5 px-4 text-center">
                    {shipment.status === "IN TRANSIT" && (
                      <span className="inline-block px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-wider bg-[#0d2a2a] text-[#3be3b8] border border-[#0d4e4c]">
                        In Transit
                      </span>
                    )}

                    {shipment.status === "DELIVERED" && (
                      <span className="inline-block px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-600 border border-slate-200">
                        Delivered
                      </span>
                    )}

                    {shipment.status === "DELAYED" && (
                      <span className="inline-block px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-rose-100 text-rose-700 border border-rose-200">
                        Delayed
                      </span>
                    )}
                  </td>

                  {/* Action Menu */}
                  <td className="py-5 px-6 text-right relative">
                    <button
                      onClick={() => setActiveMenuId(activeMenuId === shipment.id ? null : shipment.id)}
                      className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-800 transition-colors"
                    >
                      <MoreVertical className="w-4 h-4" />
                    </button>

                    {activeMenuId === shipment.id && (
                      <div className="absolute right-6 mt-1 w-48 bg-white rounded-2xl shadow-xl border border-slate-100 py-1.5 z-30 text-left">
                        <button
                          onClick={() => setSelectedShipment(shipment)}
                          className="w-full px-3.5 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2 font-medium"
                        >
                          <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                          <span>View Tracking Details</span>
                        </button>
                        <div className="h-px bg-slate-100 my-1"></div>
                        <div className="px-3 py-1 text-[9px] uppercase font-bold text-slate-400">
                          Update Status:
                        </div>
                        <button
                          onClick={() => handleStatusChange(shipment.id, "IN TRANSIT")}
                          className="w-full px-3.5 py-1.5 text-xs text-slate-700 hover:bg-slate-50 font-medium"
                        >
                          Mark In Transit
                        </button>
                        <button
                          onClick={() => handleStatusChange(shipment.id, "DELIVERED")}
                          className="w-full px-3.5 py-1.5 text-xs text-emerald-700 hover:bg-slate-50 font-medium"
                        >
                          Mark Delivered
                        </button>
                        <button
                          onClick={() => handleStatusChange(shipment.id, "DELAYED")}
                          className="w-full px-3.5 py-1.5 text-xs text-rose-700 hover:bg-slate-50 font-medium"
                        >
                          Flag Delayed
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Shipment Details Drawer / Modal */}
      {selectedShipment && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl p-6 space-y-5 border border-slate-100">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Waybill Tracking</h3>
                <span className="text-xs text-slate-400">{selectedShipment.shipmentId}</span>
              </div>
              <button onClick={() => setSelectedShipment(null)} className="text-slate-400 hover:text-slate-700">✕</button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="p-4 bg-slate-50 rounded-2xl space-y-2">
                <div className="text-slate-400 text-[10px] uppercase font-bold">Consignment Payload</div>
                <div className="font-extrabold text-slate-900 text-sm">{selectedShipment.itemDetails}</div>
                <div className="font-mono text-[#0d9488] font-bold">{selectedShipment.sku}</div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-400">Destination Facility:</span>
                  <span className="font-bold text-slate-800">{selectedShipment.destination}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-400">Internal Bay:</span>
                  <span className="font-bold text-slate-800">{selectedShipment.subLocation}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-400">Estimated Arrival:</span>
                  <span className="font-bold text-slate-800">{selectedShipment.estimatedArrival}</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-slate-400">Dispatch Status:</span>
                  <span className="font-extrabold text-[#0d9488]">{selectedShipment.status}</span>
                </div>
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                onClick={() => setSelectedShipment(null)}
                className="px-5 py-2.5 bg-black text-white font-bold text-xs rounded-xl hover:bg-slate-800"
              >
                Close Manifest
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
