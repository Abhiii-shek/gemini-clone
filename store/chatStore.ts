import { create } from 'zustand'

export type Message = {
  id: string
  text?: string
  image?: string
  sender: 'user' | 'gemini'
  timestamp: number
}

interface MessageState {
  messages: Message[]
  addMessage: (msg: Message) => void
  loadInitialMessages: () => void
  loadMoreMessages: () => void
  clearMessages: () => void
}

export const useMessageStore = create<MessageState>((set, get) => ({
  messages: [],
  addMessage: (msg) => set({ messages: [...get().messages, msg] }),

  loadInitialMessages: () => {
    const dummy: Message[] = Array.from({ length: 20 }).map((_, i) => ({
      id: `init-${i}`,
      text: `Previous message ${i + 1}`,
      sender: i % 2 === 0 ? 'user' : 'gemini',
      timestamp: Date.now() - (1000 * 60 * i),
    }))
    set({ messages: dummy.reverse() })
  },

  loadMoreMessages: () => {
    const more: Message[] = Array.from({ length: 10 }).map((_, i) => ({
      id: `more-${i}-${Date.now()}`,
      text: `Older message ${i + 1}`,
      sender: i % 2 === 0 ? 'gemini' : 'user',
      timestamp: Date.now() - (1000 * 60 * (i + 20)),
    }))
    set({ messages: [...more, ...get().messages] })
  },

  clearMessages: () => set({ messages: [] }),
}))
