import { 
  InventoryItem, 
  User, 
  ShipmentManifestItem, 
  MonthlySalesPoint, 
  DemandForecastDataPoint, 
  SmartInsight, 
  SalesRecord,
  CriticalStockItem,
  ActivityTransaction 
} from "../types";

export const INITIAL_USERS: User[] = [
  {
    id: "usr-01",
    fullName: "Justin Morala",
    email: "morala@autoassist.ai",
    role: "ADMIN",
    displayRole: "Store Owner",
    status: "Active",
    lastActive: "Just now",
    initials: "JM",
    clearanceLevel: "L3",
    branch: "Central Logistics HQ",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
  },
  {
    id: "usr-02",
    fullName: "Shaine Banadera",
    email: "s.banadera@autoassist.ai",
    role: "MANAGER",
    displayRole: "Manager",
    status: "Active",
    lastActive: "2 hours ago",
    initials: "SB",
    clearanceLevel: "L2",
    branch: "North Distribution Hub"
  },
  {
    id: "usr-03",
    fullName: "Andrew Ladignon",
    email: "Ladignon@autoassist.ai",
    role: "STAFF",
    displayRole: "Staff",
    status: "Active",
    lastActive: "Just now",
    initials: "AL",
    clearanceLevel: "L1",
    branch: "Warehouse Bay 3",
    avatarUrl: "/src/assets/images/andrew_ladignon_avatar_1789948072567.jpg",
    avatar: "/src/assets/images/andrew_ladignon_avatar_1789948072567.jpg"
  }
];

export const INITIAL_INVENTORY: InventoryItem[] = [
  {
    id: "part-01",
    name: "V8 Piston Assembly",
    specification: "Forged Steel - Series X",
    sku: "ENG-08234-PI",
    category: "ENGINE",
    stockLevel: 142,
    maxStockLevel: 250,
    reorderPoint: 35,
    isOptimizedReorder: true,
    velocity: "FAST MOVING",
    velocityChangePercent: 44,
    unitPriceUSD: 284.00,
    unitPricePHP: 14200.00,
    supplierName: "Titan Automotive Components",
    leadTimeDays: 14,
    badgeCode: "ENG",
    imageUrl: "https://images.unsplash.com/photo-1486006920555-c77dce18193b?w=200&auto=format&fit=crop&q=80"
  },
  {
    id: "part-02",
    name: "Dual Clutch Module",
    specification: "Friction Ceramic Steel",
    sku: "TRN-90128-DC",
    category: "TRANSMISSION",
    stockLevel: 8,
    maxStockLevel: 60,
    reorderPoint: 15,
    isOptimizedReorder: true,
    velocity: "FAST MOVING",
    velocityChangePercent: 38,
    unitPriceUSD: 1420.00,
    unitPricePHP: 71000.00,
    supplierName: "Apex Powertrain Ltd",
    leadTimeDays: 10,
    badgeCode: "TRN",
    imageUrl: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=200&auto=format&fit=crop&q=80"
  },
  {
    id: "part-03",
    name: "ECU Control Unit",
    specification: "Smart AI Integrated",
    sku: "ELE-54213-EC",
    category: "ELECTRICAL",
    stockLevel: 43,
    maxStockLevel: 100,
    reorderPoint: 10,
    isOptimizedReorder: true,
    velocity: "SLOW MOVING",
    velocityChangePercent: -6,
    unitPriceUSD: 690.00,
    unitPricePHP: 34500.00,
    supplierName: "MicroChip Advanced Sensors",
    leadTimeDays: 21,
    badgeCode: "ELE",
    imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=200&auto=format&fit=crop&q=80"
  },
  {
    id: "part-04",
    name: "Ceramic Brake Pads",
    specification: "Carbon-Kevlar High Heat Compound",
    sku: "BRK-CP-2044",
    category: "BRAKES",
    stockLevel: 210,
    maxStockLevel: 300,
    reorderPoint: 50,
    isOptimizedReorder: true,
    velocity: "FAST MOVING",
    velocityChangePercent: 44,
    unitPriceUSD: 85.00,
    unitPricePHP: 4250.00,
    supplierName: "Brembo Precision Systems",
    leadTimeDays: 5,
    badgeCode: "BRK",
    imageUrl: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=200&auto=format&fit=crop&q=80"
  },
  {
    id: "part-05",
    name: "Full Synthetic 5W-30",
    specification: "1L High-Spec Ester Formula",
    sku: "OIL-FS-530",
    category: "ENGINE",
    stockLevel: 580,
    maxStockLevel: 800,
    reorderPoint: 120,
    isOptimizedReorder: true,
    velocity: "FAST MOVING",
    velocityChangePercent: 38,
    unitPriceUSD: 24.50,
    unitPricePHP: 1225.00,
    supplierName: "Castrol Mobil Lubricants",
    leadTimeDays: 3,
    badgeCode: "OIL",
    imageUrl: "https://images.unsplash.com/photo-1616788494707-ec28f08d05a1?w=200&auto=format&fit=crop&q=80"
  },
  {
    id: "part-06",
    name: "Performance Exhaust",
    specification: "Dual Cat-back Inox 304",
    sku: "EXH-PE-991",
    category: "EXHAUST",
    stockLevel: 19,
    maxStockLevel: 50,
    reorderPoint: 12,
    isOptimizedReorder: true,
    velocity: "SLOW MOVING",
    velocityChangePercent: -12,
    unitPriceUSD: 890.00,
    unitPricePHP: 44500.00,
    supplierName: "Borla Performance Exhaust",
    leadTimeDays: 18,
    badgeCode: "EXH",
    imageUrl: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=200&auto=format&fit=crop&q=80"
  },
  {
    id: "part-07",
    name: "Heavy Duty Alternator",
    specification: "1300A High Output Stator",
    sku: "ELE-EM-441",
    category: "ELECTRICAL",
    stockLevel: 15,
    maxStockLevel: 45,
    reorderPoint: 8,
    isOptimizedReorder: true,
    velocity: "SLOW MOVING",
    velocityChangePercent: -8,
    unitPriceUSD: 310.00,
    unitPricePHP: 15500.00,
    supplierName: "Denso Corporation Industrial",
    leadTimeDays: 12,
    badgeCode: "ALT",
    imageUrl: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=200&auto=format&fit=crop&q=80"
  },
  {
    id: "part-08",
    name: "Carbon Ceramic Rotors",
    specification: "380mm Drilled & Slotted",
    sku: "BRK-RT-5012",
    category: "BRAKES",
    stockLevel: 34,
    maxStockLevel: 80,
    reorderPoint: 10,
    isOptimizedReorder: true,
    velocity: "FAST MOVING",
    velocityChangePercent: 22,
    unitPriceUSD: 450.00,
    unitPricePHP: 22500.00,
    supplierName: "Brembo Precision Systems",
    leadTimeDays: 8,
    badgeCode: "BRK",
    imageUrl: "https://images.unsplash.com/photo-1600790142055-619df03207e6?w=200&auto=format&fit=crop&q=80"
  }
];

export const INITIAL_SHIPMENTS: ShipmentManifestItem[] = [
  {
    id: "shp-01",
    shipmentId: "#AS-90421",
    orderDate: "Ordered: Oct 24",
    itemDetails: "V8 Piston Assembly [Set of 8]",
    sku: "SKU: VP-800-HE",
    destination: "Detroit Branch (Central Hub)",
    subLocation: "Warehouse 4B",
    status: "IN TRANSIT",
    estimatedArrival: "Oct 26, 2026"
  },
  {
    id: "shp-02",
    shipmentId: "#AS-90419",
    orderDate: "Ordered: Oct 23",
    itemDetails: "Ceramic Brake Kit [Front/Rear]",
    sku: "SKU: CB-921-X",
    destination: "Phoenix Regional Distribution",
    subLocation: "Retail Partner A",
    status: "DELIVERED",
    estimatedArrival: "Oct 24, 2026"
  },
  {
    id: "shp-03",
    shipmentId: "#AS-90388",
    orderDate: "Ordered: Oct 22",
    itemDetails: "High-Capacity Alternator (300A)",
    sku: "SKU: EL-ALT-300",
    destination: "Seattle Service Center",
    subLocation: "Branch Priority",
    status: "DELAYED",
    estimatedArrival: "Oct 27, 2026"
  }
];

export const CRITICAL_STOCK_ITEMS: CriticalStockItem[] = [
  {
    id: "crit-01",
    item: "Oil Filter XL",
    sku: "OF-992-CR",
    qty: 3,
    status: "CRITICAL"
  },
  {
    id: "crit-02",
    item: "Platinum Spark Plug",
    sku: "SP-101-ZN",
    qty: 2,
    status: "CRITICAL"
  },
  {
    id: "crit-03",
    item: "Air Filter Element",
    sku: "AF-440-BT",
    qty: 6,
    status: "WARNING"
  },
  {
    id: "crit-04",
    item: "Timing Belt Kit",
    sku: "TB-220-AS",
    qty: 9,
    status: "WARNING"
  },
  {
    id: "crit-05",
    item: "Coolant Reservoir",
    sku: "CR-505-FL",
    qty: 8,
    status: "WARNING"
  }
];

export const RECENT_ACTIVITY_TRANSACTIONS: ActivityTransaction[] = [
  {
    id: "act-01",
    txId: "TX-90422",
    title: "Performance Brake Systems",
    client: "Client: Miller's Auto Body",
    amount: 1420.00,
    amountFormatted: "$1,420.00",
    date: "10:45 AM",
    status: "COMPLETED",
    imageUrl: "/src/assets/images/piston_assembly_1789948093995.jpg"
  },
  {
    id: "act-02",
    txId: "TX-90418",
    title: "LED Headlight Assembly (x4)",
    client: "Client: Private Purchase",
    amount: 590.25,
    amountFormatted: "$590.25",
    date: "09:12 AM",
    status: "PENDING",
    imageUrl: "/src/assets/images/headlight_assembly_1789948106556.jpg"
  },
  {
    id: "act-03",
    txId: "TX-90412",
    title: "Turbocharger Unit V3",
    client: "Client: SpeedShop Garage",
    amount: 2100.00,
    amountFormatted: "$2,100.00",
    date: "Yesterday",
    status: "COMPLETED",
    imageUrl: "/src/assets/images/turbocharger_unit_1789948118410.jpg"
  },
  {
    id: "act-04",
    txId: "TX-90485",
    title: "Air Filtration Bulk Case",
    client: "Client: Fleet Logistics Inc.",
    amount: 845.00,
    amountFormatted: "$845.00",
    date: "Yesterday",
    status: "COMPLETED",
    imageUrl: "/src/assets/images/air_filter_case_1789948128758.jpg"
  },
  {
    id: "act-05",
    txId: "TX-90399",
    title: "Catalytic Converter OEM",
    client: "Client: City Motors",
    amount: 1120.00,
    amountFormatted: "$1,120.00",
    date: "Nov 22, 2024",
    status: "CANCELLED",
    imageUrl: "/src/assets/images/catalytic_converter_1789948140845.jpg"
  }
];

export const INITIAL_SALES_POINTS: MonthlySalesPoint[] = [
  { month: "JAN", label: "Jan 2026", revenuePHP: 82000, orders: 190, projectedGrowthPHP: 80000 },
  { month: "FEB", label: "Feb 2026", revenuePHP: 94000, orders: 215, projectedGrowthPHP: 92000 },
  { month: "MAR", label: "Mar 2026", revenuePHP: 88500, orders: 202, projectedGrowthPHP: 95000 },
  { month: "APR", label: "Apr 2026", revenuePHP: 119750, orders: 275, projectedGrowthPHP: 115000 },
  { month: "MAY", label: "May 2026", revenuePHP: 105200, orders: 240, projectedGrowthPHP: 118000 },
  { month: "JUN", label: "Jun 2026", revenuePHP: 128400, orders: 290, projectedGrowthPHP: 125000 },
  { month: "JUL", label: "Jul 2026", revenuePHP: 142000, orders: 320, projectedGrowthPHP: 138000 },
  { month: "AUG", label: "Aug 2026", revenuePHP: 135600, orders: 305, projectedGrowthPHP: 145000 },
  { month: "SEP", label: "Sep 2026", revenuePHP: 158900, orders: 350, projectedGrowthPHP: 155000 },
  { month: "OCT", label: "Oct 2026", revenuePHP: 180260, orders: 387, projectedGrowthPHP: 175000 }
];

export const DEMAND_FORECAST_POINTS: DemandForecastDataPoint[] = [
  { week: "WEEK 1", label: "Days 1-7", currentStock: 120, projectedDemand: 95, safetyThreshold: 30 },
  { week: "WEEK 2", label: "Days 8-14", currentStock: 85, projectedDemand: 130, safetyThreshold: 30 },
  { week: "WEEK 3", label: "Days 15-21", currentStock: 45, projectedDemand: 165, safetyThreshold: 30 },
  { week: "WEEK 4", label: "Days 22-30", currentStock: 18, projectedDemand: 190, safetyThreshold: 30 }
];

export const REVENUE_MOMENTUM_DAYS = [
  { day: "MON", heightPct: 45, value: "₱28,400", active: false },
  { day: "TUE", heightPct: 60, value: "₱42,100", active: false },
  { day: "WED", heightPct: 92, value: "₱78,900", active: true },
  { day: "THU", heightPct: 52, value: "₱36,200", active: false },
  { day: "FRI", heightPct: 75, value: "₱59,400", active: false },
  { day: "SAT", heightPct: 38, value: "₱24,800", active: false },
  { day: "SUN", heightPct: 25, value: "₱16,300", active: false }
];

export const SMART_INSIGHTS: SmartInsight[] = [
  {
    id: "ins-01",
    type: "DEMAND_ALERT",
    title: "PRODUCT DEMAND ALERT",
    description: "This product is expected to sell more soon based on past sales.",
    actionText: "Order additional stock to avoid running out.",
    skuTarget: "TRN-90128-DC",
    tagColor: "text-emerald-600 bg-emerald-50 border-emerald-200"
  },
  {
    id: "ins-02",
    type: "SLOW_MOVING",
    title: "SLOW-MOVING PRODUCTS",
    description: "Some products are not selling quickly.",
    actionText: "Apply discounts or promotions to increase sales.",
    skuTarget: "EXH-PE-991",
    tagColor: "text-amber-600 bg-amber-50 border-amber-200"
  },
  {
    id: "ins-03",
    type: "TRANSFER_SUGGESTION",
    title: "STOCK TRANSFER SUGGESTION",
    description: "Some products can be moved from another location if needed.",
    actionText: "Review and approve the transfer request.",
    skuTarget: "ELE-EM-441",
    tagColor: "text-sky-600 bg-sky-50 border-sky-200"
  }
];

export const INITIAL_SALES: SalesRecord[] = [
  {
    id: "sale-101",
    orderNumber: "ORD-92841",
    date: "Oct 26, 2026",
    customerName: "Metro Express Logistics",
    vehicleModel: "2024 Ford F-350 Super Duty",
    items: [
      {
        itemId: "part-02",
        itemName: "Carbon Ceramic Brake Rotors",
        sku: "BRK-RT-5012",
        quantity: 4,
        price: 26000
      },
      {
        itemId: "part-03",
        itemName: "Ceramic Brake Pad Set",
        sku: "BRK-CP-2044",
        quantity: 2,
        price: 7250
      }
    ],
    totalAmountPHP: 118500,
    paymentMethod: "Fleet Account",
    status: "Completed",
    processedBy: "Justin Morala"
  },
  {
    id: "sale-102",
    orderNumber: "ORD-92839",
    date: "Oct 25, 2026",
    customerName: "Apex Auto Care",
    vehicleModel: "2023 Toyota Hilux 2.8L",
    items: [
      {
        itemId: "part-04",
        itemName: "Full Synthetic 5W-30 Motor Oil",
        sku: "OIL-FS-530",
        quantity: 12,
        price: 3200
      }
    ],
    totalAmountPHP: 38400,
    paymentMethod: "Card",
    status: "Completed",
    processedBy: "Andrew Ladignon"
  }
];

export const ML_RECOMMENDATION_RULES: Record<string, { complementary: string[]; score: number; reason: string }[]> = {
  "BRK-CP-2044": [
    {
      complementary: ["BRK-RT-5012"],
      score: 98,
      reason: "Carbon Ceramic Brake Rotors are replaced concurrently in 88% of brake maintenance work orders."
    },
    {
      complementary: ["OIL-FS-530"],
      score: 86,
      reason: "Standard multi-point vehicle service bundling protocol."
    }
  ],
  "ENG-08234-PI": [
    {
      complementary: ["OIL-FS-530"],
      score: 96,
      reason: "Complete engine overhaul mandates high-spec break-in synthetic lubricant and gasket kit."
    },
    {
      complementary: ["ELE-54213-EC"],
      score: 91,
      reason: "V8 Piston upgrade requires tuned ECU control mappings for air-fuel ratio balance."
    }
  ],
  "TRN-90128-DC": [
    {
      complementary: ["ELE-54213-EC"],
      score: 94,
      reason: "Dual Clutch Module replacement requires Mechatronic recalibration via ECU terminal."
    }
  ]
};
