import { Loader2 } from "lucide-react"

export default function Loader({ size = "default" }: { size?: "small" | "default" | "large" }) {
  const sizeClasses = {
    small: "w-4 h-4",
    default: "w-8 h-8",
    large: "w-12 h-12",
  }

  return (
    <div className="flex justify-center items-center">
      <Loader2 className={`${sizeClasses[size]} animate-spin text-primary`} />
    </div>
  )
}

