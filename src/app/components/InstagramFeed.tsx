'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

const instagramPosts = [
  { id: 1, image: '/placeholder.svg?height=300&width=300', likes: 120, comments: 15 },
  { id: 2, image: '/placeholder.svg?height=300&width=300', likes: 95, comments: 8 },
  { id: 3, image: '/placeholder.svg?height=300&width=300', likes: 200, comments: 32 },
  { id: 4, image: '/placeholder.svg?height=300&width=300', likes: 150, comments: 20 },
]

export default function InstagramFeed() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Follow Us on Instagram</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {instagramPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative overflow-hidden rounded-lg"
            >
              <Image
                src={post.image}
                alt={`Instagram post ${post.id}`}
                width={300}
                height={300}
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                <div className="text-white text-center">
                  <p className="font-semibold">{post.likes} likes</p>
                  <p>{post.comments} comments</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-8">
          <a
            href="https://www.instagram.com/teestartup"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            @teestartup
          </a>
        </div>
      </div>
    </section>
  )
}
