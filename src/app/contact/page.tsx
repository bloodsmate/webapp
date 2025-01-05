'use client'

import { useState } from 'react'
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Textarea } from "../components/ui/textarea"
import { toast } from '../hooks/use-toast'
import { motion } from 'framer-motion'
import { Send } from 'lucide-react'
import SEO from '../components/SEO'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    toast({
      title: "Inquiry Sent",
      description: "We'll get back to you soon!",
    })
    setFormData({ name: '', email: '', message: '' })
  }

  return (
    <div className="main-content container mx-auto px-4 py-16">
      <SEO 
        title="Contact Us"
        description="Get in touch with TeeStartup for any inquiries or feedback"
        canonical="/contact"
      />
      <h1 className="text-4xl font-bold mb-8 text-center">Contact Us</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <Input id="name" name="name" value={formData.name} onChange={handleChange} required className="w-full" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required className="w-full" />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <Textarea id="message" name="message" value={formData.message} onChange={handleChange} required className="w-full h-32" />
            </div>
            <Button type="submit" className="w-full">
              <Send className="w-4 h-4 mr-2" />
              Send Inquiry
            </Button>
          </form>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-8"
        >
          <div>
            <h2 className="text-2xl font-semibold mb-4">Our Location</h2>
            <p className="text-gray-600">123 T-Shirt Street, Fashion District, New York, NY 10001</p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
            <p className="text-gray-600">Email: info@teestartup.com</p>
            <p className="text-gray-600">Phone: (123) 456-7890</p>
          </div>
          <div className="h-64 rounded-lg overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.2412648750455!2d-73.98784890000001!3d40.757977700000005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25855c6480299%3A0x55194ec5a1ae072e!2sTimes+Square!5e0!3m2!1sen!2sus!4v1635176869128!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
