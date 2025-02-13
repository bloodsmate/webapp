"use client"

import { useState } from "react"
import { Button } from "@/app/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog"
import ReturnPolicy from "./ReturnPolicy"

export default function ReturnPolicyPopup() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">View Return Policy</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Return Policy</DialogTitle>
          <DialogDescription>Please review our return policy below.</DialogDescription>
        </DialogHeader>
        <div className="mt-4 max-h-[60vh] overflow-y-auto">
          <ReturnPolicy />
        </div>
      </DialogContent>
    </Dialog>
  )
}

