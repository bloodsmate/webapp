import Link from 'next/link'
import { ShoppingCart } from 'lucide-react'

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-gray-800">
          TeeStartup
        </Link>
        <ul className="flex space-x-6">
          <li><Link href="/products" className="text-gray-600 hover:text-gray-800">Products</Link></li>
          <li><Link href="/about" className="text-gray-600 hover:text-gray-800">About</Link></li>
          <li><Link href="/contact" className="text-gray-600 hover:text-gray-800">Contact</Link></li>
        </ul>
        <Link href="/cart" className="text-gray-600 hover:text-gray-800">
          <ShoppingCart className="w-6 h-6" />
        </Link>
      </nav>
    </header>
  )
}

