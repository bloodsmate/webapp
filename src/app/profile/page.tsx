// "use client"

// import { useState, useEffect } from "react"
// import { Button } from "@/app/components/ui/button"
// import { Input } from "@/app/components/ui/input"
// import { Label } from "@/app/components/ui/label"
// import { toast } from '../hooks/use-toast'
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs"
// import ReviewForm from "../components/ReviewForm"
// import ReturnForm from "../components/ReturnForm"
// import ReturnPolicyPopup from "../components/ReturnPolicyPopup"

// interface ShippingDetails {
//     name: string
//     address: string
//     city: string
//     country: string
//     zipCode: string
//   }
  
//   interface Order {
//     id: string
//     date: string
//     total: number
//     status: string
//   }
  
//   interface WishlistItem {
//     id: number
//     name: string
//     price: number
//   }
  
//   interface WaitlistItem {
//     id: number
//     name: string
//     size: string
//   }
  
//   export default function ProfilePage() {
//     const [currentPassword, setCurrentPassword] = useState("")
//     const [newPassword, setNewPassword] = useState("")
//     const [confirmPassword, setConfirmPassword] = useState("")
//     const [shippingDetails, setShippingDetails] = useState<ShippingDetails>({
//       name: "",
//       address: "",
//       city: "",
//       country: "",
//       zipCode: "",
//     })
//     const [orders, setOrders] = useState<Order[]>([])
//     const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([])
//     const [waitlistItems, setWaitlistItems] = useState<WaitlistItem[]>([])
//     const [currentPage, setCurrentPage] = useState(1)
//     const ordersPerPage = 5
//     const [wishlistPage, setWishlistPage] = useState(1)
//     const [waitlistPage, setWaitlistPage] = useState(1)
//     const itemsPerPage = 6
  
//     useEffect(() => {
//       // Fetch user data from your backend
//       // For this example, we'll use mock data
//       setShippingDetails({
//         name: "John Doe",
//         address: "123 Main St",
//         city: "Anytown",
//         country: "USA",
//         zipCode: "12345",
//       })
//       setOrders([
//         { id: "1", date: "2023-06-01", total: 59.99, status: "Delivered" },
//         { id: "2", date: "2023-06-15", total: 79.99, status: "Shipped" },
//         // Add more orders for pagination testing
//       ])
//       setWishlistItems([
//         { id: 1, name: "Classic White Tee", price: 24.99 },
//         { id: 2, name: "Vintage Black Tee", price: 29.99 },
//         { id: 3, name: "Classic White Tee", price: 24.99 },
//         { id: 4, name: "Vintage Black Tee", price: 29.99 },
//         { id: 5, name: "Classic White Tee", price: 24.99 },
//         { id: 6, name: "Vintage Black Tee", price: 29.99 },
//         { id: 7, name: "Classic White Tee", price: 24.99 },
//         { id: 8, name: "Vintage Black Tee", price: 29.99 },
//       ])
//       setWaitlistItems([
//         { id: 1, name: "Graphic Print Tee", size: "M" },
//         { id: 3, name: "Striped Navy Tee", size: "L" },
//         { id: 1, name: "Graphic Print Tee", size: "M" },
//         { id: 3, name: "Striped Navy Tee", size: "L" },
//         { id: 1, name: "Graphic Print Tee", size: "M" },
//         { id: 3, name: "Striped Navy Tee", size: "L" },
//         { id: 1, name: "Graphic Print Tee", size: "M" },
//         { id: 3, name: "Striped Navy Tee", size: "L" },
//       ])
//     }, [])
  
//     const handlePasswordChange = async (e: React.FormEvent) => {
//       e.preventDefault()
//       if (newPassword !== confirmPassword) {
//         toast({
//           title: "Error",
//           description: "New passwords do not match.",
//           variant: "destructive",
//         })
//         return
//       }
//       try {
//         // Here you would typically send a request to your backend to change the password
//         await new Promise((resolve) => setTimeout(resolve, 1000))
//         toast({
//           title: "Success",
//           description: "Your password has been updated.",
//         })
//         setCurrentPassword("")
//         setNewPassword("")
//         setConfirmPassword("")
//       } catch (error) {
//         toast({
//           title: "Error",
//           description: "Failed to update password. Please try again.",
//           variant: "destructive",
//         })
//       }
//     }
  
//     const handleShippingDetailsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//       setShippingDetails({
//         ...shippingDetails,
//         [e.target.name]: e.target.value,
//       })
//     }
  
//     const handleShippingDetailsSubmit = async (e: React.FormEvent) => {
//       e.preventDefault()
//       try {
//         // Here you would typically send a request to your backend to update shipping details
//         await new Promise((resolve) => setTimeout(resolve, 1000))
//         toast({
//           title: "Success",
//           description: "Your shipping details have been updated.",
//         })
//       } catch (error) {
//         toast({
//           title: "Error",
//           description: "Failed to update shipping details. Please try again.",
//           variant: "destructive",
//         })
//       }
//     }
  
//     const isEligibleForReturn = (orderDate: string) => {
//       const orderDateTime = new Date(orderDate).getTime()
//       const now = new Date().getTime()
//       const sevenDaysInMs = 7 * 24 * 60 * 60 * 1000
//       return now - orderDateTime <= sevenDaysInMs
//     }
  
//     const indexOfLastOrder = currentPage * ordersPerPage
//     const indexOfFirstOrder = indexOfLastOrder - ordersPerPage
//     const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder)
//     const totalPages = Math.ceil(orders.length / ordersPerPage)
  
//     const paginatedWishlist = wishlistItems.slice((wishlistPage - 1) * itemsPerPage, wishlistPage * itemsPerPage)
//     const paginatedWaitlist = waitlistItems.slice((waitlistPage - 1) * itemsPerPage, waitlistPage * itemsPerPage)
  
//     const wishlistTotalPages = Math.ceil(wishlistItems.length / itemsPerPage)
//     const waitlistTotalPages = Math.ceil(waitlistItems.length / itemsPerPage)
  
//     return (
//       <div className="container mx-auto px-4 py-8 min-h-screen main-content">
//         <h1 className="text-3xl font-bold mb-8">Your Profile</h1>
//         <Tabs defaultValue="password" className="w-full">
//           <TabsList className="grid w-full grid-cols-2 md:grid-cols-5">
//             <TabsTrigger value="password">Password</TabsTrigger>
//             <TabsTrigger value="shipping">Shipping</TabsTrigger>
//             <TabsTrigger value="orders">Orders</TabsTrigger>
//             <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
//             <TabsTrigger value="waitlist">Waitlist</TabsTrigger>
//           </TabsList>
//           <TabsContent value="password">
//             <form onSubmit={handlePasswordChange} className="space-y-4">
//               <div>
//                 <Label htmlFor="current-password">Current Password</Label>
//                 <Input
//                   id="current-password"
//                   type="password"
//                   value={currentPassword}
//                   onChange={(e) => setCurrentPassword(e.target.value)}
//                   required
//                 />
//               </div>
//               <div>
//                 <Label htmlFor="new-password">New Password</Label>
//                 <Input
//                   id="new-password"
//                   type="password"
//                   value={newPassword}
//                   onChange={(e) => setNewPassword(e.target.value)}
//                   required
//                 />
//               </div>
//               <div>
//                 <Label htmlFor="confirm-password">Confirm New Password</Label>
//                 <Input
//                   id="confirm-password"
//                   type="password"
//                   value={confirmPassword}
//                   onChange={(e) => setConfirmPassword(e.target.value)}
//                   required
//                 />
//               </div>
//               <Button type="submit">Change Password</Button>
//             </form>
//           </TabsContent>
//           <TabsContent value="shipping">
//             <form onSubmit={handleShippingDetailsSubmit} className="space-y-4">
//               <div>
//                 <Label htmlFor="name">Full Name</Label>
//                 <Input
//                   id="name"
//                   name="name"
//                   value={shippingDetails.name}
//                   onChange={handleShippingDetailsChange}
//                   required
//                 />
//               </div>
//               <div>
//                 <Label htmlFor="address">Address</Label>
//                 <Input
//                   id="address"
//                   name="address"
//                   value={shippingDetails.address}
//                   onChange={handleShippingDetailsChange}
//                   required
//                 />
//               </div>
//               <div>
//                 <Label htmlFor="city">City</Label>
//                 <Input
//                   id="city"
//                   name="city"
//                   value={shippingDetails.city}
//                   onChange={handleShippingDetailsChange}
//                   required
//                 />
//               </div>
//               <div>
//                 <Label htmlFor="country">Country</Label>
//                 <Input
//                   id="country"
//                   name="country"
//                   value={shippingDetails.country}
//                   onChange={handleShippingDetailsChange}
//                   required
//                 />
//               </div>
//               <div>
//                 <Label htmlFor="zipCode">Zip Code</Label>
//                 <Input
//                   id="zipCode"
//                   name="zipCode"
//                   value={shippingDetails.zipCode}
//                   onChange={handleShippingDetailsChange}
//                   required
//                 />
//               </div>
//               <Button type="submit">Update Shipping Details</Button>
//             </form>
//           </TabsContent>
//           <TabsContent value="orders">
//             <div className="mb-4">
//               <ReturnPolicyPopup />
//             </div>
//             <div className="space-y-8">
//               {currentOrders.map((order) => (
//                 <div key={order.id} className="border rounded-lg p-6">
//                   <div className="flex justify-between items-center mb-4">
//                     <h3 className="text-lg font-semibold">Order #{order.id}</h3>
//                     <span className="text-gray-600">{order.date}</span>
//                   </div>
//                   <p className="mb-2">Total: ${order.total.toFixed(2)}</p>
//                   <p className="mb-4">Status: {order.status}</p>
//                   {order.status === "Delivered" && (
//                     <div className="mt-4">
//                       <h4 className="text-md font-semibold mb-2">Leave a Review</h4>
//                       <ReviewForm orderId={order.id} productId={1} />
//                     </div>
//                   )}
//                   {isEligibleForReturn(order.date) && (
//                     <div className="mt-4">
//                       <h4 className="text-md font-semibold mb-2">Request a Return</h4>
//                       <ReturnForm orderId={order.id} />
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>
//             <div className="mt-4 flex justify-between items-center">
//               <Button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
//                 Previous
//               </Button>
//               <span>
//                 Page {currentPage} of {totalPages}
//               </span>
//               <Button
//                 onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
//                 disabled={currentPage === totalPages}
//               >
//                 Next
//               </Button>
//             </div>
//           </TabsContent>
//           <TabsContent value="wishlist">
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//               {paginatedWishlist.map((item) => (
//                 <div key={item.id} className="border rounded-lg p-4">
//                   <h3 className="font-semibold">{item.name}</h3>
//                   <p>${item.price.toFixed(2)}</p>
//                   <Button className="mt-2">Add to Cart</Button>
//                 </div>
//               ))}
//             </div>
//             <div className="mt-4 flex justify-between items-center">
//               <Button onClick={() => setWishlistPage((prev) => Math.max(prev - 1, 1))} disabled={wishlistPage === 1}>
//                 Previous
//               </Button>
//               <span>
//                 Page {wishlistPage} of {wishlistTotalPages}
//               </span>
//               <Button
//                 onClick={() => setWishlistPage((prev) => Math.min(prev + 1, wishlistTotalPages))}
//                 disabled={wishlistPage === wishlistTotalPages}
//               >
//                 Next
//               </Button>
//             </div>
//           </TabsContent>
//           <TabsContent value="waitlist">
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//               {paginatedWaitlist.map((item) => (
//                 <div key={item.id} className="border rounded-lg p-4">
//                   <h3 className="font-semibold">{item.name}</h3>
//                   <p>Size: {item.size}</p>
//                   <Button className="mt-2">Remove from Waitlist</Button>
//                 </div>
//               ))}
//             </div>
//             <div className="mt-4 flex justify-between items-center">
//               <Button onClick={() => setWaitlistPage((prev) => Math.max(prev - 1, 1))} disabled={waitlistPage === 1}>
//                 Previous
//               </Button>
//               <span>
//                 Page {waitlistPage} of {waitlistTotalPages}
//               </span>
//               <Button
//                 onClick={() => setWaitlistPage((prev) => Math.min(prev + 1, waitlistTotalPages))}
//                 disabled={waitlistPage === waitlistTotalPages}
//               >
//                 Next
//               </Button>
//             </div>
//           </TabsContent>
//         </Tabs>
//       </div>
//     )
//   }
  
'use client'

import { useState } from 'react';
import { motion } from 'framer-motion';
import Dashboard from '@/app/components/Profile/Dashboard';
import OrderHistory from '@/app/components/Profile/OrderHistory';
import ShippingAddress from '@/app/components/Profile/ShippingAddress';
import AccountDetails from '@/app/components/Profile/AccountDetails';
import { Button } from '@/app/components/ui/button';

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const tabs = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'orders', label: 'Order History' },
    { id: 'shipping', label: 'Shipping Address' },
    { id: 'account', label: 'Account Details' },
  ];

  return (
    <div className="min-h-screen main-content text-gray-900 p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-3xl font-bold mb-8">My Account</h1>

        {/* Tabs */}
        <div className="flex space-x-4 mb-8 overflow-x-auto">
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              variant={activeTab === tab.id ? 'default' : 'ghost'}
              className="relative"
            >
              {tab.label}
              {activeTab === tab.id && (
                <motion.div
                  layoutId="underline"
                  className="absolute left-0 right-0 h-0.5 bg-primary bottom-0"
                />
              )}
            </Button>
          ))}
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'dashboard' && <Dashboard />}
          {activeTab === 'orders' && <OrderHistory />}
          {activeTab === 'shipping' && <ShippingAddress />}
          {activeTab === 'account' && <AccountDetails />}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ProfilePage;