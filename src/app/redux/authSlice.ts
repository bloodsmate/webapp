import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import * as api from "@/app/api/apiClient"
import { AxiosError } from "axios"

interface AuthState {
  user: {
    id: string
    name: string
    email: string
    password: string
    role: string
    shippingAddress: string | null
    city: string | null
    zipCode: string | null
    phone: string | null
  } | null
  isAuthenticated: boolean
  loading: boolean
  error: string | null
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
}

export const login = createAsyncThunk(
  "auth/login",
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const data = await api.login(credentials.email, credentials.password)
      localStorage.setItem("authToken", data.token)
      return data.user
    } catch (error) {
        let errorMessage = "An unknown error occurred"
  
        if (error instanceof AxiosError) {
          errorMessage = error.response?.data?.message || "An error occurred during login"
        } else if (error instanceof Error) {
          errorMessage = error.message
        }
  
        return rejectWithValue(errorMessage)
      }
  },
)

export const logout = createAsyncThunk("auth/logout", async (_, { rejectWithValue }) => {
  try {
    // await api.logout()
    localStorage.removeItem("authToken")
  } catch (error) {
    return rejectWithValue((error as Error).message)
  }
})

export const checkAuth = createAsyncThunk("auth/checkAuth", async (_, { rejectWithValue }) => {
  const token = localStorage.getItem("authToken")
  if (token) {
    try {
      const userData = await api.getUser()
      return userData
    } catch (error) {
      localStorage.removeItem("authToken")
      return rejectWithValue((error as Error).message)
    }
  }
  return rejectWithValue("No token found")
})

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false
        state.isAuthenticated = true
        state.user = action.payload
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      .addCase(logout.fulfilled, (state) => {
        state.isAuthenticated = false
        state.user = null
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isAuthenticated = true
        state.user = action.payload
      })
      .addCase(checkAuth.rejected, (state) => {
        state.isAuthenticated = false
        state.user = null
      })
  },
})

export default authSlice.reducer

