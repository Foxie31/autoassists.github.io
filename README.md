# AutoAssist: Auto Parts Recommendation & Sales Optimization System

AutoAssist is a web-based inventory and sales management platform equipped with machine learning recommendations and predictive demand forecasting for high-performance automotive parts.

## 🚀 Key Features

- **Role-Based Access Control (RBAC)**: Distinct permissions and views for **Staff** (Andrew Ladignon), **Manager** (Shaine Banadera), and **Admin** (Justin Morala).
- **Inventory Terminal**: Stock level monitoring with reorder thresholds, fast/slow velocity tracking, category filters, and quick Stock-In / Stock-Out dispatches.
- **Sales Management**: Real-time transaction records, customer details, and invoice generation.
- **Critical Stock Radar**: Instant alerts on critical components requiring restock.
- **Logistics Intelligence & Shipment Manifest**: Consignment status tracking (`IN TRANSIT`, `DELIVERED`, `DELAYED`) with PDF/CSV export.
- **Machine Learning Engine**: Powered by Scikit-learn algorithms & Gemini AI for prescriptive part recommendations and weekly demand forecasting.

---

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS, Lucide React, Motion
- **Backend / API**: Node.js, Express, Vite, `@google/genai`
- **Port**: `3000`

---

## 💻 How to Run on Another Computer

### 1. Prerequisites
- **Node.js** (v18 or higher recommended)
- **Git**

### 2. Clone the Repository
```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd <repository-directory>
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Start the Development Server
```bash
npm run dev
```

The application will start on:
```
http://localhost:3000
```

---

## 🌐 Deploying to GitHub Pages

If deploying to **GitHub Pages** (e.g., `https://<username>.github.io/<repo>/`):

1. **Vite Base Path**: This repository already has `base: './'` configured in `vite.config.ts` so relative asset paths load correctly without blank screen errors.
2. **Enable GitHub Actions Deployment**:
   - In your GitHub repository, go to **Settings** > **Pages**.
   - Under **Build and deployment** > **Source**, select **GitHub Actions**.
   - GitHub will automatically run the included `.github/workflows/deploy.yml` workflow, build the app, and publish it live!
3. **Alternative - Push pre-built files**:
   If deploying directly from a branch, build the project first using `npm run build` and publish the generated `dist` folder.

---

## 👥 Default Accounts

You can switch between roles in real time using the profile menu on the top right:
- **Staff (Default)**: Andrew Ladignon (`Ladignon@autoassist.ai`) — Operational terminal, sales creation, stock intake/dispatch.
- **Manager**: Shaine Banadera (`s.banadera@autoassist.ai`) — Approval workflows, logistics oversight.
- **Admin**: Justin Morala (`morala@autoassist.ai`) — Full administrative clearance, user management, and AI system configuration.
