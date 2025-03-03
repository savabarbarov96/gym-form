
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
  duration?: number; // Add duration parameter
};

export const useToast = () => {
  const baseToast = useToastPrimitive();
  
  const toastWithDefaults = React.useCallback(
    (props: ToastParams) => {
      // Set default duration to 3000ms (3 seconds) if not provided
      const defaultedProps = {
        ...props,
        duration: props.duration !== undefined ? props.duration : 5000,
      };
      return baseToast.toast(defaultedProps);
    },
    [baseToast.toast]
  );
  
  return {
    toast: toastWithDefaults,
    dismiss: baseToast.dismiss,
    toasts: baseToast.toasts
  };
};

// This is just a utility function that calls useToast
// It should not be used in components, only in utility functions
export function toast(props: ToastParams): void {
  const { toast: toastFn } = useToastPrimitive();
  // Set default duration to 3000ms (3 seconds) if not provided
  const defaultedProps = {
    ...props,
    duration: props.duration !== undefined ? props.duration : 5000,
  };
  toastFn(defaultedProps);
}

// Re-export the Toast component types for validation files
export type { ToasterToast as Toast };
