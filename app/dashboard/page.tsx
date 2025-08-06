'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/authStore'
import toast from 'react-hot-toast'


export default function Dashboard() {
  const { phone, logout } = useAuthStore()
  const router = useRouter()
  const [chatrooms, setChatrooms] = useState<string[]>([])
  const [title, setTitle] = useState('')

  useEffect(() => {
    if (!phone) router.push('/login')
    const saved = JSON.parse(localStorage.getItem('chatrooms') || '[]')
    setChatrooms(saved)
  }, [])

  const addChatroom = () => {
    if (!title.trim()) return
    const updated = [...chatrooms, title.trim()]
    setChatrooms(updated)
    localStorage.setItem('chatrooms', JSON.stringify(updated))
    toast.success('Chatroom created!')
    setTitle('')
  }

  const deleteChatroom = (name: string) => {
    const updated = chatrooms.filter(c => c !== name)
    setChatrooms(updated)
    localStorage.setItem('chatrooms', JSON.stringify(updated))
    toast.success('Chatroom deleted!')
}

  return (
    <div className="p-6">

      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Welcome, {phone}</h1>
        <button onClick={() => { logout(); router.push('/login') }} className="text-sm text-red-500">Logout</button>
      </div>
      <div className="mb-4">
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Chatroom title"
          className="border p-2 mr-2"
        />
        <button onClick={addChatroom} className="bg-blue-500 text-white px-4 py-2">Create</button>
      </div>
      <ul>
        {chatrooms.map((c, i) => (
          <li key={i} className="flex justify-between border p-2 mb-2">
            <span>{c}</span>
            <div>
              <button onClick={() => router.push(`/chatroom/${i}`)} className="mr-2 text-green-500">Open</button>
              <button onClick={() => deleteChatroom(c)} className="text-red-500">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
