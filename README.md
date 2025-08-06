# Gemini Frontend Clone – Kuvaka Tech Assignment

A full-stack Gemini-inspired frontend clone built with **Next.js 15**, **Tailwind CSS**, **Zustand**, and **TypeScript**. It includes OTP login, chatroom simulation with AI responses, image upload, pagination, debounced search, and real-time UX enhancements.

## 🌐 Live Demo

🔗 [Live Site](https://gemini-clone-562othte7-rajbharabhishek84912-gmailcoms-projects.vercel.app)  
*(Replace with your actual Vercel/Netlify/GitHub Pages link)*

---

## 🚀 Features

- ✅ OTP-based login with validation
- ✅ Chatroom with message simulation and image uploads
- ✅ Infinite scroll for chat messages (reverse scroll)
- ✅ Chatroom pagination with dynamic filtering
- ✅ Debounced search bar
- ✅ Zustand for global state
- ✅ Type-safe forms via Zod + React Hook Form
- ✅ Client-side routing with Next.js App Router

---
##  Structure
app/
├── dashboard/           → Chatroom list 
├── chatroom/[id]/       → Dynamic chatroom UI
├── login/               → OTP login screen
store/
├── authStore.ts         → Zustand store for auth state
├── chatStore.ts         → Zustand store for message state
components/
├── UI Components        → (Optional splitting if added)

##infinite scroll (Reverse chat)
if (container.scrollTop === 0) {
  loadMoreMessages()
}

 Pagination (Dashboard)

    Implemented client-side in dashboard/page.tsx.

    Fetches 10 chatrooms per page.

    Maintains currentPage and disables next/prev based on page limits.


## 🛠 Setup Instructions

```bash
# 1. Clone the repo
git clone https://github.com/your-username/gemini-frontend-clone.git
cd gemini-frontend-clone

# 2. Install dependencies
npm install




# 3. Run dev server
npm run dev
