// /app/page.tsx
'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/authStore'

export default function HomePage() {
  const router = useRouter()
  const { phone } = useAuthStore()

  useEffect(() => {
    if (phone) {
      router.push('/dashboard')
    } else {
      router.push('/login')
    }
  }, [phone])

  return (
    <div className="h-screen flex items-center justify-center">
      <p className="text-gray-500">Redirecting...</p>
    </div>
  )
}
