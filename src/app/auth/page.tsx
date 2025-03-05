'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import { toast } from '../hooks/use-toast'
import { Label } from '../components/ui/label'
import { Input } from '../components/ui/input'
import { Button } from "../components/ui/button"
import Image from 'next/image'
import { logo_black_url } from '../data/constants'
import { motion } from 'framer-motion'
import { FaEye, FaEyeSlash, FaShoppingBag, FaTag } from 'react-icons/fa'
import { userSignIn, userRegister } from '../api/userApiCalls'
import { userLogin, userRegistration } from '../types/user'

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [errors, setErrors] = useState({ email: "", password: "", name: "" })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter() // Initialize useRouter

  // Track the previous page URL
  useEffect(() => {
    const previousPage = sessionStorage.getItem('previousPage')
    if (previousPage && !sessionStorage.getItem('redirected')) {
      sessionStorage.setItem('redirected', 'true')
      router.push(previousPage)
    }
  }, [router])

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
      setIsLoading(true)

      if (isLogin) {
        const userData: userLogin = {
          email: email,
          password: password,
        }

        try {
          const { data: loginData, loading, error } = await userSignIn(userData)
          console.log(loginData)

          if (!error) {
            toast({
              title: "Login Successful",
              description: "You have successfully logged in.",
              variant: "success",
            })

            // Redirect to home page or previous page
            const previousPage = sessionStorage.getItem('previousPage')
            if (previousPage) {
              sessionStorage.removeItem('previousPage')
              router.push(previousPage)
            } else {
              router.push('/') // Redirect to home page
            }
          } else {
            toast({
              title: "Login Unsuccessful",
              description: "Invalid credentials. Please try again.",
              variant: "destructive",
            })
          }
        } catch (error) {
          toast({
            title: "Login Unsuccessful",
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

            // Automatically switch to login form
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

      setIsLoading(false)
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
              <Button type="submit" className="w-full bg-[#1A1A1A] text-white font-bold py-3 px-4 rounded" disabled={isLoading}>
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Signing in...
                  </span>
                ) : (
                  "Sign In"
                )}
              </Button>
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
              <Button type="submit" className="w-full bg-[#1A1A1A] text-white font-bold py-3 px-4 rounded" disabled={isLoading}>
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Signing up...
                  </span>
                ) : (
                  "Sign Up"
                )}
              </Button>
            </form>
          </motion.div>

          <p className="text-sm text-gray-600 mt-4">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button onClick={() => setIsLogin(!isLogin)} className="text-gray-900 font-medium">{isLogin ? "Sign Up" : "Log in"}</button>
          </p>
        </div>

        {/* Right Section (Image or Content) */}
        <div className={`hidden sm:flex w-1/2 flex-col justify-center items-center p-12 rounded-xl bg-gradient-to-br from-black to-gray-900 text-white ${isLogin ? 'order-2' : 'order-1'}`}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center space-y-6"
          >
            {isLogin ? (
              <>
                <FaShoppingBag className="w-20 h-20 mx-auto text-gray-400 drop-shadow-md" />
                <h2 className="text-5xl font-extrabold tracking-tight leading-tight">
                  Welcome Back!  
                </h2>
                <p className="text-lg text-gray-300 max-w-md">
                  Ready to explore the latest styles? <br />
                  <span className="text-gray-200 font-medium">Sign in to continue your journey.</span>
                </p>
              </>
            ) : (
              <>
                <FaTag className="w-20 h-20 mx-auto text-gray-400 drop-shadow-md" />
                <h2 className="text-5xl font-extrabold tracking-tight leading-tight">
                  Join Us Today!  
                </h2>
                <p className="text-lg text-gray-300 max-w-md">
                  Become part of an exclusive community. <br />
                  <span className="text-gray-200 font-medium">Sign up now to unlock special deals and trends.</span>
                </p>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}