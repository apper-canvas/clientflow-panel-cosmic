import { forwardRef } from "react"
import { cn } from "@/utils/cn"

const badgeVariants = {
  default: "bg-primary text-white",
  secondary: "bg-surface text-gray-700",
  success: "bg-success text-white",
  warning: "bg-warning text-white",
  error: "bg-error text-white",
  outline: "border border-gray-200 text-gray-700",
}

const Badge = forwardRef(({ className, variant = "default", ...props }, ref) => {
  return (
    <span
      ref={ref}
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        badgeVariants[variant],
        className
      )}
      {...props}
    />
  )
})

Badge.displayName = "Badge"

export default Badge