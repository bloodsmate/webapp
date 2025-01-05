import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import Hero from './components/Hero'
import FeaturedProducts from './components/FeaturedProducts'
import Footer from './components/Footer'
import GoogleReviews from './components/GoogleReviews'
import InstagramFeed from './components/InstagramFeed'
import SEO from './components/SEO'
import SubscribeSection from './components/SubscribeSection'

const Scene = dynamic(() => import('./components/Scene'), { ssr: false })

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <SEO 
          title="Home"
          description="Welcome to TeeStartup - Quality T-shirts for every style"
          canonical="/"
        />
        {/* <Suspense fallback={<div>Loading...</div>}>
          <Scene />
        </Suspense> */}
        <Hero />
        <FeaturedProducts />
        <GoogleReviews />
        <InstagramFeed />
        <SubscribeSection />
      </main>
      {/* <Footer /> */}
    </div>
  )
}
