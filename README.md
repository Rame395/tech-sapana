# TechSapana 🚀

TechSapana is a modern, high-performance web platform built for a technology and software development company focused on transforming commercial concepts into reliable digital products and providing top-tier tech education. 

This repository contains the full source code for the public-facing website, as well as a fully integrated **Custom Content Management System (CMS)** and **Admin Panel** to manage everything dynamically.

---

## 🛠️ Technology Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) & Vanilla CSS
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Database:** SQLite (managed via [Prisma ORM](https://www.prisma.io/))
- **Authentication:** [NextAuth.js](https://next-auth.js.org/) (Secure credential-based login)
- **Typography:** [Inter](https://fonts.google.com/specimen/Inter) (UI/Branding) & [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono) (Code/Technical)
- **Icons:** [Lucide React](https://lucide.dev/)

---

## ✨ Key Features

### 🌐 Public Website
- **Dynamic Content:** Real-time fetching of Portfolio Projects, Courses, Blog Posts, and FAQs directly from the database.
- **Premium UI/UX:** Built with a state-of-the-art aesthetic, featuring smooth micro-animations, glassmorphism, and neon-glow accents.
- **Dark/Light Mode:** Seamless, global theme switching with carefully curated color tokens for both environments.
- **Global SEO:** Automated, dynamic metadata generation synced directly from the Admin Panel.

### 🛡️ Secure Admin Panel & CMS
A fully custom-built dashboard (`/admin`) accessible only to authenticated users, providing CRUD capabilities for:
- **Global Settings:** Dynamically update company contact info (Phone, Email, Address, Operating Hours) and global SEO Metadata. Includes secure admin password resetting.
- **Promo Banners:** Toggle and edit site-wide promotional banners (e.g., flash sales, new courses).
- **Blog Management:** Create, edit, publish, and delete blog articles with rich HTML support.
- **Course Academy:** Manage tech courses, pricing, badges, and scheduling.
- **Portfolio:** Showcase latest client projects, technologies used, and client feedback.
- **FAQ:** Manage frequently asked questions easily.

---

## 🚀 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### 1. Clone the repository
```bash
git clone https://github.com/Rame395/tech-sapana.git
cd tech-sapana
```

### 2. Install dependencies
```bash
npm install
```

### 3. Setup the Database
This project uses Prisma with SQLite for easy setup. First, generate the Prisma client and push the schema to the database:
```bash
npx prisma generate
npx prisma db push
```

*(Optional)* You can seed the database or view your data using Prisma Studio:
```bash
npx prisma studio
```

### 4. Configure Environment Variables
Create a `.env` file in the root directory and add the necessary environment variables. Example:
```env
# Secret for NextAuth (generate one using `openssl rand -base64 32`)
NEXTAUTH_SECRET="your-super-secret-key"
NEXTAUTH_URL="http://localhost:3000"
```

### 5. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## 📁 Project Structure

- `src/app/` - Next.js App Router (Pages, Layouts, API Routes)
- `src/components/` - Reusable React components (Navbar, Footer, Forms, UI Elements)
- `src/lib/` - Utility functions and Prisma client setup
- `prisma/` - Prisma schema (`schema.prisma`) and SQLite database file

---

## 🎨 Typography & Design System

TechSapana uses a dual-font system to achieve a professional, enterprise-grade software aesthetic:
- **Inter:** The primary Sans-Serif font used for all main headings, body text, and UI elements.
- **JetBrains Mono:** A specialized monospace font used for badges, tags, metrics, and technical data.

Primary Button Structure:
All primary actions utilize strict contrast enforcing (`!text-white`) over `bg-blue-600` to guarantee high legibility across both light and dark themes.

---

## 📝 License

This project is proprietary and confidential. Unauthorized copying of this repository, via any medium, is strictly prohibited.
