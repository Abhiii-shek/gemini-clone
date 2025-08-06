# Gemini Frontend Clone – Kuvaka Tech Assignment

A full-stack Gemini-inspired frontend clone built with **Next.js 15**, **Tailwind CSS**, **Zustand**, and **TypeScript**. It includes OTP login, chatroom simulation with AI responses, image upload, pagination, debounced search, and real-time UX enhancements.

## 🌐 Live Demo

🔗 [Live Site](https://gemini-clone-562othte7-rajbharabhishek84912-gmailcoms-projects.vercel.app)  


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
```
##Screenshots


<img width="1352" height="595" alt="gemini-1" src="https://github.com/user-attachments/assets/37be1604-28e0-4e51-bbda-1a2d99259854" />
<img width="1358" height="216" alt="gemini-2" src="https://github.com/user-attachments/assets/097dc7a2-9a9a-471f-a83d-6b9d0784b06e" />
<img width="1298" height="574" alt="GEMINI-3" src="https://github.com/user-attachments/assets/9fd45bb1-1ce1-49b0-890b-f30091e0ad55" />
