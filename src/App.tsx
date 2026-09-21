import React, { useState } from "react";
import { Sidebar } from "./components/Sidebar";
import { TopBar } from "./components/TopBar";
import { LoginView } from "./components/LoginView";
import { DashboardView } from "./components/DashboardView";
import { InventoryView } from "./components/InventoryView";
import { InventoryEditModal } from "./components/InventoryEditModal";
import { StockInOutModal } from "./components/StockInOutModal";
import { SalesView } from "./components/SalesView";
import { NewSaleModal } from "./components/NewSaleModal";
import { ReportsView } from "./components/ReportsView";
import { SettingsView } from "./components/SettingsView";
import { CreateUserModal } from "./components/CreateUserModal";
import { MLEngineModal } from "./components/MLEngineModal";

import { 
  User, 
  UserRole, 
  InventoryItem, 
  SalesRecord, 
  ShipmentManifestItem, 
  MonthlySalesPoint, 
  DemandForecastDataPoint 
} from "./types";
import { 
  INITIAL_USERS, 
  INITIAL_INVENTORY, 
  INITIAL_SALES, 
  INITIAL_SHIPMENTS, 
  INITIAL_SALES_POINTS, 
  DEMAND_FORECAST_POINTS 
} from "./data/initialData";

export default function App() {
  // Navigation & User State - Initialized to Andrew Ladignon (Staff) as requested
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [users, setUsers] = useState<User[]>(INITIAL_USERS);
  const [currentUser, setCurrentUser] = useState<User>(INITIAL_USERS[2]); // Default to Andrew Ladignon (STAFF)
  const [activeTab, setActiveTab] = useState<"dashboard" | "inventory" | "sales" | "reports" | "settings">("dashboard");
  const [searchTerm, setSearchTerm] = useState("");

  // Data Store State
  const [inventory, setInventory] = useState<InventoryItem[]>(INITIAL_INVENTORY);
  const [sales, setSales] = useState<SalesRecord[]>(INITIAL_SALES);
  const [shipments, setShipments] = useState<ShipmentManifestItem[]>(INITIAL_SHIPMENTS);
  const [salesPoints, setSalesPoints] = useState<MonthlySalesPoint[]>(INITIAL_SALES_POINTS);
  const [forecastPoints, setForecastPoints] = useState<DemandForecastDataPoint[]>(DEMAND_FORECAST_POINTS);

  // Modal Visibility State
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<InventoryItem | null>(null);

  const [isStockInOutOpen, setIsStockInOutOpen] = useState(false);
  const [stockInOutType, setStockInOutType] = useState<"IN" | "OUT">("IN");
  const [stockInOutSku, setStockInOutSku] = useState<string | undefined>(undefined);

  const [isNewSaleOpen, setIsNewSaleOpen] = useState(false);
  const [isCreateUserOpen, setIsCreateUserOpen] = useState(false);
  const [isMLEngineOpen, setIsMLEngineOpen] = useState(false);

  // Toast message state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Switch Active User / Role
  const handleSelectUser = (user: User) => {
    setCurrentUser(user);
    showToast(`Active profile switched to ${user.fullName} (${user.role})`);
  };

  // Login handler
  const handleLogin = (user: User) => {
    setCurrentUser(user);
    setIsLoggedIn(true);
    showToast(`Welcome back, ${user.fullName}. Terminal unlocked.`);
  };

  const handleSignOut = () => {
    setIsLoggedIn(false);
  };

  // Inventory Actions
  const handleOpenEditItem = (item: InventoryItem) => {
    setEditingItem(item);
    setIsEditModalOpen(true);
  };

  const handleAddNewItem = () => {
    setEditingItem(null);
    setIsEditModalOpen(true);
  };

  const handleSaveInventoryItem = (itemToSave: InventoryItem) => {
    setInventory(prev => {
      const exists = prev.some(i => i.id === itemToSave.id);
      if (exists) {
        return prev.map(i => i.id === itemToSave.id ? itemToSave : i);
      }
      return [itemToSave, ...prev];
    });
    showToast(`Component [${itemToSave.sku}] successfully updated.`);
  };

  // Stock In / Out
  const handleOpenStockIn = (sku?: string) => {
    setStockInOutType("IN");
    setStockInOutSku(sku);
    setIsStockInOutOpen(true);
  };

  const handleOpenStockOut = (sku?: string) => {
    setStockInOutType("OUT");
    setStockInOutSku(sku);
    setIsStockInOutOpen(true);
  };

  const handleConfirmStockOperation = (sku: string, quantity: number, notes: string) => {
    setInventory(prev => prev.map(item => {
      if (item.sku === sku) {
        const newStock = stockInOutType === "IN"
          ? item.stockLevel + quantity
          : Math.max(0, item.stockLevel - quantity);
        return { ...item, stockLevel: newStock };
      }
      return item;
    }));
    showToast(`${stockInOutType === "IN" ? "Received +" : "Dispatched -"}${quantity} units for SKU ${sku}.`);
  };

  // Sales Actions
  const handleCompleteSale = (saleData: Omit<SalesRecord, "id">) => {
    const newRecord: SalesRecord = {
      ...saleData,
      id: `sale-${Date.now()}`
    };

    setSales([newRecord, ...sales]);

    // Deduct stock for items in cart
    saleData.items.forEach(cartItem => {
      setInventory(prev => prev.map(item => {
        if (item.id === cartItem.itemId || item.sku === cartItem.sku) {
          return {
            ...item,
            stockLevel: Math.max(0, item.stockLevel - cartItem.quantity),
            velocityChangePercent: item.velocityChangePercent + 2
          };
        }
        return item;
      }));
    });

    // Update monthly sales revenue
    setSalesPoints(prev => {
      const copy = [...prev];
      if (copy.length > 0) {
        copy[copy.length - 1].revenuePHP += saleData.totalAmountPHP;
      }
      return copy;
    });

    showToast(`Order #${newRecord.orderNumber} dispatched. ₱${saleData.totalAmountPHP.toLocaleString()} recorded.`);
  };

  // User Management Actions
  const handleCreateUser = (newUserData: Omit<User, "id">) => {
    const created: User = {
      ...newUserData,
      id: `usr-${Date.now()}`
    };
    setUsers([...users, created]);
    showToast(`New team member ${created.fullName} (${created.role}) provisioned.`);
  };

  const handleUpdateUserRole = (userId: string, newRole: UserRole) => {
    setUsers(prev => prev.map(u => {
      if (u.id === userId) {
        const displayRole = newRole === "ADMIN" ? "Admin" : newRole === "MANAGER" ? "Manager" : "Staff";
        return { ...u, role: newRole, displayRole };
      }
      return u;
    }));
    showToast(`Role updated to ${newRole}`);
  };

  const handleToggleUserStatus = (userId: string) => {
    setUsers(prev => prev.map(u => {
      if (u.id === userId) {
        const nextStatus = u.status === "Active" ? "Offline" : "Active";
        return { ...u, status: nextStatus };
      }
      return u;
    }));
  };

  const handleDeleteUser = (userId: string) => {
    setUsers(prev => prev.filter(u => u.id !== userId));
    showToast(`User account revoked.`);
  };

  // If logged out, render the Login Terminal matching mockup Image 1
  if (!isLoggedIn) {
    return (
      <LoginView
        onLogin={handleLogin}
        availableUsers={users}
      />
    );
  }

  return (
    <div className="flex h-screen w-full bg-[#f8fafc] text-slate-900 overflow-hidden font-sans antialiased selection:bg-[#3be3b8] selection:text-slate-950">
      {/* Toast Notification Container */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-xs font-semibold px-4 py-3 rounded-2xl shadow-2xl border border-slate-700 flex items-center gap-2 animate-in slide-in-from-bottom-5">
          <span className="w-2 h-2 rounded-full bg-[#3be3b8] animate-pulse"></span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Persistent Left Sidebar matching mockups */}
      <Sidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        currentUserRole={currentUser.role}
        onLogout={handleSignOut}
        onOpenRecommender={() => setIsMLEngineOpen(true)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        {/* Top bar with quick user switcher, search, notifications */}
        <TopBar
          currentUser={currentUser}
          allUsers={users}
          onSwitchUser={handleSelectUser}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />

        {/* Dynamic Page Views */}
        <main className="flex-1 overflow-y-auto bg-[#f8fafc]">
          {activeTab === "dashboard" && (
            <DashboardView
              inventory={inventory}
              currentUserRole={currentUser.role}
              onNavigateTab={setActiveTab}
              onQuickRestock={handleOpenStockIn}
              onOpenRecommender={() => setIsMLEngineOpen(true)}
              onOpenNewSale={() => setIsNewSaleOpen(true)}
            />
          )}

          {activeTab === "inventory" && (
            <InventoryView
              items={inventory}
              currentUserRole={currentUser.role}
              onEditItem={handleOpenEditItem}
              onAddNewItem={handleAddNewItem}
              onStockIn={handleOpenStockIn}
              onStockOut={handleOpenStockOut}
              searchTerm={searchTerm}
            />
          )}

          {activeTab === "sales" && (
            <SalesView
              currentUserRole={currentUser.role}
              salesPoints={salesPoints}
              forecastPoints={forecastPoints}
              inventory={inventory}
              recentSales={sales}
              onOpenNewSale={() => setIsNewSaleOpen(true)}
              onQuickRestock={handleOpenStockIn}
              onOpenRecommender={() => setIsMLEngineOpen(true)}
            />
          )}

          {activeTab === "reports" && (
            <ReportsView
              shipments={shipments}
              onUpdateShipmentStatus={(id, status) => {
                setShipments(prev => prev.map(s => s.id === id ? { ...s, status } : s));
                showToast(`Consignment updated to ${status}`);
              }}
            />
          )}

          {activeTab === "settings" && (
            <SettingsView
              users={users}
              currentUser={currentUser}
              onOpenCreateUser={() => setIsCreateUserOpen(true)}
              onUpdateUserRole={handleUpdateUserRole}
              onToggleUserStatus={handleToggleUserStatus}
              onDeleteUser={handleDeleteUser}
            />
          )}
        </main>
      </div>

      {/* Modals & Slide-ins */}
      <InventoryEditModal
        item={editingItem}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveInventoryItem}
      />

      <StockInOutModal
        isOpen={isStockInOutOpen}
        type={stockInOutType}
        items={inventory}
        defaultSku={stockInOutSku}
        onClose={() => setIsStockInOutOpen(false)}
        onConfirm={handleConfirmStockOperation}
      />

      <NewSaleModal
        isOpen={isNewSaleOpen}
        onClose={() => setIsNewSaleOpen(false)}
        inventory={inventory}
        onCompleteSale={handleCompleteSale}
      />

      <CreateUserModal
        isOpen={isCreateUserOpen}
        onClose={() => setIsCreateUserOpen(false)}
        onCreateUser={handleCreateUser}
      />

      <MLEngineModal
        isOpen={isMLEngineOpen}
        onClose={() => setIsMLEngineOpen(false)}
        inventory={inventory}
        onApplyRestock={handleOpenStockIn}
      />
    </div>
  );
}
