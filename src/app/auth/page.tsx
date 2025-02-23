'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from "next/navigation"
import { toast } from '../hooks/use-toast'
import { Label } from '../components/ui/label'
import { Input } from '../components/ui/input'
import { Button } from "../components/ui/button"
import Image from 'next/image'
import { logo_black_url } from '../data/constants'
import { motion } from 'framer-motion'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { userSignIn, userRegister } from '../api/userApiCalls'
import { userLogin, userRegistration } from '../types/user'
import { useDispatch, useSelector } from "react-redux"
import { login } from "../redux/authSlice"
import type { AppDispatch, RootState } from "../redux/store"

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [errors, setErrors] = useState({ email: "", password: "", name: "" })
  const [showPassword, setShowPassword] = useState(false)
  const dispatch = useDispatch<AppDispatch>()
  const { user, loading, error, isAuthenticated } = useSelector((state: RootState) => state.auth)
  const router = useRouter()

  // Track the previous page before redirecting to the login page
  const [previousPage, setPreviousPage] = useState<string | null>(null)

  useEffect(() => {
    if (isAuthenticated) {
      // Redirect to the previous page or home page if no previous page is set
      router.push(previousPage || "/")
    }
  }, [isAuthenticated, router, previousPage])

  // Set the previous page when the component mounts
  useEffect(() => {
    setPreviousPage(document.referrer || null)
  }, [])

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (validateForm()) {
      if (isLogin) {
        try {
          await dispatch(login({ email, password })).unwrap()
          toast({
            title: "Login Successful",
            description: "You have successfully logged in.",
            variant: "success",
          })
          // Redirect to the previous page or home page
          router.push(previousPage || "/")
        } catch (error) {
          toast({
            title: "Login Failed",
            description: error as string,
            variant: "destructive",
          })
        }
      } else {
        const userData: userRegistration = {
          name: name,
          email: email,
          password: password,
        }

        try {
          const { data: registerData, loading, error } = await userRegister(userData)
          console.log(registerData)

          if (!error) {
            toast({
              title: "Signup Successful",
              description: "You have successfully signed up.",
              variant: "success",
            })
            // Redirect to the login page after successful registration
            setIsLogin(true)
          } else {
            toast({
              title: "Signup Unsuccessful",
              description: "Something went wrong. Please try again.",
              variant: "destructive",
            })
          }
        } catch (error) {
          toast({
            title: "Signup Unsuccessful",
            variant: "destructive",
          })
        }
      }
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
          {isLogin ? (
            <>
              <h2 className="text-3xl font-bold text-center mb-4">WELCOME BACK!</h2>
              <p className="text-lg text-center">READY TO SHOP THE LATEST LOOKS?</p>
            </>
          ) : (
            <>
              <h2 className="text-3xl font-bold text-center mb-4">JOIN US TODAY!</h2>
              <p className="text-lg text-center">DISCOVER THE LATEST TRENDS AND EXCLUSIVE OFFERS.</p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}