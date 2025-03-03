
import * as React from "react";
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";
import { useToast as useToastPrimitive } from "@/components/ui/use-toast-primitive";

export type ToasterToast = React.ComponentPropsWithoutRef<typeof Toast>;
export type ToastActionElement = React.ReactElement<typeof ToastClose>;

export type ToastParams = {
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: ToastActionElement;
  variant?: "default" | "destructive";
};

export const useToast = () => {
  const baseToast = useToastPrimitive();
  
  return {
    toast: baseToast.toast,
    dismiss: baseToast.dismiss,
    toasts: baseToast.toasts
  };
};

export function toast(props: ToastParams) {
  const { toast: toastFn } = useToastPrimitive();
  return toastFn(props);
}

// Re-export the Toast component types for validation files
export type { ToasterToast as Toast };
