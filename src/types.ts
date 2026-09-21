export type UserRole = "ADMIN" | "MANAGER" | "STAFF";

export type SecurityClearance = "L1" | "L2" | "L3";

export interface User {
  id: string;
  fullName: string;
  email: string;
  role: UserRole;
  displayRole: string; // e.g. "Store Owner", "Manager", "Staff"
  status: "Active" | "Offline";
  lastActive: string;
  avatarUrl?: string;
  avatar?: string;
  initials: string;
  clearanceLevel: SecurityClearance;
  phone?: string;
  branch?: string;
}

export type PartCategory = 
  | "ALL"
  | "ENGINE"
  | "TRANSMISSION"
  | "ELECTRICAL"
  | "BRAKES"
  | "SUSPENSION"
  | "EXHAUST";

export type VelocityStatus = "FAST MOVING" | "SLOW MOVING" | "MODERATE";

export interface InventoryItem {
  id: string;
  name: string;
  sku: string;
  category: "ENGINE" | "TRANSMISSION" | "ELECTRICAL" | "BRAKES" | "SUSPENSION" | "EXHAUST";
  specification?: string;
  stockLevel: number;
  maxStockLevel: number;
  reorderPoint: number;
  isOptimizedReorder: boolean;
  velocity: VelocityStatus;
  velocityChangePercent: number; // e.g. +44 or -12
  unitPriceUSD: number;
  unitPricePHP: number;
  supplierName: string;
  leadTimeDays: number;
  badgeCode: string; // e.g. "BRK", "OIL", "EXH", "ALT"
  imageUrl?: string;
}

export interface SalesRecord {
  id: string;
  orderNumber: string;
  date: string;
  customerName: string;
  vehicleModel: string;
  items: {
    itemId: string;
    itemName: string;
    sku: string;
    quantity: number;
    price: number;
  }[];
  totalAmountPHP: number;
  paymentMethod: "Cash" | "Card" | "Fleet Account" | "Bank Transfer";
  status: "Completed" | "Processing" | "Delayed";
  processedBy: string;
}

export interface ShipmentManifestItem {
  id: string;
  shipmentId: string;
  orderDate: string;
  itemDetails: string;
  sku: string;
  destination: string;
  subLocation: string;
  status: "IN TRANSIT" | "DELIVERED" | "DELAYED";
  estimatedArrival: string;
}

export interface SmartInsight {
  id: string;
  type: "DEMAND_ALERT" | "SLOW_MOVING" | "TRANSFER_SUGGESTION";
  title: string;
  description: string;
  actionText: string;
  skuTarget?: string;
  tagColor: string;
}

export interface DemandForecastDataPoint {
  week: string;
  label: string;
  currentStock: number;
  projectedDemand: number;
  safetyThreshold: number;
}

export interface CriticalStockItem {
  id: string;
  item: string;
  sku: string;
  qty: number;
  status: "CRITICAL" | "WARNING";
}

export interface ActivityTransaction {
  id: string;
  txId: string;
  title: string;
  client: string;
  amount: number;
  amountFormatted: string;
  date: string;
  status: "COMPLETED" | "PENDING" | "CANCELLED";
  imageUrl?: string;
}

export interface MonthlySalesPoint {
  month: string;
  label: string;
  revenuePHP: number;
  orders: number;
  projectedGrowthPHP: number;
}
