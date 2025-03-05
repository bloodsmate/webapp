import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import Hero from '@/app/components/Hero'
import FeaturedProducts from '@/app/components/FeaturedProducts'
import Footer from '@/app/components/Footer'
import GoogleReviews from '@/app/components/GoogleReviews'
import InstagramFeed from '@/app/components/InstagramFeed'
import SEO from '@/app/components/SEO'
import SubscribeSection from '@/app/components/SubscribeSection'
import ShopTheLook from '@/app/components/ShopTheLook'
import HeartPulse from '@/app/components/HeartPulse'

// const Scene = dynamic(() => import('./components/Scene'), { ssr: false })

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <SEO 
          title="Home"
          description="Welcome to Bloodsmate - Quality T-shirts for every style"
          canonical="/"
        />
        {/* <Suspense fallback={<div>Loading...</div>}>
          <Scene />
        </Suspense> */}
        <Hero />
        <HeartPulse />
        <FeaturedProducts />
        {/* <GoogleReviews /> */}
        {/* <InstagramFeed /> */}
        <ShopTheLook />
        <SubscribeSection />
      </main>
      {/* <Footer /> */}
    </div>
  )
}
