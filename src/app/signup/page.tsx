'use client'

import { useState } from 'react'
import Link from 'next/link'
import { toast } from '../hooks/use-toast'
import { Label } from '../components/ui/label'
import { Input } from '../components/ui/input'
import { Button } from "../components/ui/button"
import Image from 'next/image'
import { logo_black_url } from '../data/constants'
import { motion } from 'framer-motion'
import { FaEye, FaEyeSlash } from 'react-icons/fa'

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [errors, setErrors] = useState({ email: "", password: "", name: "" })
  const [showPassword, setShowPassword] = useState(false)

  const validateForm = () => {
    let isValid = true
    const newErrors = { email: "", password: "", name: "" }

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

    if (!isLogin && !name) {
      newErrors.name = "Name is required"
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      toast({
        title: isLogin ? "Login Successful" : "Signup Successful",
        description: isLogin ? "You have successfully logged in." : "You have successfully signed up.",
        variant: "success",
      })
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 overflow-hidden">
      <div className="p-8 relative min-h-screen min-w-full sm:w-10/12 md:w-8/12 lg:w-7/12 xl:w-6/12 bg-white flex rounded-xl shadow-lg">

        {/* Left Section (Form Container) */}
        <div className={`w-full sm:w-1/2 flex flex-col justify-center items-start px-2 md:px-32 xl:px-48 py-16 transition-transform duration-500 ease-in-out ${isLogin ? 'order-1' : 'order-2'}`}>
          {/* Back Button */}
          <Link href="/" className="absolute top-4 left-4 p-2 rounded-full hover:bg-gray-200 transition duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </Link>

          <div className="mb-6">
            <Image src={logo_black_url} alt="Logo" width={150} height={100} />
          </div>

          {/* Login Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isLogin ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className={`${isLogin ? "block" : "hidden"} w-full`}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Get Started</h2>
            <p className="text-gray-600 mb-6">Welcome back - Login to your account</p>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" required placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input id="password" name="password" type={showPassword ? "text" : "password"} required placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3 text-gray-500">
                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                  </button>
                </div>
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
              </div>
              <Button type="submit" className="w-full bg-[#1A1A1A] text-white font-bold py-3 px-4 rounded">Sign In</Button>
            </form>
          </motion.div>

          {/* Signup Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={!isLogin ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.5 }}
            className={`${!isLogin ? "block" : "hidden"} w-full`}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Create Account</h2>
            <p className="text-gray-600 mb-6">Sign up to get started</p>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" type="text" required placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" required placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input id="password" name="password" type={showPassword ? "text" : "password"} required placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3 text-gray-500">
                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                  </button>
                </div>
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
              </div>
              <Button type="submit" className="w-full bg-[#1A1A1A] text-white font-bold py-3 px-4 rounded">Sign Up</Button>
            </form>
          </motion.div>

          <p className="text-sm text-gray-600 mt-4">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button onClick={() => setIsLogin(!isLogin)} className="text-gray-900 font-medium">{isLogin ? "Sign Up" : "Log in"}</button>
          </p>
        </div>

        {/* Right Section (Image or Content) */}
        <div className={`hidden sm:block w-1/2 bg-black text-white flex flex-col justify-center items-center p-8 rounded-xl ${isLogin ? 'order-2' : 'order-1'}`}>
          <h2 className="text-3xl font-bold">{isLogin ? "Enter the Future of Payments" : "Welcome Aboard"}</h2>
        </div>
      </div>
    </div>
  )
} 
