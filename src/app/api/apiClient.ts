import axios from "axios"

// const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001/api"
// const API_BASE_URL = "http://localhost:3001/api"
const API_BASE_URL = process.env.API_BASE_URL;

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    
  },
})

// Add a request interceptor to include the auth token
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken")
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`
  }
  return config
})

export const login = async (email: string, password: string) => {
  const response = await apiClient.post("/auth/login", { email, password })
  return response.data
}

export const getUser = async () => {
    const response = await apiClient.get(`/users/token/checkAuth`)
    return response.data
  }

export const logout = async () => {
  await apiClient.post("/auth/logout")
}

export const getProducts = async () => {
  const response = await apiClient.get("/products")
  console.log(response.data);
  return response.data
}

export const getProduct = async (id: number) => {
  console.log("Meka call una");
  const response = await apiClient.get(`/products/${id}`)
  console.log(response.data);
  return response.data
}

export const addToWishlist = async (productId: number) => {
  const response = await apiClient.post("/wishlist", { productId })
  return response.data
}

export const removeFromWishlist = async (productId: number) => {
  const response = await apiClient.delete(`/wishlist/${productId}`)
  return response.data
}

export const getWishlist = async () => {
  const response = await apiClient.get("/wishlist")
  return response.data
}

export const addToWaitlist = async (productId: number, size: string) => {
  const response = await apiClient.post("/waitlist", { productId, size })
  return response.data
}

export const removeFromWaitlist = async (waitlistItemId: number) => {
  const response = await apiClient.delete(`/waitlist/${waitlistItemId}`)
  return response.data
}

export const getWaitlist = async () => {
  const response = await apiClient.get("/waitlist")
  return response.data
}

export const createOrder = async (orderData: any) => {
  const response = await apiClient.post("/orders/place", orderData)
  return response.data
}

export const getOrdersByUserId = async (userId: Number) => {
  const response = await apiClient.get(`/orders/${userId}`)
  return response.data
}

export const getOrdersByOrderId = async (orderId: string) => {
  const response = await apiClient.get(`/orders/tracking/${orderId}`)
  return response.data
}

export const processPayment = async (paymentData: any) => {
  const response = await apiClient.post("/payment/create-payment", paymentData)
  console.log(response);
  console.log(response.data);
  return response.data
}

export default apiClient