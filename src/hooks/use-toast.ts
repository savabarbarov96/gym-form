
import * as React from "react";
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";
import { useToast as useToastBase } from "@/components/ui/use-toast-primitive";

export type ToasterToast = React.ComponentPropsWithoutRef<typeof Toast>;
export type ToastActionElement = React.ReactElement<typeof ToastClose>;

export type ToastParams = {
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: ToastActionElement;
  variant?: "default" | "destructive";
};

export const useToast = () => {
  const baseToast = useToastBase();
  
  return {
    toast: baseToast.toast,
    dismiss: baseToast.dismiss,
  };
};

export const toast = (props: ToastParams) => {
  const { toast: toastFn } = useToastBase();
  toastFn(props);
};

// Re-export the Toast component types for validation files
export type { ToasterToast as Toast };
