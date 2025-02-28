"use client"

import { useSelector, useDispatch } from "react-redux"
import type { RootState } from "../redux/store"
import { removeFromWishlist } from "../redux/wishlistSlice"
import { Button } from "@/app/components/ui/button"
import Image from "next/image"

export default function Wishlist() {
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items)
  const dispatch = useDispatch()

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Your Wishlist</h2>
      {wishlistItems.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistItems.map((item) => (
            <div key={item.id} className="border rounded-lg p-4 flex flex-col">
              <Image
                src={item.image || "/placeholder.svg"}
                alt={item.name}
                width={200}
                height={200}
                className="w-full h-48 object-cover mb-4"
              />
              <h3 className="text-lg font-semibold">{item.name}</h3>
              <p className="text-gray-600 mb-4">${item.price.toFixed(2)}</p>
              <div className="mt-auto">
                {/* <Button onClick={() => dispatch(removeFromWishlist(item.id))} variant="outline" className="w-full"> */}
                <Button variant="outline" className="w-full">
                  Remove from Wishlist
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

