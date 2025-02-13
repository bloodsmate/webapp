import { updateProductStock, updateProductPrice } from "../redux/productSlice"
import type { AppDispatch } from "../redux/store"

class WebSocketService {
  private socket: WebSocket | null = null
  private dispatch: AppDispatch | null = null

  init(dispatch: AppDispatch) {
    this.dispatch = dispatch
    this.socket = new WebSocket(process.env.NEXT_PUBLIC_WS_URL || "ws://localhost:3001")

    this.socket.onopen = () => {
      console.log("WebSocket connection established")
    }

    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data)
      this.handleMessage(data)
    }

    this.socket.onerror = (error) => {
      console.error("WebSocket error:", error)
    }

    this.socket.onclose = () => {
      console.log("WebSocket connection closed")
    }
  }

  private handleMessage(data: any) {
    if (!this.dispatch) return

    switch (data.type) {
      case "STOCK_UPDATE":
        this.dispatch(updateProductStock({ productId: data.productId, newStock: data.newStock }))
        break
      case "PRICE_UPDATE":
        this.dispatch(updateProductPrice({ productId: data.productId, newPrice: data.newPrice }))
        break
      default:
        console.log("Unknown message type:", data.type)
    }
  }

  close() {
    if (this.socket) {
      this.socket.close()
    }
  }
}

export const webSocketService = new WebSocketService()

