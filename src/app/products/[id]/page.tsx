import Image from 'next/image'
import { notFound } from 'next/navigation'
import ProductDetails from '@/app/components/ProductDetails' 

const products = [
  { 
    id: 1, 
    name: 'Classic White Tee', 
    price: 24.99, 
    images: [
      '/placeholder.svg?height=600&width=600',
      '/placeholder.svg?height=600&width=600&text=Front',
      '/placeholder.svg?height=600&width=600&text=Back',
      '/placeholder.svg?height=600&width=600&text=Detail',
    ],
    description: 'A timeless classic white t-shirt that goes with everything. Made from 100% organic cotton for ultimate comfort and sustainability.',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    stock: 10
  },
  { id: 2, name: 'Vintage Black Tee', price: 29.99, images: ['https://res.cloudinary.com/midefulness/image/upload/v1657441707/cld-sample-5.jpg', 'https://res.cloudinary.com/midefulness/image/upload/v1657441707/cld-sample-5.jpg', 'https://res.cloudinary.com/midefulness/image/upload/v1657441707/cld-sample-5.jpg', 'https://res.cloudinary.com/midefulness/image/upload/v1657441706/cld-sample-4.jpg'], description: 'A sleek black t-shirt with a vintage feel.', sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'], stock: 5 },
  { id: 3, name: 'Graphic Print Tee', price: 34.99, images: ['/placeholder.svg?height=600&width=600'], description: 'Express yourself with our unique graphic print design.', sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'], stock: 20 },
  { id: 4, name: 'Striped Navy Tee', price: 27.99, images: ['/placeholder.svg?height=600&width=600'], description: 'Classic navy stripes for a nautical-inspired look.', sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'], stock: 2 },
  { id: 5, name: 'Heather Gray Tee', price: 26.99, images: ['/placeholder.svg?height=600&width=600'], description: 'Soft and comfortable heather gray t-shirt for everyday wear.', sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'], stock: 0 },
  { id: 6, name: 'Neon Green Tee', price: 31.99, images: ['/placeholder.svg?height=600&width=600'], description: 'Stand out from the crowd with this bold neon green tee.', sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'], stock: 35 },
]

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = products.find(p => p.id === parseInt(params.id))

  if (!product) {
    notFound()
  }

  return (
    <div className="main-content container mx-auto px-4 py-8">
      <ProductDetails product={product} />
    </div>
  )
}

