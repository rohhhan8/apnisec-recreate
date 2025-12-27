# 🛡️ ApniSec Client Portal

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue?style=for-the-badge&logo=typescript)
![Prisma](https://img.shields.io/badge/Prisma-ORM-teal?style=for-the-badge&logo=prisma)
![Tailwind](https://img.shields.io/badge/Tailwind-CSS-cyan?style=for-the-badge&logo=tailwindcss)

> **Enterprise-grade Vulnerability Management System.**
> A secure, scalable portal for clients to request VAPT, Cloud Security, and Reteam assessments.

---

## 🚀 Project Overview

This project is a **Full-Stack Next.js Application** built with strict adherence to **Object-Oriented Programming (OOP)** principles. Unlike standard functional Next.js apps, this backend uses a **3-Layer Architecture** (Handler → Service → Repository) to ensure scalability, testability, and separation of concerns.

The platform includes custom-built authentication, rate limiting, and audit logging systems—no third-party "black box" auth providers were used.

## ✨ Key Features

### 🔐 Security First
* **Custom Authentication:** Built from scratch using **HTTP-Only Cookies**, `bcrypt` hashing, and `jose` (JWT). No localStorage tokens.
* **Rate Limiting:** Custom Token Bucket algorithm enforcing **100 requests / 15 mins** per IP (O(1) complexity).
* **RBAC:** Strict Role-Based Access Control distinguishing between `ADMIN` and `CLIENT` access.

### 🏗️ Advanced Architecture
* **Strict OOP:** All business logic is encapsulated in Classes.
* **Repository Pattern:** Database logic is isolated, allowing for easy ORM swaps or mocking.
* **Singleton Pattern:** Used for the Rate Limiter to maintain state across serverless function warm starts.

### 💻 User Experience
* **Immersive UI:** Built with **Framer Motion** for high-performance animations.
* **Real-Time Feedback:** Instant updates on issue creation and status changes.
* **SEO Optimized:** Scoring 90+ on Lighthouse with dynamic metadata.

---

## 🛠️ Tech Stack

* **Framework:** Next.js 15 (App Router)
* **Language:** TypeScript (Strict Mode)
* **Database:** PostgreSQL (via NeonDB)
* **ORM:** Prisma
* **Styling:** Tailwind CSS + Lucide Icons
* **Email:** Resend API

---

## ⚡ Getting Started

### 1. Clone & Install
```bash
git clone https://github.com/rohhhan8/apnisec-recreate.git
cd apnisec-recreate
npm install
```

### 2. Configure Environment
Create a `.env` file in the root directory:

```bash
DATABASE_URL="postgresql://user:password@host/neondb"
JWT_SECRET="super-secure-secret-key-change-me"
RESEND_API_KEY="re_123_your_resend_key"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 3. Database Setup
```bash
npx prisma db push
```

### 4. Run Development Server
```bash
npm run dev
```
Visit http://localhost:3000 to see the application.

---

## 📜 License
This project is submitted as part of the ApniSec SDE Internship assignment.
