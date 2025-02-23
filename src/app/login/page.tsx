'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { toast } from '../hooks/use-toast'
import { Label } from '../components/ui/label'
import { Input } from '../components/ui/input'
import { Button } from "../components/ui/button"
import Image from 'next/image'
import { logo_black_url } from '../data/constants'

declare global {
  interface Window {
    turnstile: any
  }
}

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errors, setErrors] = useState({ email: "", password: "" })
  const [turnstileToken, setTurnstileToken] = useState("")
  const turnstileRef = useRef<HTMLDivElement>(null)

  // useEffect(() => {
  //   if (typeof window.turnstile !== "undefined" && turnstileRef.current) {
  //     window.turnstile.render(turnstileRef.current, {
  //       sitekey: "YOUR_TURNSTILE_SITE_KEY",
  //       callback: (token: string) => {
  //         setTurnstileToken(token)
  //       },
  //     })
  //   }
  // }, [])

  const validateForm = () => {
    let isValid = true
    const newErrors = { email: "", password: "" }

    if (!email) {
      newErrors.email = "Email is required"
      isValid = false
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid"
      isValid = false
    }

    if (!password) {
      newErrors.password = "Password is required"
      isValid = false
    }

    // if (!turnstileToken) {
    //   toast({
    //     title: "Error",
    //     description: "Please complete the Cloudflare verification.",
    //     variant: "destructive",
    //   })
    //   isValid = false
    // }

    setErrors(newErrors)
    return isValid
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      console.log("Login attempt with:", { email, password, turnstileToken })
      toast({
        title: "Login Successful",
        description: "You have successfully logged in.",
        variant: "success",
      })
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 overflow-hidden">
      <div className="p-8 min-h-screen min-w-full bg-white flex">
        {/* Left Section (Form) */}
        <div className="w-1/2 bg-white px-32 xl:40 2xl:px-48 py-16 flex flex-col justify-center relative">
          {/* Back Button */}
          <Link href="/" className="absolute top-4 left-4 p-2 rounded-full hover:bg-gray-200 transition duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </Link>

          <div className="mb-6">
            <Image src={logo_black_url} alt="Logo" width={150} height={100} />
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-4">Get Started</h2>
          <p className="text-gray-600 mb-6">Welcome - Let's create your account</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div>

            <div ref={turnstileRef} className="flex justify-center"></div>

            {/* Button with Shine Effect */}
            <Button type="submit" className="w-full bg-[#1A1A1A] text-white font-bold py-3 px-4 rounded">
              Sign In
            </Button>
          </form>

          <p className="text-sm text-gray-600 mt-4">
            Already have an account? <Link href="/login" className="text-gray-900 font-medium">Log in</Link>
          </p>
        </div>

        {/* Right Section */}
        <div className="w-1/2 bg-black text-white flex flex-col justify-center items-center p-8 relative shadow-lg rounded-2xl">
          <h2 className="text-3xl font-bold">Enter the Future of Payments, today</h2>
          <div className="absolute bottom-6 right-6">
            <Image src="https://res.cloudinary.com/midefulness/image/upload/v1739366195/BloodsMate/Untitled_design_5_fqgcxa.png" 
              alt="Card Preview" 
              width={200} 
              height={150} 
              />
          </div>
        </div>
      </div>
    </div>
  )
}
