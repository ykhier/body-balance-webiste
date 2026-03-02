# 🚀 Project Name

Modern Full-Stack Web Application built with Next.js 14, TypeScript and TailwindCSS.

---

# 📌 Overview

This project is a production-ready web application built using modern technologies.

## ✨ Features

- ⚡ Fast performance with Next.js 14 (App Router)
- 🎨 Beautiful UI with TailwindCSS + shadcn/ui
- 🌙 Dark / Light Mode support
- 🔐 Secure environment variables handling
- 🧠 API routes for backend logic
- 📦 Ready for deployment on Vercel

---

# 🛠 Tech Stack

- Next.js 14 (App Router)
- TypeScript
- TailwindCSS
- shadcn/ui
- next-themes (Dark Mode)
- Prisma (if used)
- PostgreSQL / Firebase (if used)
- Vercel

---

# 📂 Project Structure

```
src/
 ├── app/
 │   ├── api/
 │   ├── admin/
 │   └── page.tsx
 ├── components/
 ├── lib/
 └── styles/
```

---

# ⚙️ Installation

## 1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
```

## 2️⃣ Install dependencies

```bash
npm install
```

## 3️⃣ Run locally

```bash
npm run dev
```

App runs on:

```
http://localhost:3000
```

---

# 🔐 Environment Variables

Create a `.env` file in the root directory:

```
DATABASE_URL=your_database_url
ADMIN_USERNAME=your_admin_username
ADMIN_PASSWORD=your_secure_password
```

⚠️ Never commit your `.env` file to GitHub.

---

# 🌙 Dark Mode

This project supports Dark / Light mode using:

- next-themes
- Tailwind darkMode: "class"

Theme selection is automatically saved in localStorage.

---

# 🧑‍💻 Admin Panel

Route:

```
/admin
```

## Admin Features

- 🔑 Secure login (stored in ENV)
- 📥 View contact submissions
- ✅ Mark submissions as handled
- 🗑 Delete records
- 📊 Filter by date

---

# 🚀 Deployment (Vercel)

Push your project to GitHub, then:

1. Go to https://vercel.com
2. Import your repository
3. Add your Environment Variables
4. Deploy

---

# 📜 License

This project is for educational / commercial use.

---

# 👨‍💻 Author

Developed by Yosef Khier  
Software Engineering Student  
