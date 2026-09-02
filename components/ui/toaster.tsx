"use client"

import { motion } from "framer-motion"
import { useToast } from "@/hooks/use-toast"
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(({ id, title, description, action, variant, ...props }) => (
        <motion.div
          key={id}
          // initial={{ opacity: 0, scale: 0.6, y: 50 }}
          // animate={{ opacity: 1, scale: 1, y: 0 }}
          // exit={{ opacity: 0, scale: 0.9, y: -20 }}
          // transition={{ duration: 0.5, ease: [0.17, 0.67, 0.83, 0.67] }}
          className={` ${variant==="destructive"?"bg-red-900":"bg-green-900 text-white"}`}
        >
          <Toast  {...props} variant={variant} className={` ${variant==="destructive"?"bg-red-500":"bg-green-500"} ` }>
            <div className="grid gap-1 text-white">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && <ToastDescription>{description}</ToastDescription>}
            </div>
            {action}
            <ToastClose />
          </Toast>
        </motion.div>
      ))}
      <ToastViewport />
    </ToastProvider>
  )
}