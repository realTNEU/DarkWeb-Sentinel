# 🛡️ DarkWeb Sentinel — Test-Level Prototype

DarkWeb Sentinel is a proof-of-concept cybersecurity platform that monitors the dark web and breach databases to alert users when their personal data (email, phone, or username) appears in leaked dumps.

This test-level build includes:
- 🔐 User authentication (JWT-based)
- 📥 Identity tracking (email, phone, username)
- 📡 Scraper engine with local dump + API simulation
- ⚠️ Real-time alert integration
- 📊 Dashboard for visualization
- 📤 Frontend in React + Tailwind CSS

---

## 🧪 Features Implemented in Test Version

- **Authentication**
  - JWT Login / Signup
  - Secure password hashing

- **Identity Tracking**
  - Add/delete tracked email, phone, or username
  - Stores hashed versions securely

- **Scraper Engine (Node.js based)**
  - Scans local `leaks.html`
  - Matches identities and triggers alerts
  - Includes test trigger endpoint: `POST /test-alert`

- **Alert System**
  - Alerts saved to MongoDB and displayed on dashboard
  - Simulated breach source tags
  - Scraper is auto-triggered on identity addition

- **Frontend UI**
  - Hero landing page with particle animation
  - Dashboard with tracked identities, recent alerts, breach timeline
  - Responsive and dark-themed UI

---

## 🛠️ Tech Stack

- **Frontend:** React, TailwindCSS, React Icons
- **Backend:** Node.js, Express, MongoDB, JWT
- **Scraper:** Node.js (cron + static file parsing)
- **Alerts:** REST API + MongoDB
- **Testing Dataset:** Custom `leaks.html` file

---

## 🚀 How to Run

```bash
# Backend
cd server
npm install
npm run dev

# Frontend
cd client
npm install
npm run dev

# Scraper
cd scraper
npm install
node index.js
node devServer.js
