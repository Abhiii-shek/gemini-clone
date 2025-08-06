'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { useAuthStore } from '@/store/authStore'

// ------------------ Schema ------------------
const loginSchema = z.object({
  countryCode: z.string().min(1, 'Country code is required'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  name: z.string().min(1, 'Name is required'),
  otp: z.string().optional(),
})
type LoginFormData = z.infer<typeof loginSchema>

// ------------------ Types ------------------
type Country = {
  name: string
  dialCode: string
}

// ------------------ Component ------------------
export default function LoginPage() {
  const [step, setStep] = useState<1 | 2>(1)
  const [countries, setCountries] = useState<Country[]>([])
  const { login } = useAuthStore()
  const router = useRouter()

  const { register, handleSubmit } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  // ------------------ Static country list ------------------
  useEffect(() => {
    setCountries([
      { name: 'India', dialCode: '+91' },
      { name: 'United States', dialCode: '+1' },
      { name: 'United Kingdom', dialCode: '+44' },
      { name: 'Canada', dialCode: '+1' },
      { name: 'Australia', dialCode: '+61' },
      { name: 'Germany', dialCode: '+49' },
      { name: 'France', dialCode: '+33' },
      { name: 'Japan', dialCode: '+81' },
      { name: 'South Korea', dialCode: '+82' },
      { name: 'UAE', dialCode: '+971' },
      { name: 'Singapore', dialCode: '+65' },
    ])
  }, [])

  // ------------------ Form submission ------------------
  const onSubmit = (data: LoginFormData) => {
    if (step === 1) {
      toast.success(`OTP sent to ${data.countryCode} ${data.phone}`)
      setStep(2)
    } else {
      setTimeout(() => {
        login(data.phone)
        toast.success('Logged in successfully')
        router.push('/dashboard')
      }, 1000)
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-md shadow-md w-full max-w-md"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">OTP Login</h1>

        {/* Country Code */}
        <label className="block text-sm mb-1">Country Code</label>
        <select
          {...register('countryCode')}
          defaultValue=""
          className="w-full border p-2 mb-4 rounded"
        >
          <option value="" disabled>
            Select your country
          </option>
          {countries.map((country) => (
            <option
              key={`${country.name}-${country.dialCode}`}
              value={country.dialCode}
            >
              {country.name} ({country.dialCode})
            </option>
          ))}
        </select>

        {/* Phone Number */}
        <label className="block text-sm mb-1">Phone Number</label>
        <input
          {...register('phone')}
          type="tel"
          placeholder="Enter your phone number"
          className="w-full border p-2 mb-4 rounded"
        />

        {/* Name */}
        <label className="block text-sm mb-1">Name</label>
        <input
          {...register('name')}
          type="text"
          placeholder="Enter your name"
          className="w-full border p-2 mb-4 rounded"
        />

        {/* OTP (only in step 2) */}
        {step === 2 && (
          <>
            <label className="block text-sm mb-1">OTP</label>
            <input
              {...register('otp')}
              type="text"
              placeholder="Enter OTP"
              className="w-full border p-2 mb-4 rounded"
            />
          </>
        )}

        <button
          type="submit"
          className="bg-blue-600 text-white font-medium py-2 w-full rounded hover:bg-blue-700 transition"
        >
          {step === 1 ? 'Send OTP' : 'Login'}
        </button>
      </form>
    </main>
  )
}