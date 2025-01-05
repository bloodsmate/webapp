'use client'

import { useState } from 'react'
import { Button } from './ui/button'

export default function AddToCartButton({ productId }: { productId: number }) {
  const [isAdded, setIsAdded] = useState(false)

  const handleAddToCart = () => {
    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 2000)
  }

  return (
    <Button 
      onClick={handleAddToCart} 
      disabled={isAdded}
      className="w-full md:w-auto"
    >
      {isAdded ? 'Added to Cart!' : 'Add to Cart'}
    </Button>
  )
}

