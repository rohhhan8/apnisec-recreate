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


# 📘 Technical Architecture & Design Decisions

## 1. Architectural Philosophy: Strict OOP
The core requirement of this assignment was to utilize **Object-Oriented Programming**. While Next.js is traditionally functional, I implemented a robust **Hexagonal (Layered) Architecture** to satisfy this requirement and demonstrate enterprise readiness.

### The 3-Layer Flow
Data flows strictly in one direction, ensuring that the API layer never touches the database directly.

**`Handler` (HTTP Layer)**
* **Responsibility:** Parsing requests, validating inputs (Zod), and formatting JSON responses.
* **OOP Trait:** Extends `BaseHandler` for standardized error handling.
* *File:* `src/backend/handlers/IssueHandler.ts`

**`Service` (Business Logic Layer)**
* **Responsibility:** The "Brain". Handles Rate Limiting checks, Email triggers, and Audit Logging.
* **OOP Trait:** Uses **Dependency Injection** to receive Repositories. Implements strict Interfaces.
* *File:* `src/backend/services/IssueService.ts`

**`Repository` (Data Access Layer)**
* **Responsibility:** Pure database interactions.
* **OOP Trait:** Extends a generic `BaseRepository<T>` to avoid repetitive CRUD code (DRY Principle).
* *File:* `src/backend/repositories/IssueRepository.ts`

---

## 2. Design Patterns Implemented

### A. Singleton Pattern (Rate Limiter)
* **Problem:** Next.js route handlers are stateless. A simple variable would reset on every request.
* **Solution:** I implemented the `RateLimiter` class as a **Singleton**. This ensures that the `Map` storing IP request counts persists in memory as long as the serverless container is warm.
* **Benefit:** Efficient, O(1) tracking of request limits without needing an external Redis cache for this MVP.

### B. Repository Pattern
* **Problem:** Tying code directly to `prisma.issue.findMany` makes it hard to test or switch databases later.
* **Solution:** All DB calls are wrapped in Repository classes. The Service layer asks for data, it doesn't care *how* it's fetched.

### C. Dependency Injection (DI)
* **Problem:** Hard-coding dependencies (e.g., `new EmailService()`) inside classes makes them tightly coupled.
* **Solution:** Dependencies are passed into the `constructor`.

---

## 3. Security Implementation

### Custom Authentication (No Auth0/Clerk)
I built a secure auth system from scratch to demonstrate core backend understanding:
1.  **Hashing:** Passwords are salted and hashed using `bcrypt` before storage.
2.  **Transport:** JWTs are **never** sent in the Response Body. They are set strictly as `HttpOnly`, `Secure` cookies to prevent XSS attacks.
3.  **Middleware:** A Next.js Edge Middleware intercepts every request to protected routes, verifies the JWT signature using `jose`, and injects the User ID into headers for the backend to use.

### Rate Limiting
To prevent DDoS or spam:
* **Algorithm:** Fixed Window Counter.
* **Limit:** 100 requests per 15 minutes per IP.
* **Implementation:** A high-performance `Map<string, { count, expiry }>` checks every write request before it processes.

### Soft Deletes
Data integrity is critical in cybersecurity.
* The `DELETE` API does not remove the row.
* It sets a `deletedAt` timestamp.
* The Repository automatically filters out these rows for normal queries, preserving the audit trail.


-----

## 📜 License
This project is submitted as part of the ApniSec SDE Internship assignment.
