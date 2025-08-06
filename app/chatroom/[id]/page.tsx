'use client'

import { useEffect, useRef, useState } from 'react'
import { useParams } from 'next/navigation'
import { useMessageStore, Message } from '@/store/chatStore'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

export default function ChatroomPage() {
  const { id } = useParams<{ id: string }>()
  const { messages, addMessage, loadInitialMessages, loadMoreMessages } = useMessageStore()

  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [isFetchingMore, setIsFetchingMore] = useState(false)

  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // 🟢 Load dummy initial messages
  useEffect(() => {
    loadInitialMessages()
  }, [])

  // 🟢 Scroll to bottom if user is near bottom
  useEffect(() => {
    if (isNearBottom()) {
      scrollToBottom()
    }
  }, [messages])

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const isNearBottom = (): boolean => {
    const container = scrollContainerRef.current
    if (!container) return false
    return container.scrollHeight - container.scrollTop - container.clientHeight < 100
  }

  const handleScroll = () => {
    const container = scrollContainerRef.current
    if (!container || isFetchingMore) return

    if (container.scrollTop === 0) {
      setIsFetchingMore(true)
      const prevHeight = container.scrollHeight

      setTimeout(() => {
        loadMoreMessages()
        requestAnimationFrame(() => {
          const newHeight = container.scrollHeight
          container.scrollTop = newHeight - prevHeight
          setIsFetchingMore(false)
        })
      }, 500)
    }
  }

  const handleSend = () => {
    if (!input.trim()) return

    const newMsg: Message = {
      id: crypto.randomUUID(),
      text: input.trim(),
      sender: 'user',
      timestamp: Date.now(),
    }
    addMessage(newMsg)
    setInput('')

    // Scroll after next paint
    requestAnimationFrame(() => scrollToBottom())

    // Simulate Gemini reply
    setIsTyping(true)
    setTimeout(() => {
      addMessage({
        id: crypto.randomUUID(),
        text: 'Gemini simulated reply.',
        sender: 'gemini',
        timestamp: Date.now(),
      })
      setIsTyping(false)
    }, 1500)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onloadend = () => {
      const base64 = reader.result?.toString()
      if (base64) {
        addMessage({
          id: crypto.randomUUID(),
          image: base64,
          sender: 'user',
          timestamp: Date.now(),
        })

        toast.success('Image uploaded')
        scrollToBottom()

        setIsTyping(true)
        setTimeout(() => {
          addMessage({
            id: crypto.randomUUID(),
            text: 'Gemini received your image.',
            sender: 'gemini',
            timestamp: Date.now(),
          })
          setIsTyping(false)
        }, 1200)
      }
    }
    reader.readAsDataURL(file)
  }

  const handleCopy = (text?: string) => {
    if (!text) return
    navigator.clipboard.writeText(text)
    toast.success('Copied to clipboard')
  }
  const router = useRouter()

  return (
    <main className="p-4 max-w-2xl mx-auto">
      <div className="mt-4 text-center">
  <button
    onClick={() => router.push('/dashboard')}
    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
  >
    Go to Dashboard
  </button>
</div>
      <h1 className="text-xl font-bold mb-4">Chatroom ID: {id}</h1>

      {/* Chat scroll area */}
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="border rounded-md h-[60vh] overflow-y-auto p-2 flex flex-col"
      >
        {isFetchingMore && (
          <div className="text-sm text-gray-500 text-center mb-2">Loading older messages...</div>
        )}

        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`mb-2 p-2 rounded-md max-w-[75%] ${
              msg.sender === 'user'
                ? 'bg-blue-100 self-end text-right'
                : 'bg-gray-200 self-start text-left'
            }`}
          >
            {msg.image && (
              <img src={msg.image} alt="uploaded" className="mb-1 max-w-full rounded" />
            )}
            {msg.text && (
              <p
                onClick={() => handleCopy(msg.text)}
                className="cursor-pointer"
                title="Click to copy"
              >
                {msg.text}
              </p>
            )}
            <small className="text-xs text-gray-500 block mt-1">
              {new Date(msg.timestamp).toLocaleTimeString()}
            </small>
          </div>
        ))}

        {isTyping && (
          <div className="text-sm text-gray-500 my-2">Gemini is typing...</div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input area */}
      <div className="mt-4 flex gap-2 items-center">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="border p-2 flex-1 rounded"
          placeholder="Type a message..."
        />
        <button onClick={handleSend} className="bg-blue-600 text-white px-4 py-2 rounded">
          Send
        </button>
        <button
          onClick={() => fileInputRef.current?.click()}
          className="bg-gray-200 px-3 py-2 rounded"
        >
          📷
        </button>
        <input
        title='name'
          type="file"
          accept="image/*"
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileChange}
        />
      </div>
    </main>
  )
}
