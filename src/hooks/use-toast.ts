
import * as React from "react"
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"
import { useToast as useToastBase } from "@/components/ui/use-toast"

export type ToastProps = React.ComponentPropsWithoutRef<typeof Toast>
export type ToastActionElement = React.ReactElement<typeof ToastClose>

export type ToastParams = {
  title?: React.ReactNode
  description?: React.ReactNode
  action?: ToastActionElement
  variant?: "default" | "destructive"
}

export const useToast = () => {
  const { toast } = useToastBase()
  
  return {
    toast,
    dismiss: useToastBase.dismiss,
  }
}

export const toast = (props: ToastParams) => {
  const { toast } = useToastBase()
  toast(props)
}
