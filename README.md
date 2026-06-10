<p align="center">
  <img src="https://img.shields.io/badge/Node.js-339933?logo=nodedotjs&logoColor=white&style=for-the-badge" alt="Node.js">
  <img src="https://img.shields.io/badge/Express.js-000000?logo=express&logoColor=white&style=for-the-badge" alt="Express.js">
  <img src="https://img.shields.io/badge/MySQL-4479A1?logo=mysql&logoColor=white&style=for-the-badge" alt="MySQL">
  <img src="https://img.shields.io/badge/JWT-000000?logo=jsonwebtokens&logoColor=white&style=for-the-badge" alt="JWT">
  <img src="https://img.shields.io/badge/EJS-B4CA65?logo=ejs&logoColor=black&style=for-the-badge" alt="EJS">
</p>

<p align="center">
  <strong>VenuePilot</strong> — A lightweight event management dashboard built with Express.js, MySQL & JWT.
</p>

<p align="center">
  <a href="#features">Features</a> ·
  <a href="#tech-stack">Tech Stack</a> ·
  <a href="#project-structure">Structure</a> ·
  <a href="#getting-started">Getting Started</a> ·
  <a href="#api-reference">API</a> ·
  <a href="#license">License</a>
</p>

---

<p align="center">
  <img width="100%" alt="VenuePilot Dashboard Preview" src="https://raw.githubusercontent.com/AndrewBalda01/VENUEPILOT/main/screenshot.png">
</p>

<p align="center"><em>VenuePilot — Plan and manage venue events in one place</em></p>

---

## Features

| Area | Details |
|------|---------|
| **Public Landing** | Hero section, feature showcase, preview mockup, integrated login form |
| **Authentication** | JWT-based auth with bcrypt password hashing and HttpOnly cookies |
| **Dashboard** | KPI cards (total events, upcoming, sold out) with real-time stats |
| **Event CRUD** | Full create, read, update, delete with search by title and filter by status |
| **UI/UX** | Dark refined theme, sidebar navigation, responsive modals, badge system |

## Tech Stack

```
Backend     Node.js + Express.js
Database    MySQL 8+ (mysql2 with connection pooling)
Auth        JWT (jsonwebtoken) + bcrypt
Views       EJS templates with partials
Styling     Custom CSS (no frameworks)
Client JS   Vanilla JavaScript (Fetch API)
```

## Project Structure

```
VENUEPILOT/
├── server.js                     # Express entry point
├── setup-db.js                   # One-shot database setup script
│
├── config/
│   └── db.js                     # MySQL connection pool
│
├── controllers/
│   ├── authController.js         # Login, logout, session management
│   └── eventController.js        # Dashboard stats + full event CRUD
│
├── middleware/
│   └── auth.js                   # JWT verification middleware
│
── routes/
│   ├── auth.js                   # Public routes: /, /login, /logout
│   └── events.js                 # Protected routes: /dashboard, /api/events
│
├── views/
│   ├── index.ejs                 # Landing page with login form
│   ├── partials/
│   │   └── sidebar.ejs           # Shared dashboard sidebar component
│   └── dashboard/
│       ├── index.ejs             # Dashboard overview with KPIs
│       └── events.ejs            # Events management (table + modals)
│
├── public/
│   ├── css/
│   │   ├── landing.css           # Landing page styles
│   │   └── dashboard.css         # Dashboard & admin panel styles
│   └── js/
│       └── dashboard.js          # Client-side CRUD interactions
│
├── database/
│   └── setup.sql                 # Schema + seed data
│
├── .env.example                  # Environment template
── .gitignore
├── DISCLAIMER.md                 # Security & educational disclaimer
├── LICENSE                       # MIT License
└── README.md
```

## Getting Started

### Prerequisites

- **Node.js** 18+
- **MySQL** 8+

### 1. Install

```bash
git clone https://github.com/AndrewBalda01/VENUEPILOT.git
cd VENUEPILOT
npm install
```

### 2. Configure

```bash
cp .env.example .env
```

Edit `.env` with your MySQL credentials:

```env
PORT=3000
JWT_SECRET=your-secret-key-change-this
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=venuepilot
```

### 3. Setup Database

```bash
node setup-db.js
```

This creates the `venuepilot` database, both tables (`users`, `events`), and seeds demo data.

### 4. Run

```bash
npm start
```

Open **http://localhost:3000**

### Demo Credentials

| Field | Value |
|-------|-------|
| Email | `admin@venuepilot.com` |
| Password | `admin123` |

## API Reference

### Public Routes

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| `GET` | `/` | — | Landing page with login |
| `POST` | `/login` | — | Authenticate (sets HttpOnly cookie) |
| `POST` | `/logout` | ✓ | Destroy session |

### Protected Routes

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/dashboard` | Dashboard overview with KPIs |
| `GET` | `/dashboard/events` | Events list with search & filter |
| `POST` | `/api/events` | Create new event (JSON) |
| `GET` | `/api/events/:id` | Get single event (JSON) |
| `PUT` | `/api/events/:id` | Update event (JSON) |
| `DELETE` | `/api/events/:id` | Delete event (JSON) |

### Event Statuses

- `Draft` — Event is being planned
- `Scheduled` — Event is confirmed
- `Sold Out` — Event reached capacity
- `Completed` — Event has taken place

## Educational Purpose

> This project was built as a **hands-on exercise** to test and deepen skills in:
>
> - **Express Middleware** — auth, error handling, route protection
> - **REST API Design** — CRUD operations, routing, error responses
> - **MySQL Integration** — schema design, connection pooling, parameterized queries
> - **JWT Authentication** — token generation, HttpOnly cookies, middleware verification
> - **MVC Architecture** — clean separation of controllers, routes, views
> - **Server-Side Rendering** — EJS templates, partials, dynamic layouts
> - **Vanilla Frontend** — Fetch API, modal management, DOM manipulation

See [DISCLAIMER.md](./DISCLAIMER.md) for security and usage notes.

## License

MIT — see [LICENSE](./LICENSE).

---

<p align="center">
  Built with  by <a href="https://github.com/AndrewBalda01">AndrewBalda01</a>
</p>
