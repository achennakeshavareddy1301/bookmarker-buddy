# 🔖 Smart Bookmark Manager

A real-time, private bookmark management app built with **Next.js App Router + Supabase**.
Users can authenticate via Google, store personal bookmarks, and see live updates across tabs without refreshing.

---

## 🚀 Live Demo



**Test Instructions:**

1. Sign in using Google
2. Add bookmarks
3. Open another tab → see realtime sync
4. Delete bookmarks → instant update

---

## 🧱 Tech Stack

| Layer      | Technology                      |
| ---------- | ------------------------------- |
| Framework  | Next.js 14 (App Router)         |
| Language   | TypeScript                      |
| Styling    | Tailwind CSS                    |
| Auth       | Supabase Google OAuth           |
| Database   | Supabase Postgres               |
| Realtime   | Supabase Realtime Subscriptions |
| Deployment | Vercel                          |

---

## ✨ Features

* 🔐 Google OAuth Authentication (Supabase)
* 👤 User-private bookmarks (Row Level Security)
* ➕ Add bookmark (Title + URL)
* 🗑️ Delete bookmark
* 🔄 Realtime sync across tabs
* 🛡️ Protected dashboard routes
* 📱 Responsive UI

---

## 📂 Project Structure

```
/app
  /login
  /dashboard
  layout.tsx
/components
  Navbar.tsx
  AddBookmarkForm.tsx
  BookmarkList.tsx
  BookmarkItem.tsx
/lib
  supabaseClient.ts
/types
  bookmark.ts
```

---

## 🗄️ Database Schema

**Table: bookmarks**

| Column     | Type                   |
| ---------- | ---------------------- |
| id         | uuid (PK)              |
| user_id    | uuid (FK → auth.users) |
| title      | text                   |
| url        | text                   |
| created_at | timestamp              |

---

## 🔐 Security (RLS Policies)

Row Level Security ensures privacy:

* Users can **insert** only their bookmarks
* Users can **select** only their bookmarks
* Users can **delete** only their bookmarks

---

## ⚙️ Environment Variables

Create `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

---

## 🧪 Local Development

```bash
git clone https://github.com/yourusername/smart-bookmarks.git

cd smart-bookmarks

npm install

npm run dev
```

App runs on:

```
http://localhost:3000
```

---

## 🔄 Realtime Implementation

Used Supabase Realtime channels:

* Subscribed to `bookmarks` table
* Listened for:

  * INSERT
  * DELETE
* Filtered by `user_id`
* Updated UI state instantly

Result:
Two tabs stay perfectly in sync without refresh.

---

## 🚧 Challenges Faced & Solutions

### 1️⃣ OAuth Redirect Issues on Vercel

**Problem:**
Google login worked locally but failed after deployment due to redirect mismatch.

**Solution:**

* Added Vercel URL in Supabase Auth → Redirect URLs
* Updated Google Cloud OAuth redirect config

---

### 2️⃣ Session Persistence in App Router

**Problem:**
User session was lost on refresh in protected routes.

**Solution:**

* Used Supabase auth helpers
* Implemented client session check in layout
* Added conditional redirects

---

### 3️⃣ Realtime Events Firing for All Users

**Problem:**
Realtime subscription returned events for every user.

**Solution:**

* Added `user_id` filtering in subscription
* Synced only authenticated user data

---

### 4️⃣ Optimistic UI for Deletion

**Problem:**
UI lag after deleting bookmark.

**Solution:**

* Implemented optimistic state update
* Synced with realtime fallback

---

### 5️⃣ URL Validation

**Problem:**
Invalid links were being stored.

**Solution:**

* Added regex URL validation
* Disabled submit on invalid input

---

## 📈 Performance Considerations

* Client-side Supabase queries
* Minimal re-renders via component isolation
* Realtime channel cleanup on unmount
=

## 🧑‍💻 Author

**Name:** Ayyaluri chennakeshava Reddy


---
